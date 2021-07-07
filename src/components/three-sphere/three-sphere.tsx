import React, { FunctionComponent } from 'react'

export const ThreeSphere: FunctionComponent = () => {
  return (
    <mesh>
      <sphereGeometry args={[90, 32, 32]} />
      <meshPhongMaterial color={0x000000} transparent={true} opacity={0.4} />
    </mesh>
  )
}
