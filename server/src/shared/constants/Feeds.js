export function getFeedIdForTrain(name) {
  return FEEDS[name];
}

export function getFeedIdForStationId(stationId) {
  if (stationId.startsWith('SIR')) {
    return FEEDS["SIR"];
  }
  return FEEDS[stationId.charAt(0)];
}

const FEEDS = {
  "_source": "https://datamine.mta.info/list-of-feeds",
  "1": 1,
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "S": [1, 26],
  "A": 26,
  "C": 26,
  "E": 26,
  "H": 26,
  "N": 16,
  "Q": 16,
  "R": 16,
  "W": 16,
  "B": 21,
  "D": 21,
  "F": 21,
  "M": 21,
  "L": 2,
  "SIR": 11,
  "G": 31,
  "J": 36,
  "Z": 36,
  "7": 51
};

export default FEEDS;
