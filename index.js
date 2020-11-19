const express = require('express') // express lets me create a server very easily
const app = express()
const cors = require('cors')
const pool = require('./db')
//const app = require('https-localhost')()

//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTES
app.get('/buses', async (req, res) => {
  console.log('GET REQUEST ATTEMPTED')
  const date = '2020-11-28'
  const time = '11:00:00'
  const time2 = '13:00:00'

  //prettier-ignore
  const getQuery = 
  `\
  DROP TABLE PABT_stop_times; \
  DROP TABLE stop_two_times; \
  DROP TABLE PABT_reduced; \
  DROP TABLE PABT_relevant; \
  DROP TABLE trips_reduced; \
  DROP TABLE routeIDandTime; \
  DROP TABLE answer;
   \
  CREATE TABLE PABT_stop_times AS \
  SELECT * \
  FROM stop_times \
  WHERE stop_times.stop_id = 3511 and stop_times.stop_sequence = 1; \
   \
  CREATE TABLE stop_two_times AS \
  SELECT * \
  FROM stop_times \
  WHERE stop_times.stop_id = 3234; \
   \
  CREATE TABLE PABT_reduced AS \
  SELECT PABT_stop_times.trip_id, PABT_stop_times.departure_time \
  FROM PABT_stop_times, stop_two_times \
  WHERE PABT_stop_times.trip_id = stop_two_times.trip_id; \
   \
  CREATE TABLE PABT_relevant AS \
  SELECT PABT_reduced.trip_id, PABT_reduced.departure_time \
  FROM PABT_reduced \
  WHERE PABT_reduced.departure_time >= '${time}' and PABT_reduced.departure_time <= '${time2}'; \
   \
   \
  CREATE TABLE trips_reduced AS \
  SELECT route_id, trip_id \
  FROM trips, calendar_dates \
  WHERE calendar_dates.the_date = '${date}' and trips.service_id = calendar_dates.service_id; \
   \
  CREATE TABLE routeIDandTime AS \
  SELECT route_id, departure_time \
  FROM PABT_relevant, trips_reduced \
  WHERE PABT_relevant.trip_id = trips_reduced.trip_id; \
   \
  CREATE TABLE answer AS \
  SELECT departure_time, route_short_name \
  FROM routeIDandTime, routes \
  WHERE routeIDandTime.route_id = routes.route_id
  ORDER BY departure_time asc; \
  `
  //WHERE calendar_dates.the_date = '${date}' and trips.service_id = calendar_dates.service_id; \

  try {
    const routeInfo = await pool.query(getQuery)
    const answer = await pool.query('SELECT * from answer;')
    res.json(answer.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//Get bus routes

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
})
