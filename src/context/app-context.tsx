import React, {
  createContext,
  FunctionComponent,
  useState,
  useEffect,
} from 'react'

import axios from 'axios'

import { IContextProps, IssNow } from '../types'

const AppContext = createContext<IContextProps>({
  issNow: {
    message: '',
    timestamp: 0,
    iss_position: {
      latitude: 0,
      longitude: 0,
    },
  },
  isLoading: true,
})

export const AppProvider: FunctionComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [issNow, setIssNow] = useState<IssNow>()
  const [pollDelay] = useState(5000)

  const poll = () => {
    axios
      .get('/api/iss-now')
      .then((response) => {
        setIsLoading(false)
        setIssNow(response.data.data)
      })
      .catch((error) => {
        console.log(error)
        throw new Error()
      })
  }
  useEffect(() => {
    setIsLoading(true)
    const pollInterval = setInterval(() => {
      poll()
    }, pollDelay)

    poll()
    return () => clearInterval(pollInterval)
  }, [])

  return (
    <AppContext.Provider
      value={{
        issNow: issNow,
        isLoading: isLoading,
        pollDelay: pollDelay,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
