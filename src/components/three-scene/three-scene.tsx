import React, { Fragment, FunctionComponent } from 'react'
import { Box } from 'theme-ui'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { IContextProps } from '../../types'

import AppContext from '../../context/app-context'

import { FrameTimer } from '../frame-timer'
import { ThreeGeo } from '../three-geo'
import { ThreePoint } from '../three-point'
import { ThreeSphere } from '../three-sphere'

import theme from '../../gatsby-plugin-theme-ui'

export const ThreeScene: FunctionComponent = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      {' '}
      <AppContext.Consumer>
        {({ issNow, isLoading }: IContextProps) => {
          return (
            <Fragment>
              {!isLoading ? (
                <Fragment>
                  <FrameTimer issNow={issNow} />
                  <Canvas
                    gl={{ antialias: false, alpha: false }}
                    onCreated={({ gl }) =>
                      gl.setClearColor(theme.colors.three.canvas)
                    }
                    camera={{ position: [0, 0, 300], fov: 45 }}
                    style={{ width: '100vw', height: '100vh' }}
                  >
                    {/* @ts-ignore */}
                    <OrbitControls
                      enableRotate={true}
                      enableZoom={false}
                      enablePan={false}
                    />
                    <directionalLight
                      color={theme.colors.three.geo}
                      intensity={0.2}
                    />
                    <pointLight intensity={0.4} position={[300, 300, 300]} />
                    <ambientLight color={theme.colors.three.point} />
                    <ThreeGeo />
                    {/* @ts-ignore */}
                    <ThreePoint isLoading={isLoading} issNow={issNow} />
                    <ThreeSphere />
                  </Canvas>
                </Fragment>
              ) : null}
            </Fragment>
          )
        }}
      </AppContext.Consumer>
    </Box>
  )
}
