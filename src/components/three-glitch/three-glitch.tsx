import React, { FunctionComponent, useEffect, useState } from 'react'
import { EffectComposer, Glitch, Grid } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction, Resizer, KernelSize } from 'postprocessing'

import { IContextProps } from '../../types'

interface IThreeGlitchProps extends IContextProps {}

export const ThreeGlitch: FunctionComponent<IThreeGlitchProps> = ({
  issNow,
}) => {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    setTrigger(true)
    setTimeout(() => {
      setTrigger(false)
    }, 200)
  }, [issNow])
  return (
    <EffectComposer>
      <Glitch
        active={trigger}
        delay={[0, 0]}
        strength={[0.1, 0.5]}
        mode={GlitchMode.CONSTANT_WILD}
      />
    </EffectComposer>
  )
}
