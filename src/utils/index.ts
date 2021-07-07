import * as THREE from 'three'

export const vertex = (radius: number, latitude: number, longitude: number) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(
      radius,
      THREE.Math.degToRad(latitude),
      THREE.Math.degToRad(90 - longitude)
    )
  )

  return [vector.x, vector.y, vector.z]
}
