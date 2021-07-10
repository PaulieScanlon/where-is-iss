import * as THREE from 'three'

export const getVertex = (
  latitude: number,
  longitude: number,
  radius: number
) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(
      radius,
      THREE.MathUtils.degToRad(90 - latitude),
      THREE.MathUtils.degToRad(longitude)
    )
  )
  return vector
}
