/** @jsx jsx */
import { FunctionComponent, useState } from 'react'
import { jsx, Box } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { useEffect } from 'react'
import { IssNow } from '../../types'

interface IFrameTimerProps {
  issNow: IssNow
}

export const FrameTimer: FunctionComponent<IFrameTimerProps> = ({ issNow }) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setCounter(counter + 2)
  }, [issNow])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 40 40">
        <circle
          sx={{
            stroke: 'text',
            fill: 'transparent',
            transformOrigin: 'center',
            transform: `rotate(${counter}deg)`,
            transition: '.3s linear all',
          }}
          cx="20"
          cy="20"
          r="15.91549430918954"
          opacity={0.2}
          strokeWidth="2"
          strokeDasharray={0.2}
        />
      </svg>
    </Box>
  )
}
