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

  const { latitude, longitude } = issNow

  return (
    <Fragment>
      {!isLoading ? (
        <Fragment>
          <mesh
            ref={mesh}
            position={getVertex(latitude, longitude, radius + 20)}
          >
            <sphereGeometry args={[3, 24, 8]} />
            <meshLambertMaterial color={theme.colors.three.iss} />
          </mesh>
        </Fragment>
      ) : null}
    </Fragment>
  )
}
