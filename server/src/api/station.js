import api from './MtaApi';
import DIRECTIONS, { isValidDirection } from '../shared/constants/Directions';


export async function getStations() {
  const stations = await api.stop().catch((error) => {
    console.log(error);
  });
  return stations;
}

export async function getStationById(stationId) {
  console.log(api)
  const station = await api.stop(stationId).catch((err) => {
    console.log(err);
  });
  return station;
}

export async function getStationByName(stationName, direction) {
  if(!isValidDirection(direction)) {
    console.warn(`invalid direction: ${direction}`);
    direction = undefined;
  }

  const stations = await api.stop().catch((err) => {
    console.log(err);
  });

  const station = Object.values(stations)
      .filter((station) => station['stop_name'].includes(stationName))
      .filter((station) => filterByTrackDirection(station, direction));

  return station;
}

function filterByTrackDirection(station, direction) {
  if (direction) {
    return (
      station['location_type'] === '0' &&
      station['stop_id'].endsWith(direction)
    );
  }

  return station['location_type'] === '1';
}
