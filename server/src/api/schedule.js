import retry from 'async-retry';
import api from './MtaApi';
import { getStationByName } from './station';
import FEEDS, {
  getFeedIdForStationId,
  getUniqueFeedIds,
} from '../shared/constants/Feeds';

export function isValidTrainName(name) {
  return Object.keys(FEEDS).includes(name);
}

export async function getSchedulesForStation(stationName, direction) {
  const stations = await getStationByName(stationName, direction);
  const stationIds = stations.map((station) => station['stop_id']);

  return await getSchedules(stationIds, direction);
}

export async function getAllSchedules() {
  const feedIds = getUniqueFeedIds();
  const schedules = await Promise.all(feedIds.map(getSchedulesForFeedId));
  return Object.assign({}, ...schedules);
}

export async function getSchedulesForFeedId(feedId) {
  return await retry(async bail => {
    const { schedule } = await api.schedulesForFeed(feedId);

    if (schedule === undefined) {
      throw new Error('Failed to fetch schedule for feed id', feedId);
    }

    return schedule;
  });
}

export async function getSchedules(stationIds, direction) {
  if (Array.isArray(stationIds)) {
    let schedules = {};
    await Promise.all(stationIds.map(async (stationId) => {
      const schedule = await getSchedule(stationId);
      schedules[stationId] = schedule;
    }));

    return schedules;
  }

  return await getSchedule(stationIds);
 }

export async function getSchedule(stationId) {
  const feedId = getFeedIdForStationId(stationId);

  return await retry(async bail => {
    const { schedule } = await api.schedule(stationId, feedId);

    if (schedule === undefined) {
      throw new Error('Failed to fetch schedule for id', stationId);
    }

    return schedule[stationId];
  });
}
