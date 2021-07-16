import React, { Fragment, FunctionComponent } from 'react'
import { Flex } from 'theme-ui'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { IContextProps } from '../../types'

import AppContext from '../../context/app-context'

import { FrameTimer } from '../frame-timer'
import { ThreeGeo } from '../three-geo'
import { ThreeIss } from '../three-iss'
import { ThreeSphere } from '../three-sphere'
import { ThreeGraticule } from '../three-graticule'

import theme from '../../gatsby-plugin-theme-ui'

interface IThreeSceneProps {
  /** Radius for Three.js */
  radius: number
  /** Width for the svg */
  svg: number
}

export const ThreeScene: FunctionComponent<IThreeSceneProps> = ({
  radius,
  svg,
}) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <AppContext.Consumer>
        {({ issNow, isLoading }: IContextProps) => {
          return (
            <Fragment>
              {!isLoading ? (
                <Fragment>
                  <FrameTimer issNow={issNow} width={svg} />
                  <Canvas
                    gl={{ antialias: false, alpha: false }}
                    onCreated={({ gl }) => {
                      gl.setClearColor(theme.colors.three.canvas)
                    }}
                    camera={{
                      fov: 45,
                      position: [0, 0, 300],
                    }}
                    style={{
                      width: theme.sizes.canvas,
                      height: theme.sizes.canvas,
                      cursor: 'move',
                    }}
                  >
                    {/* @ts-ignore */}
                    <OrbitControls
                      enableRotate={true}
                      enableZoom={false}
                      enablePan={false}
                    />
                    <pointLight
                      color={theme.colors.three.pointLight}
                      position={[0, 0, -100000]}
                      intensity={1}
                    />
                    <ambientLight
                      color={theme.colors.three.ambientLight}
                      intensity={1.4}
                    />
                    <ThreeGeo radius={radius} />
                    <ThreeIss
                      isLoading={isLoading}
                      issNow={issNow}
                      radius={radius}
                    />
                    <ThreeGraticule radius={radius} />
                    <ThreeSphere radius={radius} />
                  </Canvas>
                </Fragment>
              ) : null}
            </Fragment>
          )
        }}
      </AppContext.Consumer>
    </Flex>
  )
}
