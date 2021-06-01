import suncalc from 'suncalc'
import { DayState } from 'types'

interface TimeObject {
  currentHour: number,
  dawn: number,
  goldenHourEnd: number,
  dusk: number,
  goldenHour: number
}

export const getSunPositionAndDayState = (lat: number, long: number) => {
  const current = new Date()
  const locationTime = suncalc.getTimes(current, lat, long) // getting the time for location based on lat and long

  const { sunrise, sunset } = getSunriseSunsetTimes(locationTime)
  const currentDayState: DayState = getDayState(locationTime)

  return {
    sunrise,
    sunset,
    currentDayState
  }
}

const getSunriseSunsetTimes = (locationTime: any) => {
  const sunrise = locationTime.sunrise.getHours() + ':' +
  (locationTime.sunrise.getMinutes() < 10 ? '0' + locationTime.sunrise.getMinutes() : locationTime.sunrise.getMinutes())
  const sunset = locationTime.sunset.getHours() + ':' +
  (locationTime.sunset.getMinutes() < 10 ? '0' + locationTime.sunset.getMinutes() : locationTime.sunset.getMinutes())
  return { sunrise, sunset }
}

const getDayState = (locationTime: any): DayState => {
  const current = new Date()
  const currentHour = current.getHours()

  // start of sunrise and end of sunrise
  const dawn = locationTime.dawn.getHours()
  const goldenHourEnd = locationTime.goldenHourEnd.getHours()

  // start of sunset and end of sunset
  const dusk = locationTime.dusk.getHours()
  const goldenHour = locationTime.goldenHour.getHours()

  const timeObject: TimeObject = {
    currentHour,
    dawn,
    goldenHourEnd,
    dusk,
    goldenHour
  }

  if (isSunrise(timeObject)) return 'sunrise'
  // eslint-disable-next-line no-else-return
  else if (isSunset(timeObject)) return 'sunset'
  else if (isNight(timeObject)) return 'night'
  else return 'day'
}

const isSunrise = (timeObject: TimeObject) => (timeObject.currentHour >= timeObject.dawn && timeObject.currentHour <= timeObject.goldenHourEnd)

const isSunset = (timeObject: TimeObject) => (timeObject.currentHour >= timeObject.dusk && timeObject.currentHour <= timeObject.goldenHour)

const isNight = (timeObject: TimeObject) => (timeObject.currentHour > timeObject.goldenHour || timeObject.currentHour < timeObject.dawn)
