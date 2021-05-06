import axios from 'axios'

type error = string | undefined
interface latLong {
  lat: number
  long: number
  location: string
}
type Callback = (e: error, res: latLong | undefined) => void

export const geolocation = (adress: string, cb: Callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
    adress
  }.json?access_token=${process.env.MAPBOX_KEY}&limit=1`

  const request = async () => {
    try {
      const res = await axios.get(url)

      if (res.data.features.length === 0) {
        return cb('unable to find location, try another', undefined)
      }

      const lat = res.data.features[0].center[1]
      const long = res.data.features[0].center[0]
      const location = res.data.features[0].text

      return cb(undefined, { lat, long, location })
    } catch (err) {
      return cb(err, undefined)
    }
  }

  request()
}
