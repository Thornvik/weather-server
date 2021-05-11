export type CallbackVar = (error: string | undefined, ...args: any[]) => void

export type DayState = 'sunrise' | 'sunset' | 'night' | 'day'

export type Location = string

export enum WeatherDescription {
  Clouds = 'clouds',
  Clear = 'clear',
  Mist = 'mist',
  Smoke = 'smoke',
  Haze = 'haze',
  dust = 'dust',
  Fog = 'fog',
  Sand = 'sand',
  Dust = 'dust',
  Ash = 'ash',
  Squall = 'squall',
  Tornado = 'tornado',
  Snow = 'snow',
  Rain = 'rain',
  Drizzel = 'drizzel',
  Thunderstorm = 'thunderstorm'
}

export interface WeatherData {
  temp: string,
  sunrise: number,
  sunset: number,
  description: WeatherDescription
}

export interface WeatherInfo {
  location: Location
  currentDayState: DayState
  weatherData: WeatherData[]
}
