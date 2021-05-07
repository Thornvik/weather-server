import express, { Request, Response } from 'express'
import { getSunsetSunriseTime } from './utils/sunset-sunrise'
import { geolocation } from './utils/geolocation'
import { forcast } from './utils/forecast'

const app = express()
const port = process.env.PORT

app.get('/', async (req: Request, res: Response) => {
  geolocation('rotebro', async (e, locationData) => {
    if (e !== undefined) {
      return console.log(e)
    }

    const { lat, long, location } = locationData
    const { currentDayState } = await getSunsetSunriseTime(lat, long)
    return forcast(lat, long, async (err, weatherData) => {
      if (err !== undefined) {
        return console.log('error')
      }

      const response = await {
        lat,
        long,
        location,
        currentDayState,
        weatherData
      }

      console.log(response)
      return res.send(response)
    })
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})
