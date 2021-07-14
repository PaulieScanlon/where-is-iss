import React, { FunctionComponent } from 'react'

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
        color={0x000000}
        transparent={true}
        opacity={0.6}
        shininess={1}
      />
    </mesh>
  )
}
