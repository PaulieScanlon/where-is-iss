import React, { Fragment, FunctionComponent, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { IContextProps } from '../../types'
import { getVertex } from '../../utils'

import theme from '../../gatsby-plugin-theme-ui'

interface IThreeIssProps extends IContextProps {
  /** The radius to use */
  radius: number
}

export const ThreeIss: FunctionComponent<IThreeIssProps> = ({
  isLoading,
  issNow,
  radius,
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
        <Fragment>
          <mesh
            ref={mesh}
            position={getVertex(
              iss_position.latitude,
              iss_position.longitude,
              radius + 20
            )}
          >
            <sphereGeometry args={[2, 24, 8]} />
            {/* <cylinderGeometry args={[2, 2, 2, 12]} /> */}
            {/* <torusGeometry args={[4, 2, 24, 24]} /> */}
            <meshPhongMaterial color={theme.colors.three.point} />
          </mesh>
        </Fragment>
      ) : null}
    </Fragment>
  )
}
