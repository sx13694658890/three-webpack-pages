import { PerspectiveCamera } from "three";


export const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  )
  camera.position.set(5, 6, 8)
  camera.lookAt(0, 0, 0)
  