import React, { Fragment, FunctionComponent } from 'react'
import { Grid, Flex, Box, Link, Container, Text, Spinner } from 'theme-ui'
import { useResizeDetector } from 'react-resize-detector'

import { IContextProps } from '../types'
import AppContext from '../context/app-context'

import { ThreeScene } from '../components/three-scene'
import { Logo } from '../components/logo'
import { Octocat } from '../components/octocat'

const IndexPage: FunctionComponent = () => {
  const getRadius = (width) => {
    if (width < 575) {
      // small
      return {
        svg: 368,
        radius: 60,
      }
    }
    // large
    else
      return {
        svg: 570,
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
            minHeight: 'canvas',
          }}
        >
          <Flex
            sx={{
              flex: 1,
              p: 4,
            }}
          >
            <AppContext.Consumer>
              {({ issNow, isLoading }: IContextProps) => {
                return (
                  <Flex
                    sx={{
                      flexDirection: 'column',
                    }}
                  >
                    {!isLoading ? (
                      <Fragment>
                        <Logo issNow={issNow} />
                        <Text sx={{ mb: 3 }}>
                          A{' '}
                          <Link
                            href="https://www.gatsbyjs.com/products/cloud/functions"
                            target="_blank"
                            rel="noreferer"
                          >
                            Gatsby Functions
                          </Link>{' '}
                          demo by{' '}
                          <Link
                            href="https://twitter.com/PaulieScanlon"
                            target="_blank"
                            rel="noreferer"
                          >
                            @PaulieScanlon
                          </Link>
                        </Text>
                        <Box
                          as="ul"
                          sx={{
                            lineHeight: 1.5,
                            mb: 3,
                          }}
                        >
                          <Box as="li">
                            <Link
                              href="https://github.com/gatsbyjs/gatsby"
                              target="_blank"
                              rel="noreferer"
                            >
                              Gatsby v3.9
                            </Link>
                          </Box>
                          <Box as="li">
                            <Link
                              href="https://wheretheiss.at"
                              target="_blank"
                              rel="noreferer"
                            >
                              wheretheiss.at
                            </Link>
                          </Box>
                          <Box as="li">
                            <Link
                              href="https://github.com/pmndrs/react-three-fiber"
                              target="_blank"
                              rel="noreferer"
                            >
                              React Three Fibre
                            </Link>
                          </Box>
                          <Box as="li">
                            <Link
                              href="https://github.com/vasturiano/three-geojson-geometry"
                              target="_blank"
                              rel="noreferer"
                            >
                              ThreeJS GeoJSON Geometry
                            </Link>
                          </Box>
                        </Box>
                        <Flex
                          sx={{
                            flex: 1,
                            alignItems: 'flex-end',
                          }}
                        >
                          <Grid
                            sx={{
                              gap: 2,
                              alignItems: 'center',
                              gridTemplateColumns: '24px auto',
                            }}
                          >
                            <Octocat
                              sx={{
                                color: 'secondary',
                              }}
                            />
                            <Link
                              sx={{
                                fontSize: 0,
                              }}
                              href="https://github.com/PaulieScanlon/where-is-iss"
                              target="_blank"
                              rel="noreferer"
                            >
                              https://github.com/PaulieScanlon/where-is-iss
                            </Link>
                          </Grid>
                        </Flex>
                      </Fragment>
                    ) : (
                      <Spinner />
                    )}
                  </Flex>
                )
              }}
            </AppContext.Consumer>
          </Flex>
          <Box
            sx={{
              // backgroundColor: 'primary',
              backgroundImage: (theme: any) =>
                `linear-gradient(${theme.colors.secondary}, ${theme.colors.primary})`,
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
