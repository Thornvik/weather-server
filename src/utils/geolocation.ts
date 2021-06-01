import axios from 'axios'
import { CallbackVar, Location } from '../types'

const request = async (url: string) => {
  try {
    const res = await axios.get(url)

    if (res.data.features.length === 0) {
      throw new Error('Error: unable to find location')
    }

    const lat: number = res.data.features[0].center[1]
    const long: number = res.data.features[0].center[0]
    const location: Location = res.data.features[0].text

    return { lat, long, location }
  } catch (error) {
    throw new Error('Error: unable to find location')
  }
}

export const getLocationWithAdress = (adress: string, cb: CallbackVar) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
    adress
  }.json?access_token=${process.env.MAPBOX_KEY}&limit=1`

  request(url)
    .then((res) => cb(undefined, res))
    .catch((error) => cb(error.message, undefined))
}

export const getLocationWithCoords = (coords: string, cb: CallbackVar) => {
  const long = coords.split(',')[0]
  const lat = coords.split(',')[1]
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.MAPBOX_KEY}&limit=1`

  request(url)
    .then((res) => cb(undefined, res))
    .catch((error) => cb(error.message, undefined))
}
