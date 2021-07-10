import React, { Fragment, FunctionComponent } from 'react'
import { Box } from 'theme-ui'

import { IContextProps } from '../types'
import AppContext from '../context/app-context'

import { ThreeScene } from '../components/three-scene'

const IndexPage: FunctionComponent = () => {
  return (
    <Box
      as="main"
      sx={{
        pre: {
          fontSize: '16px',
          ml: 4,
        },
      }}
    >
      <AppContext.Consumer>
        {({ issNow, isLoading }: IContextProps) => {
          return (
            <Fragment>
              {!isLoading ? <pre>{JSON.stringify(issNow, null, 2)}</pre> : null}
            </Fragment>
          )
        }}
      </AppContext.Consumer>

      <ThreeScene />
    </Box>
  )
}

export default IndexPage
