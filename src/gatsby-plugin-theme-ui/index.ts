const theme = {
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#ff4de8',
    secondary: '#ffd440',
    three: {
      iss: '#000000',
      frame: '#ffffff',
      geo: '#e753e7',
      graticule: '#ffffff',
      sphere: '#ffffff',
      ambientLight: '#ffffff',
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
    a: {
      color: 'text',
      ':hover': {
        color: 'primary',
      },
    },
  },
}

export default theme
