import { getStations } from './api/station';
import { DIRECTIONAL } from './shared/constants/LocationTypes';

(async function() {
  const stations = await getStations();

  const db = {};
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
      }
    };
  }
})();
