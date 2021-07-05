import React, { FunctionComponent, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import * as topojson from 'topojson-client'

import theme from '../../gatsby-plugin-theme-ui'

import axios from 'axios'

const Land = () => {
  const radius = 2.5
  const [mesh, setMesh] = useState(null)

  const vertex = ([longitude, latitude], radius) => {
    return new THREE.Vector3().setFromSpherical(
      new THREE.Spherical(
        radius,
        THREE.Math.degToRad(90 - longitude),
        THREE.Math.degToRad(latitude)
      )
    )
  }

  useEffect(() => {
    axios
      .get('https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json')
      .then((response) => {
        setMesh(
          topojson.mesh(response.data, response.data.objects.land).coordinates
        )
      })
      .catch((error) => {
        console.log(error)
        throw new Error()
      })
  }, [])

  if (!mesh) return null

  const points = () => {
    return mesh
      .map((P: any) => {
        return P.map((_: any, i: number) => {
          return vertex(P[0], radius), vertex(P[i], radius)
        })
      })
      .flat()
  }

  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  })

  const geometry = new THREE.BufferGeometry().setFromPoints(points())
  return <mesh material={material} geometry={geometry} />

  // const vertex = ([longitude, latitude], radius) => {
  //   const lambda = (longitude * Math.PI) / 180
  //   const phi = (latitude * Math.PI) / 180
  //   return new THREE.Vector3(
  //     radius * Math.cos(phi) * Math.cos(lambda),
  //     radius * Math.sin(phi),
  //     -radius * Math.cos(phi) * Math.sin(lambda)
  //   )
  // }

  // const points = () => {
  //   const points = []

  //   // @ts-ignore
  //   if (mesh) {
  //     for (const P of mesh) {
  //       for (let p0, p1 = vertex(P[0], radius), i = 1; i < P.length; ++i) {
  //         points.push((p0 = p1), (p1 = vertex(P[i], radius)))
  //       }
  //     }
  //     return points
  //   }
  //   return null
  // }

  // const material = new THREE.LineBasicMaterial({
  //   color: 0x0000ff,
  // })

  // if (mesh) {
  //   const geometry = new THREE.BufferGeometry().setFromPoints(points().flat())
  //   console.log(geometry)
  //   return <mesh material={material} geometry={geometry} />
  // }
}

export const ThreeScene: FunctionComponent = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 0,
        canvas: {
          width: '100vw',
          height: '100vh',
        },
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor(theme.colors.three.canvas)}
        // camera={{ position: [0, 0, 2], fov: 45 }}
      >
        <perspectiveCamera
          position={[0, 0, 10]}
          fov={70}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={1000}
        />
        <Land />
      </Canvas>
    </Box>
  )
}
