import React, { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios'

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
      <h1>Index Page</h1>
      {isLoading ? <p>Loading ...</p> : null}
      {hasError ? <p>Error</p> : null}
      {!isLoading && !hasError && issNow ? (
        <pre>{JSON.stringify(issNow, null, 2)}</pre>
      ) : null}
    </main>
  )
}

export default IndexPage
