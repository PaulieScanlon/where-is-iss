import React, { FunctionComponent } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry'
import * as d3 from 'd3'

import theme from '../../gatsby-plugin-theme-ui'

interface IThreeGraticuleProps {
  /** The radius to use */
  radius: number
}

export const ThreeGraticule: FunctionComponent<IThreeGraticuleProps> = ({
  radius,
}) => {
  return (
    <lineSegments geometry={new GeoJsonGeometry(d3.geoGraticule10(), radius)}>
      <lineBasicMaterial color={theme.colors.three.graticule} />
    </lineSegments>
  )
}
