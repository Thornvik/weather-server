import express, { Request, Response } from 'express'
import cors from 'cors'
import { WeatherData } from 'types'
import { getSunsetSunriseTime } from './utils/sunset-sunrise'
import { geolocationAdress, geolocationCoords } from './utils/geolocation'
import { forcast } from './utils/forecast'

const app = express()
app.use(cors())
const port = process.env.PORT

app.get('/adress', (req: Request, res: Response) => {
  const { adress } = req.query
  if (!adress) {
    return res.status(400).send('Error: please provide a adress')
  }

  return geolocationAdress(adress as string, async (e, locationData) => {
    if (e || e !== undefined) {
      return res.status(404).send('Error: Unable to find location')
    }

    const { lat, long, location } = locationData
    const { currentDayState, sunrise, sunset } = await getSunsetSunriseTime(lat, long)
    return forcast(lat, long, async (err, data: WeatherData) => {
      if (err || err !== undefined) {
        return res.status(404).send('Error: Unable to get weather forcast, check location')
      }

      const weatherData = { ...data, sunrise, sunset }

      const weatherForcast = await {
        location,
        currentDayState,
        weatherData
      }

      console.log(weatherForcast)
      return res.send(weatherForcast)
    })
  })
})

app.get('/coords', (req: Request, res: Response) => {
  const { coords } = req.query
  if (!coords) {
    res.status(400).send('Error: please provide long and lat')
  }
  geolocationCoords(coords as string, async (e, locationData) => {
    if (e || e !== undefined) {
      return res.status(404).send('Error: Unable to find location')
    }

    const { lat, long, location } = locationData
    const { currentDayState, sunrise, sunset } = await getSunsetSunriseTime(lat, long)
    return forcast(lat, long, async (err, data: WeatherData) => {
      if (err || err !== undefined) {
        return res.status(404).send('Error: Unable to get weather forcast, check location')
      }

      const weatherData = { ...data, sunrise, sunset }

      const weatherForcast = await {
        location,
        currentDayState,
        weatherData
      }

      console.log(weatherForcast)
      return res.send(weatherForcast)
    })
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})
