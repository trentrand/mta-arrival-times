import { getStations } from './api/station';
import { getAllSchedules, getSchedulesForFeedId } from './api/schedule';
import { DIRECTIONAL } from './shared/constants/LocationTypes';

(async function() {
  const db = {};

  const stations = await getStations();
console.log(Object.keys(stations).length)
  for (let station of Object.values(stations)) {
    const {
      ['stop_id']: id,
      ['stop_name']: name,
      ['stop_lat']: latitude,
      ['stop_lon']: longitude,
      ['location_type']: locationType
    } = station;

    if (locationType !== DIRECTIONAL) {
      continue;
    }

    db[id] = {
      id,
      name,
      location: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      schedule: []
    };
  }

  const stationSchedules = await getAllSchedules();

  Object.entries(stationSchedules).forEach(([stopId, schedule]) => {
    if (!db[stopId]) {
      console.warn('No station exists for stop id', stopId);
      return;
    }
    db[stopId].schedule = schedule;
  });

  // Print info on A train for Jay St. station
  console.log(JSON.stringify(db['A41'], null, 2));
})();
