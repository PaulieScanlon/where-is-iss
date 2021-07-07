import React, { Fragment, FunctionComponent } from 'react'
import { IContextProps } from '../../types'
import { vertex } from '../../utils'

import theme from '../../gatsby-plugin-theme-ui'

interface IPointProps extends IContextProps {}

export const ThreePoint: FunctionComponent<IPointProps> = ({
  isLoading,
  issNow,
}) => {
  const { iss_position } = issNow

  return (
    <Fragment>
      {!isLoading ? (
        <mesh
          position={[
            ...vertex(110, iss_position.latitude, iss_position.longitude),
          ]}
        >
          {/* <sphereGeometry args={[2, 12, 8]} /> */}
          <octahedronGeometry args={[3]} />
          <meshPhongMaterial color={theme.colors.three.point} />
        </mesh>
      ) : null}
    </Fragment>
  )
}
