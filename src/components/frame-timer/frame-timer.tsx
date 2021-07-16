/** @jsx jsx */
import { FunctionComponent, useState } from 'react'
import { jsx, Box } from 'theme-ui'
import { useSpring, animated } from 'react-spring'
import { IContextProps } from '../../types'
import { useEffect } from 'react'

import AppContext from '../../context/app-context'

interface ITickerCircleProps {
  duration: number
}

const TickerCircle: FunctionComponent<ITickerCircleProps> = ({ duration }) => {
  const props = useSpring({
    strokeDashoffset: 100,
    from: { strokeDashoffset: 0 },
    config: { duration: duration },
  })

  return (
    <animated.circle
      cx="20"
      cy="20"
      r="16"
      opacity={0.8}
      strokeWidth="0.5"
      strokeDasharray={100}
      strokeDashoffset={100}
      strokeLinecap="round"
      style={props}
    />
  )
}

interface ICirclePulseProps {
  duration?: number
  scale?: number
}

const PulseCircle: FunctionComponent<ICirclePulseProps> = ({
  duration = 600,
  scale = 1.7,
}) => {
  const props = useSpring({
    transform: `scale(${scale})`,
    opacity: 0,
    from: {
      transform: 'scale(1)',
      opacity: 0.3,
    },
    config: { duration: duration, mass: 1, tension: 280, friction: 180 },
  })

  return (
    <animated.circle
      cx="20"
      cy="20"
      r="16"
      strokeWidth={0.5}
      strokeLinecap="round"
      style={props}
    />
  )
}

interface IFrameTimerProps extends IContextProps {
  /** The width to use */
  width: number
}

export const FrameTimer: FunctionComponent<IFrameTimerProps> = ({
  issNow,
  width,
}) => {
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    setTrigger(issNow ? issNow.timestamp : 1)
  }, [issNow])

  return (
    <AppContext.Consumer>
      {({ pollDelay }: IContextProps) => {
        return (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 1,
              pointerEvents: 'none',
              overflow: 'hidden',
              svg: {
                // text: {
                //   fontSize: '1px',
                //   fontFamily: 'body',
                //   fill: 'three.timer',
                // },
                circle: {
                  stroke: 'three.frame',
                  fill: 'transparent',
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                },
              },
            }}
          >
            <svg width={width} height="100%" viewBox="0 0 40 40">
              <TickerCircle key={`${trigger}-ticker`} duration={pollDelay} />
              <PulseCircle key={`${trigger}-pulse-a`} />
              <PulseCircle
                key={`${trigger}-pulse-b`}
                duration={780}
                scale={1.5}
              />
              <PulseCircle
                key={`${trigger}-pulse-c`}
                duration={800}
                scale={1.2}
              />
              {/* <Countdown key={`${trigger}-text`} duration={pollDelay} /> */}
              <circle
                cx="20"
                cy="20"
                r="16"
                opacity={0.7}
                strokeWidth="1"
                strokeDasharray={0.15}
              />
            </svg>
          </Box>
        )
      }}
    </AppContext.Consumer>
  )
}
