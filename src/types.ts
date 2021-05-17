export type CallbackVar = (error: string | undefined, ...args: any[]) => void

export type DayState = 'sunrise' | 'sunset' | 'night' | 'day'

export type Location = string

export interface ComingDaysForcast {
  date: Date,
  temp: string,
  description: WeatherDescription
}

export enum WeatherDescription {
  Clouds = 'Clouds',
  Clear = 'Clear',
  Mist = 'Mist',
  Smoke = 'Smoke',
  Haze = 'Haze',
  Dust = 'Dust',
  Fog = 'Fog',
  Sand = 'Sand',
  Ash = 'Ash',
  Squall = 'Squall',
  Tornado = 'Tornado',
  Snow = 'Snow',
  Rain = 'Rain',
  Drizzel = 'Drizzel',
  Thunderstorm = 'Thunderstorm'
}

export interface WeatherData {
  temp: string,
  sunrise: string,
  sunset: string,
  humidity: number,
  windSpeed: number,
  description: WeatherDescription
  comingDaysForcast: ComingDaysForcast[]
}

export interface WeatherInfo {
  location: Location
  currentDayState: DayState
  weatherData: WeatherData[]
}
