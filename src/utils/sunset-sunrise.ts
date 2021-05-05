import suncalc from 'suncalc'

type dayState = 'sunrise' | 'sunset' | 'night' | 'day'

// functions for checking state of day
const isSunrise = (currentHour: number, sunriseStart: number, sunriseEnd: number) => {
  if (currentHour >= sunriseStart && currentHour <= sunriseEnd) {
    return 'sunrise' as dayState
  }
  return 'day'
}

const isSunset = (currentHour: number, sunsetStart: number, sunsetEnd: number) => {
  if (currentHour >= sunsetStart && currentHour <= sunsetEnd) {
    return 'sunset' as dayState
  }
  return 'day'
}

const isNight = (currentHour: number, sunset: number) => {
  if (currentHour > sunset) {
    return 'night' as dayState
  }
  return 'day'
}

const isDay = (currentHour: number, sunrise: number) => {
  if (currentHour > sunrise) {
    return 'day' as dayState
  }
  return 
}

export const getSunsetSunriseTime = async (lat: number = 59.4796, long: number = 17.8964) => {
  const current = new Date()
  const locationTime = suncalc.getTimes(current, lat, long) // getting the time for current location

  // current time in hour and min
  const currentHour = current.getHours()
  const currentMinute = current.getMinutes()

  // getting time of sunrise and sunset
  const sunrise = locationTime.sunrise.getHours() + ':' + locationTime.sunrise.getMinutes()
  const sunset = locationTime.sunset.getHours() + ':' + locationTime.sunset.getMinutes()

  // start of sunrise and end of sunrise
  const dawn = locationTime.dawn.getHours()
  const goldenHourEnd = locationTime.goldenHourEnd.getHours()

  // start of sunset and end of sunset
  const dusk = locationTime.dusk.getHours()
  const goldenHour = locationTime.goldenHour.getHours()

  let currentDayState: dayState = 'day'

  return {
    sunrise,
    sunset,
    currentDayState
  }
}
