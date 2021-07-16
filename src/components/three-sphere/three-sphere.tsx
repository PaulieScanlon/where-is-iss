import React, { FunctionComponent } from 'react'

import theme from '../../gatsby-plugin-theme-ui'

interface IThreeSphereProps {
  /** The radius to use */
  radius: number
}

export const ThreeSphere: FunctionComponent<IThreeSphereProps> = ({
  radius,
}) => {
  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial
        color={theme.colors.three.sphere}
        transparent={true}
        opacity={0.2}
      />
    </mesh>
  )
}
