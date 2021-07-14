import React, { Fragment, FunctionComponent } from 'react'
import { Box } from 'theme-ui'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useResizeDetector } from 'react-resize-detector'

import { IContextProps } from '../../types'

import AppContext from '../../context/app-context'

import { FrameTimer } from '../frame-timer'
import { ThreeGeo } from '../three-geo'
import { ThreeIss } from '../three-iss'
import { ThreeSphere } from '../three-sphere'
import { ThreeGraticule } from '../three-graticule'

import theme from '../../gatsby-plugin-theme-ui'

export const ThreeScene: FunctionComponent = () => {
  const getRadius = (width) => {
    if (width < 576) {
      // small
      return {
        svg: 320,
        three: 40,
      }
    } else if (width < 756) {
      // medium
      return {
        svg: 570,
        three: 70,
      }
    }
    // large
    else
      return {
        svg: 800,
        three: 90,
      }
  }

  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 500,
  })

  return (
    <Box
      ref={ref}
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
                  <FrameTimer issNow={issNow} width={getRadius(width).svg} />
                  <Canvas
                    gl={{ antialias: false, alpha: false }}
                    onCreated={({ gl }) => {
                      gl.setClearColor(theme.colors.three.canvas)
                    }}
                    camera={{
                      fov: 45,
                      position: [0, 0, 300],
                    }}
                    style={{ width: '100vw', height: '100vh', cursor: 'move' }}
                  >
                    {/* @ts-ignore */}
                    <OrbitControls
                      enableRotate={true}
                      enableZoom={false}
                      enablePan={false}
                    />
                    <ambientLight color={theme.colors.three.point} />
                    <ThreeGeo radius={getRadius(width).three} />
                    <ThreeIss
                      isLoading={isLoading}
                      issNow={issNow}
                      radius={getRadius(width).three}
                    />
                    <ThreeSphere radius={getRadius(width).three} />
                    <ThreeGraticule radius={getRadius(width).three} />
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
