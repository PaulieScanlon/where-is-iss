import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry'
import axios from 'axios'

export const ThreeGeo: FunctionComponent = () => {
  const [geoJson, setGeoJson] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      // .get(
      //   'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson'
      // )
      .get(
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
      )
      .then((response) => {
        setIsLoading(false)
        setGeoJson(response.data)
      })
      .catch((error) => {
        console.log(error)
        throw new Error()
      })
  }, [])

  return (
    <Fragment>
      {!isLoading ? (
        <Fragment>
          {geoJson.features.map(({ geometry }, index: number) => {
            return (
              <lineSegments
                key={index}
                geometry={new GeoJsonGeometry(geometry, 90)}
              >
                <lineBasicMaterial color={0xecd89a} />
              </lineSegments>
            )
          })}
        </Fragment>
      ) : null}
    </Fragment>
  )
}
