# Server code for MTA Arrival Times, an Apple Watch App

## API

### getScheduleForStation
Give it a try:
```js
  const w4Schedule = await getScheduleForStation('Jay St', 'A');
  console.log(JSON.stringify(w4Schedule, null, 2), '{ schedule: { ... } }');
```

### getFeedIdForTrain
Give it a try:
```js
  const feedId = getFeedIdForTrain('A');
  console.log(feedId, '26');
```

### getStations
Give it a try:
```js
  const stations = await getStations();
  console.log(stations, '{ ..., R29: { stop_id: "R29", ... }, ... }');
```

### getStationByName
Give it a try:
```js
  const station = await getStationByName('Jay St');
  console.log(station, '{ R29: { stop_id: "R29", ... } }');
```

### getStationById
Give it a try:
```js
  const stationById = await getStationById('A41');
  console.log(stationById, '{ stop_name: "Jay St - MetroTech", stop_lat: "40.692338", stop_lon: "-73.987342" }');
```

### getStatusForTrains
Give it a try:
```js
  const status = await getStatusForTrains();
  console.log(status, "{..., { name: 'ACF', status, text, date, time }, ...}");
```

### getStatusForTrain
Give it a try:
```js
  const status = await getStatusForTrain('A');
  console.log(status, "{ name: 'ACF', status, text, date, time }");
```
