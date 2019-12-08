import api from './MtaApi';

export async function getStatusForTrains() {
  const status = await api.status('subway').catch((err) => {
    console.log(err);
    return;
  });
  return status;
}

export async function getStatusForTrain(trainName) {
  const statusForAllTrains = await getStatusForTrains();
  return statusForAllTrains.filter((status) => {
    if (!status.name.includes(trainName)) {
      return false;
    }
    return true;
  })
}
