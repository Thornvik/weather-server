import express, { Request, Response } from 'express'
import cors from 'cors'
import { getSunsetSunriseTime } from './utils/sunset-sunrise'
import { geolocation } from './utils/geolocation'
import { forcast } from './utils/forecast'

const app = express()
app.use(cors())
const port = process.env.PORT

app.get('/weather', (req: Request, res: Response) => {
  const { adress } = req.query
  if (!adress) {
    return res.send('please provide a adress')
  }

  return geolocation(adress as string, async (e, locationData) => {
    if (e !== undefined) {
      return res.send('Unable to find location')
    }

    const { lat, long, location } = locationData
    const { currentDayState } = await getSunsetSunriseTime(lat, long)
    return forcast(lat, long, async (err, weatherData) => {
      if (err !== undefined) {
        return console.log('error')
      }

      const weatherInfo = await {
        lat,
        long,
        location,
        currentDayState,
        weatherData
      }

      console.log(weatherInfo)
      return res.send(weatherInfo)
    })
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})
