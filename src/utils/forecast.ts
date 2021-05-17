import axios from 'axios'
import { CallbackVar, WeatherData, WeatherDescription } from 'types'

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

      const { temp, humidity, wind_speed } = await res.data.current // eslint-disable-line
      const { main } = await res.data.current.weather[0]
      const weatherData = {
        temp: temp.toString(),
        humidity,
        windSpeed: wind_speed,
        description: main as WeatherDescription
      } as WeatherData

      return cb(undefined, weatherData)
    } catch (err) {
      console.log(lat)
      return cb('error', undefined)
    }
  }

  request()
}
