import axios from 'axios'
import { CallbackVar, WeatherData, WeatherDescription, ComingDaysForcast } from 'types'

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
      const dailyForcast = await res.data.daily

      const comingDaysForcast = [] as ComingDaysForcast[]

      await dailyForcast.forEach((e: any) => {
        const data = {} as ComingDaysForcast
        data.date = new Date(e.dt * 1000)
        data.temp = e.temp.max.toString()
        data.description = e.weather[0].main as WeatherDescription
        comingDaysForcast.push(data)
      })

      const weatherData = {
        temp: temp.toString(),
        humidity,
        windSpeed: wind_speed,
        description: main as WeatherDescription,
        comingDaysForcast
      } as WeatherData

      return cb(undefined, weatherData)
    } catch (err) {
      return cb('error', undefined)
    }
  }

  request()
}
