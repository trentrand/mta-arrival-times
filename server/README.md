# Server code for MTA Arrival Times, an Apple Watch App

## API

### getSchedule

### Get schedules for all trains at Jay st. station
```js
  const schedules = await getSchedulesForStation('Jay St');
  console.log(JSON.stringify(schedules, null, 2), '{ A41: { ... }, R29: { ... } }');
```

### Get schedule for A train at Jay St. station
```js
  const schedule = await getSchedules('A41');
  console.log(JSON.stringify(schedule, null, 2), '{ A41: { ... } }');
```

### Get schedule for A and R trains at Jay St. station
```js
  const schedules = await getSchedules(['A41', 'R29']);
  console.log(JSON.stringify(schedules, null, 2), '{ A41: { ... }, R29: { ... } }');
```

### getFeedIdForTrain
```js
  const feedId = getFeedIdForTrain('A');
  console.log(feedId, '26');
```

### getFeedIdForStationId
```js
  const feedId = getFeedIdForStationId('A41');
  console.log(feedId, '26');
```

### getStations
```js
  const stations = await getStations();
  console.log(stations, '{ ..., R29: { stop_id: "R29", ... }, ... }');
```

### getStationByName
```js
  const station = await getStationByName('Jay St');
  console.log(station, '{ R29: { stop_id: "R29", ... } }');
```

### getStationById
```js
  const stationById = await getStationById('A41');
  console.log(stationById, '{ stop_name: "Jay St - MetroTech", stop_lat: "40.692338", stop_lon: "-73.987342" }');
```

### getStatusForTrains
```js
  const status = await getStatusForTrains();
  console.log(status, "{..., { name: 'ACF', status, text, date, time }, ...}");
```

### getStatusForTrain
```js
  const status = await getStatusForTrain('A');
  console.log(status, "{ name: 'ACF', status, text, date, time }");
```
