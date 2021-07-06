import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
  useRef,
} from 'react'
import { Box } from 'theme-ui'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
// import ThreeGlobe from 'three-globe'
// import Globe from 'react-globe.gl'

import { GeoJsonGeometry } from 'three-geojson-geometry'
import * as topojson from 'topojson-client'

import theme from '../../gatsby-plugin-theme-ui'

// extend({ Globe })

// @ts-ignore
// import geoJson from '../../geoJson/CNTR_BN_01M_2020_4326.geojson'

import axios from 'axios'

// const Land = () => {
//   const [mesh, setMesh] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   const vertex = ([longitude, latitude], radius) => {
//     return new THREE.Vector3().setFromSpherical(
//       new THREE.Spherical(
//         radius,
//         THREE.Math.degToRad(90 - longitude),
//         THREE.Math.degToRad(latitude)
//       )
//     )
//   }

//   useEffect(() => {
//     axios
//       .get('https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json')
//       .then((response) => {
//         setIsLoading(false)
//         setMesh(
//           topojson.mesh(response.data, response.data.objects.land).coordinates
//         )
//       })
//       .catch((error) => {
//         console.log(error)
//         throw new Error()
//       })
//   }, [])

//   const points = (radius: number) => {
//     return mesh
//       .map((P: any) => {
//         return P.map((_: any, i: number) => {
//           return vertex(P[0], radius), vertex(P[i], radius)
//         })
//       })
//       .flat()
//   }

//   return (
//     <Fragment>
//       {!isLoading ? (
//         <mesh
//           geometry={new THREE.BufferGeometry().setFromPoints(points(2.5))}
//           material={
//             new THREE.LineBasicMaterial({
//               color: 0xff0000,
//             })
//           }
//         />
//       ) : // <line>
//       //   <bufferGeometry
//       //     attach="geometry"
//       //     geometry={new THREE.BufferGeometry().setFromPoints(points(2.5))}
//       //   />
//       //   <lineBasicMaterial
//       //     attach="material"
//       //     material={new THREE.LineBasicMaterial({ color: 0xff0000 })}
//       //   />
//       // </line>
//       null}
//     </Fragment>
//   )
// }

// const Geo = () => {
//   const [geoJson, setGeoJson] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     axios
//       .get(
//         'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson'
//       )
//       .then((response) => {
//         setIsLoading(false)
//         setGeoJson(response.data)
//       })
//       .catch((error) => {
//         console.log(error)
//         throw new Error()
//       })
//   }, [])

//   return (
//     <line>
//       {!isLoading ? (
//         <Fragment>
//           <mesh
//             geometry={new GeoJsonGeometry(geoJson, 100, 72)}
//             material={
//               new THREE.LineBasicMaterial({
//                 color: 0xff0000,
//               })
//             }
//           />
//           {/* <bufferGeometry
//             attach="geometry"
//             geometry={new GeoJsonGeometry(geoJson, 100, 72)}
//           />
//           <lineBasicMaterial
//             attach="material"
//             material={new THREE.LineBasicMaterial({ color: 0xff0000 })}
//           /> */}
//         </Fragment>
//       ) : null}
//     </line>
//   )
// }

const Globe = () => {
  const { scene } = useThree()
  const [issStart, setIssStart] = useState([])
  const [issNow, setIssNow] = useState([])

  useEffect(() => {
    axios
      .get('/api/iss-now')
      .then((response) => {
        // console.log(response.data.data)
        setIssStart([
          {
            lat: Number(response.data.data.iss_position.latitude),
            lng: Number(response.data.data.iss_position.longitude),
            size: 1,
            color: 'red',
            alt: 0.3,
            radius: 5,
          },
        ])
      })
      .catch((error) => {
        console.log(error)
        throw new Error()
      })
  }, [])

  // @ts-ignore
  useEffect(async () => {
    const ThreeGlobe = (await import('three-globe')).default

    const N = 300
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      alt: Math.random(),
      radius: Math.random() * 5,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    }))
    if (issStart.length > 0) {
      axios
        .get(
          'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
        )
        .then((response) => {
          const _globe = new ThreeGlobe()
            .customLayerData(issStart)
            // .customLayerData(gData)
            .customThreeObject(
              (d) =>
                new THREE.Mesh(
                  new THREE.SphereBufferGeometry(d.radius),
                  new THREE.MeshLambertMaterial({ color: d.color })
                )
            )
          _globe
            .customThreeObjectUpdate((obj, d) => {
              // @ts-ignore
              Object.assign(obj.position, _globe.getCoords(d.lat, d.lng, d.alt))
            })
            .hexPolygonsData(response.data.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.3)

          scene.add(_globe)

          // setInterval(() => {
          // console.log('here')
          // gData.forEach((d) => {
          // console.log(issNow)
          // d.lat = issNow[0].lat
          // d.lng = issNow[0].lng
          // console.log(d)
          // })
          // gData.forEach((d) => (d.lat += 5))
          // _globe.customLayerData(_globe.customLayerData())
          // }, 5000)
        })
        .catch((error) => {
          console.log(error)
          throw new Error()
        })
    }
  }, [issStart])

  return null
}

// const ReactGlobe = () => {
//   const [countries, setCountries] = useState({ features: [] })
//   useEffect(() => {
//     axios
//       .get(
//         'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson'
//       )
//       .then((response) => {
//         setCountries({ features: response.data.features })
//       })
//       .catch((error) => {
//         console.log(error)
//         throw new Error()
//       })
//   }, [])

//   // console.log(countries.features)

//   // return null
//   return (
//     <Globe
//       hexPolygonsData={countries.features}
//       hexPolygonResolution={3}
//       hexPolygonMargin={0.3}
//       hexPolygonColor={() =>
//         `#${Math.round(Math.random() * Math.pow(2, 24))
//           .toString(16)
//           .padStart(6, '0')}`
//       }
//       // hexPolygonLabel={({ properties: d }) => `
//       //   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
//       //   Population: <i>${d.POP_EST}</i>
//       // `}
//     />
//   )
// }

export const ThreeScene: FunctionComponent = () => {
  // const virtualCamera = useRef<THREE.Camera>()
  // const myCamera = useResource()

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
      {/* <ReactGlobe /> */}
      <Canvas
        gl={{ antialias: false, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor(theme.colors.three.canvas)}
        camera={{ position: [0, 0, 300], fov: 45 }}
      >
        {/*  @ts-ignore */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        {/* <perspectiveCamera
          ref={virtualCamera}
          position={[0, 0, 300]}
          fov={70}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={1000}
        /> */}

        <ambientLight color={0xbbbbbb} />
        <directionalLight color={0xffffff} intensity={0.6} />

        <Globe />
        {/* <Land /> */}
        {/* <Geo /> */}
      </Canvas>
    </Box>
  )
}
