import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry'
import { Box } from 'theme-ui'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import * as topojson from 'topojson-client'

import theme from '../../gatsby-plugin-theme-ui'

// @ts-ignore
// import geoJson from '../../geoJson/CNTR_BN_01M_2020_4326.geojson'

import axios from 'axios'

const Land = () => {
  const [mesh, setMesh] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)
        setMesh(
          topojson.mesh(response.data, response.data.objects.land).coordinates
        )
      })
      .catch((error) => {
        console.log(error)
        throw new Error()
      })
  }, [])

  const points = (radius: number) => {
    return mesh
      .map((P: any) => {
        return P.map((_: any, i: number) => {
          return vertex(P[0], radius), vertex(P[i], radius)
        })
      })
      .flat()
  }

  return (
    <Fragment>
      {!isLoading ? (
        <mesh
          geometry={new THREE.BufferGeometry().setFromPoints(points(2.5))}
          material={
            new THREE.LineBasicMaterial({
              color: 0xff0000,
            })
          }
        />
      ) : null}
    </Fragment>
  )
}

const Geo = () => {
  const [geoJson, setGeoJson] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson'
      )
      .then((response) => {
        setIsLoading(false)
        setGeoJson(response.data)
      })
      .catch((error) => {
        console.log(error)
        throw new Error()
      })
  }, [])

  return (
    <line>
      {!isLoading ? (
        <Fragment>
          <bufferGeometry
            attach="geometry"
            geometry={new GeoJsonGeometry(geoJson, 100, 72)}
          />
          <lineBasicMaterial
            attach="material"
            material={new THREE.LineBasicMaterial({ color: 0xff0000 })}
          />
        </Fragment>
      ) : null}
    </line>
  )
}
export const ThreeScene: FunctionComponent = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 0,
        canvas: {
          border: '1px solid red',
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
        {/* <Land /> */}
        <Geo />
      </Canvas>
    </Box>
  )
}
