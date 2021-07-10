import React, { Fragment, FunctionComponent, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { IContextProps } from '../../types'
import { getVertex } from '../../utils'

import theme from '../../gatsby-plugin-theme-ui'

interface IPointProps extends IContextProps {}

export const ThreePoint: FunctionComponent<IPointProps> = ({
  isLoading,
  issNow,
}) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const rotationSpeed = 0.004
  const { iss_position } = issNow

  useFrame(() => {
    return (
      (mesh.current.rotation.x += rotationSpeed),
      (mesh.current.rotation.y += rotationSpeed),
      (mesh.current.rotation.z += rotationSpeed)
    )
  })

  return (
    <Fragment>
      {!isLoading ? (
        <mesh
          ref={mesh}
          position={getVertex(
            iss_position.latitude,
            iss_position.longitude,
            110
          )}
        >
          <octahedronGeometry args={[4]} />
          <meshPhongMaterial color={theme.colors.three.point} />
        </mesh>
      ) : null}
    </Fragment>
  )
}
