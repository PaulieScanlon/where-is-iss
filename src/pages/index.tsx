import React, { FunctionComponent, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import axios from 'axios'

import { ThreeScene } from '../components/three-scene'

interface IssNow {
  message: string
  timestamp: number
  iss_position: {
    latitude: number
    longitude: number
  }
}

const IndexPage: FunctionComponent = () => {
  const [issNow, setIssNow] = useState<IssNow>()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/api/iss-now')
      .then((response) => {
        setIsLoading(false)
        setIssNow(response.data)
      })
      .catch((error) => {
        setHasError(true)
      })
  }, [])

  return (
    <main>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
        }}
      >
        <h1>Index Page</h1>
        {isLoading ? <p>Loading ...</p> : null}
        {hasError ? <p>Error</p> : null}
        {!isLoading && !hasError && issNow ? (
          <pre>{JSON.stringify(issNow, null, 2)}</pre>
        ) : null}
      </Box>
      <ThreeScene />
    </main>
  )
}

export default IndexPage
