import Mta from 'mta-gtfs';
import admin, { config } from 'firebase-functions';

const apiInstance = new Mta({
  key: getAccessToken()
});

function getAccessToken() {
  if (process.env.MTA_API_KEY) {
    console.log('ENV=NODE')
    return process.env.MTA_API_KEY;
  }
  if (process.env.FIREBASE_CONFIG) {
    console.log('ENV=FIREBASE')
    return config().mta.access_token;
  }
  return 'NO_KEY_SPECIFIED';
}

Object.freeze(apiInstance);
export default apiInstance