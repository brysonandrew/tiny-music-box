/**
 * @author TheFrost / https://codepen.io/frost084/full/OKZNRm
 */

 const HoverImageShader = {
    uniforms: {
      texture: {
        type: 't',
        value: ''
      },
      imageAspectRatio: {
        type: 'f',
        value: 1.0
      },
      aspectRatio: {
        type: 'f',
        value: 1.0
      },
      opacity: {
        type: 'f',
        value: 1.0
      },
      hover: {
        type: 'f',
        value: 0.0
      }
    }
  }
  
  export { HoverImageShader }
  