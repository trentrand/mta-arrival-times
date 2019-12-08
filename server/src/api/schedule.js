import api from './MtaApi';
import { getStationByName } from './station';
import FEEDS, { getFeedIdForTrain } from '../shared/constants/Feeds';

export function isValidTrainName(name) {
  return Object.keys(FEEDS).includes(name);
}

export async function getScheduleForStation(stationName, trainName, direction) {
  if (!isValidTrainName(trainName)) {
    console.warn(`invalid train name provided: ${trainName}`);
  }
  const feedId = getFeedIdForTrain(trainName);

  const stations = await getStationByName(stationName, direction)
  const firstMatchStationId = stations[0]['stop_id'];
  const schedule = await api.schedule(firstMatchStationId, feedId)

  return schedule;
}