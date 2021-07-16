import React, { Fragment, FunctionComponent } from 'react'
import { Grid, Flex, Box, Container } from 'theme-ui'
import { useResizeDetector } from 'react-resize-detector'

import { IContextProps } from '../types'
import AppContext from '../context/app-context'

import { ThreeScene } from '../components/three-scene'
import { Logo } from '../components/logo/logo'

const IndexPage: FunctionComponent = () => {
  const getRadius = (width) => {
    if (width < 575) {
      // small
      return {
        svg: 370,
        radius: 60,
      }
    }
    // large
    else
      return {
        svg: 560,
        radius: 90,
      }
  }

  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 500,
  })

  return (
    <Flex
      as="main"
      sx={{
        alignItems: 'center',
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <Container>
        <Grid
          ref={ref}
          sx={{
            boxShadow: 0,
            gap: 0,
            gridTemplateColumns: ['1fr', '1fr', '1fr', '1fr 1fr'],
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
          >
            <AppContext.Consumer>
              {({ issNow, isLoading }: IContextProps) => {
                return (
                  <Fragment>
                    {!isLoading ? <Logo issNow={issNow} /> : null}
                  </Fragment>
                )
              }}
            </AppContext.Consumer>
          </Box>
          <Box
            sx={{
              backgroundColor: 'primary',
            }}
          >
            <ThreeScene
              radius={getRadius(width).radius}
              svg={getRadius(width).svg}
            />
          </Box>
        </Grid>
      </Container>
    </Flex>
  )
}

export default IndexPage
