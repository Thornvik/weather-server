import express, { Request, Response } from 'express'
import { getSunsetSunriseTime } from './utils/sunset-sunrise'
import { geolocation } from './utils/geolocation'

const app = express()
const port = process.env.PORT

app.get('/', async (req: Request, res: Response) => {
  geolocation('rotebro', async (e, locationData) => {
    if (e !== undefined || locationData === undefined) {
      return console.log('unable to find location, try another')
    }

    const { lat, long, location } = locationData
    const { sunset, sunrise, currentDayState } = await getSunsetSunriseTime(lat, long)

    const response = {
      lat,
      long,
      location,
      sunset,
      sunrise,
      currentDayState
    }

    console.log(response)
    return res.send(response)
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})
