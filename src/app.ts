import express, { Request, Response } from 'express'
import cors from 'cors'
import { WeatherData } from 'types'
import { getSunPositionAndDayState } from './utils/sunset-sunrise'
import { getLocationWithAdress, getLocationWithCoords } from './utils/geolocation'
import { getForcast } from './utils/forecast'

const app = express()
app.use(cors())
const port = process.env.PORT

// endpoint for getting the weather by an adress
app.get('/adress', (req: Request, res: Response) => {
  const { adress } = req.query
  if (!adress) {
    res.status(400).send('Error: please provide a adress')
  }

  getLocationWithAdress(adress as string, async (e, locationData) => {
    if (e || e !== undefined) {
      res.status(404).send('Error: Unable to find location')
    }

    const { lat, long, location } = locationData
    const { currentDayState, sunrise, sunset } = await getSunPositionAndDayState(lat, long)

    getForcast(lat, long, async (err, data: WeatherData) => {
      if (err || err !== undefined) {
        res.status(404).send(err)
      }

      const weatherData = { ...data, sunrise, sunset }

      const weatherForcast = await {
        location,
        currentDayState,
        weatherData
      }

      res.send(weatherForcast)
    })
  })
})

// enpoint for getting the weather by Coordinates
app.get('/coords', (req: Request, res: Response) => {
  const { coords } = req.query
  if (!coords) {
    res.status(400).send('Error: please provide long and lat')
  }

  getLocationWithCoords(coords as string, async (e, locationData) => {
    if (e || e !== undefined) {
      res.status(404).send('Error: Unable to find location')
    }

    const { lat, long, location } = await locationData
    const { currentDayState, sunrise, sunset } = await getSunPositionAndDayState(lat, long)

    getForcast(lat, long, async (err, data: WeatherData) => {
      if (err || err !== undefined) {
        res.status(404).send(err)
      }

      const weatherData = { ...data, sunrise, sunset }

      const weatherForcast = await {
        location,
        currentDayState,
        weatherData
      }

      res.send(weatherForcast)
    })
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})
