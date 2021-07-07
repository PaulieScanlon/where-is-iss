import React, { Fragment, FunctionComponent } from 'react'
import { IContextProps } from '../../types'
import { vertex } from '../../utils'

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
          <sphereGeometry args={[2, 12, 8]} />
          <meshPhongMaterial color={0xe40b0b} />
        </mesh>
      ) : null}
    </Fragment>
  )
}
