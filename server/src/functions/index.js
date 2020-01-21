import admin, { firestore } from 'firebase-admin';
import { https, pubsub, auth } from 'firebase-functions';
import { sleep } from '../shared/utils'
import { getAllSchedules } from '../api/schedule';
import { getStations } from '../api/station';
import { PARENT } from '../shared/constants/LocationTypes';
import Environments, { getEnvironments } from '../shared/constants/Environments';

const { GeoPoint } = firestore;

const cors = require('cors')({
  origin: true,
});

const appConfiguration = {
  databaseURL: "https://mta-arrival-times.firebaseio.com"
};

if (getEnvironments() === Environments.LOCAL) {
  const firebaseServiceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
  if (firebaseServiceAccount) {
    appConfiguration.credential = admin.credential.cert(firebaseServiceAccount);
  }
}

admin.initializeApp(appConfiguration);

let db = admin.firestore();

// admin.firestore.setLogFunction((log) => {
//   console.log(log);
// });

// Polled cache updates
export const cacheStations = pubsub.schedule('every day 00:00').onRun(async (context) => {
  const stations = await getStations();

  // let batch = db.batch();
  for (let station of Object.values(stations)) {
    const {
      ['stop_id']: id,
      ['stop_name']: name,
      ['stop_lat']: latitude,
      ['stop_lon']: longitude,
      ['location_type']: locationType
    } = station;

    if (locationType === PARENT) {
      continue;
    }

    let docRef = db.collection('stations').doc(id);
    try {
      // eslint-disable-next-line no-await-in-loop
      await docRef.set({
        id,
        name,
        location: new firestore.GeoPoint(Number(latitude), Number(longitude)),
        schedule: {
          N: [],
          S: [],
        },
      })
    } catch (error) {
      console.warn(error);
    }

    // TODO: Without this, a quote limit is hit.
    // Find a better way to handle batching with quote-compliant processing.
    await sleep(100); // eslint-disable-line
  }
});

export const pollSchedules = pubsub.schedule('every 15 minutes').onRun(async (context) => {

  const stationSchedules = await getAllSchedules();

  for (let [stopId, schedule] of Object.entries(stationSchedules)) {
    let stationRef = db.collection('stations').doc(stopId);

    try {
      // eslint-disable-next-line no-await-in-loop
      await stationRef.set({ schedule }, { merge: true });
    } catch (error) {
      console.warn(error);
    }
  }
});

// Consumer endpoints
exports.stations = https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }

  return cors(req, res, () => {
    db.collection('stations')
      .get()
      .then((querySnapshot) => {
        const stations = {};

        querySnapshot.forEach((doc) => {
          const stationName = doc.get('name');
          if (!stations[stationName]) {
            stations[stationName] = {
              ids: [],
              locations: [],
            };
          }
          stations[stationName].ids.push(doc.id);
          stations[stationName].locations.push(doc.get('location'));
        });

        return res.status(200).send(stations);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  });
});
