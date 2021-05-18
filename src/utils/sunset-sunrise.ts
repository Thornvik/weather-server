import suncalc from 'suncalc'

type dayState = 'sunrise' | 'sunset' | 'night' | 'day'

// functions for checking state of day
const isSunrise = (currentHour: number, sunriseStart: number, sunriseEnd: number) => (currentHour >= sunriseStart && currentHour <= sunriseEnd)

const isSunset = (currentHour: number, sunsetStart: number, sunsetEnd: number) => (currentHour >= sunsetStart && currentHour <= sunsetEnd)

const isNight = (currentHour: number, sunset: number, sunrise: number) => (currentHour > sunset || currentHour < sunrise)

export const getSunsetSunriseTime = (lat: number, long: number) => {
  const current = new Date()
  const locationTime = suncalc.getTimes(current, lat, long) // getting the time for location based on lat and long

  // current time, hour and min
  const currentHour = current.getHours()
  const currentMinute = current.getMinutes()

  // getting time of sunrise and sunset
  const sunrise = locationTime.sunrise.getHours() + ':' +
  (locationTime.sunrise.getMinutes() < 10 ? '0' + locationTime.sunrise.getMinutes() : locationTime.sunrise.getMinutes())
  const sunset = locationTime.sunset.getHours() + ':' +
  (locationTime.sunset.getMinutes() < 10 ? '0' + locationTime.sunset.getMinutes() : locationTime.sunset.getMinutes())

  // start of sunrise and end of sunrise
  const dawn = locationTime.dawn.getHours()
  const goldenHourEnd = locationTime.goldenHourEnd.getHours()

  // start of sunset and end of sunset
  const dusk = locationTime.dusk.getHours()
  const goldenHour = locationTime.goldenHour.getHours()

  const currentDayState: dayState =
    isSunrise(currentHour, dawn, goldenHourEnd) ?
      'sunrise' : (isSunset(currentHour, dusk, goldenHour) ?
        'sunset' : (isNight(currentHour, goldenHour, dawn) ?
          'night' : 'day'))

  return {
    sunrise,
    sunset,
    currentDayState
  }
}
