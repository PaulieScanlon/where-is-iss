import React, { FunctionComponent } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry'
import * as d3 from 'd3'

import theme from '../../gatsby-plugin-theme-ui'

export const ThreeGraticule: FunctionComponent = () => {
  return (
    <lineSegments geometry={new GeoJsonGeometry(d3.geoGraticule10(), 90)}>
      <lineBasicMaterial color={theme.colors.three.graticule} />
    </lineSegments>
  )
}
