const theme = {
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#ff4de8',
    three: {
      iss: '#000000',

      // frame: '#ffd440',
      frame: '#ffffff',

      // geo: '#a0a0a0',
      // graticule: '#fefefe',
      // sphere: '#fefefe',
      // geo: '#cc33cc',
      // graticule: '#3d3d3d',
      geo: '#ffffff',
      // geo: '#ffd440',
      // geo: '#000000',

      graticule: '#fe6aeb',
      // sphere: '#ffffff',
      sphere: '#fd53e7',

      ambientLight: '#ffffff',
      // directonalLight: '#ffffff',
      pointLight: '#ffffff',
      canvas: '#ff4de8',
    },
  },

  fonts: {
    body: 'system-ui',
  },

  shadows: ['0px 0px 40px 10px #dadada'],

  sizes: {
    container: ['100%', 1140],
    canvas: 576,
  },

  layout: {
    container: {
      px: [0, 0, 0, 4],
    },
  },

  styles: {
    root: {
      fontFamily: 'body',
      m: 0,
    },
  },
}

export default theme
