import axios from 'axios'
import { CallbackVar } from '../types'

export const forcast = (lat: number, long: number, cb: CallbackVar) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${
    lat
  }&lon=${
    long
  }&exclude=minutely,hourly&units=metric&appid=${
    process.env.OPEN_WEATHER_MAP_KEY
  }
  `

  const request = async () => {
    try {
      const res = await axios.get(url)

      if (res.data.success === false) {
        return cb('could not get weather, check location', undefined)
      }

      const { temp, sunrise, sunset, weather } = res.data.current

      return cb(undefined, { temp, sunrise, sunset, weather })
    } catch (err) {
      console.log(lat)
      return cb('error', undefined)
    }
  }

  request()
}
