/** @jsx jsx */
import { FunctionComponent, useState } from 'react'
import { jsx, Box } from 'theme-ui'
import { useSpring, animated } from 'react-spring'
import { IContextProps, IssNow } from '../../types'
import { useEffect } from 'react'

import AppContext from '../../context/app-context'

// interface ICountdownProps {
//   duration: number
// }

// const Countdown: FunctionComponent<ICountdownProps> = ({ duration }) => {
//   const { number } = useSpring({
//     from: { number: duration },
//     number: 0,
//     config: { duration: duration },
//   })

//   return (
//     <animated.text x="50%" y="50%" textAnchor="middle">
//       {number.to((n) => `${Math.round(n)}s`)}
//     </animated.text>
//   )
// }

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
      opacity={0.3}
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

interface IFrameTimerProps {
  issNow: IssNow
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
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              // width: '100vw',
              height: '100vh',
              zIndex: 1,
              pointerEvents: 'none',
              svg: {
                text: {
                  fontSize: '1px',
                  fontFamily: 'body',
                  fill: 'three.timer',
                },
                circle: {
                  stroke: 'three.frame',
                  fill: 'transparent',
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                },
              },
            }}
          >
            <svg width={width} height="auto" viewBox="0 0 40 40">
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
                opacity={0.35}
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

{
  /* <circle
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
        /> */
}
{
  /* <circle
          sx={{
            stroke: 'text',
            fill: 'transparent',
            // transformOrigin: 'center',
            // transform: `rotate(${counter}deg)`,
            transition: '5s ease-in-out all',
          }}
          cx="20"
          cy="20"
          r="15.91549430918954"
          opacity={0.2}
          strokeWidth="2"
          strokeDasharray={1000}
          strokeDashoffset={strokeValue}
        /> */
}
