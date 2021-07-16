// altitude: 419.5211031955
// daynum: 2459411.8411111
// footprint: 4505.0262456903
// id: 25544
// latitude: 23.305505347927
// longitude: -58.459139978582
// name: "iss"
// solar_lat: 21.300427153246
// solar_lon: 58.732003564016
// timestamp: 1626423072
// units: "kilometers"
// velocity: 27589.127730491
// visibility: "daylight

export interface IssNow {
  timestamp: number
  latitude: number
  longitude: number
}

export interface IContextProps {
  issNow: IssNow
  isLoading?: boolean
  pollDelay?: number
}
