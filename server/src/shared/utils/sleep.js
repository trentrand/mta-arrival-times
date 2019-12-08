export default function sleep(waitTimeInMs) {
  return new Promise(resolve => setTimeout(resolve, waitTimeInMs));
}
