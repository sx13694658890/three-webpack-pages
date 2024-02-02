import { CubeCamera, LinearMipMapLinearFilter, OrthographicCamera, PerspectiveCamera, WebGLCubeRenderTarget } from "three";
import {
  widthHalf,
  heightHalf
} from '@utils/const.js'

export function createPerspectiveCamera() {
  const camera = new PerspectiveCamera(
    75,
    widthHalf / heightHalf,
    0.01,
    1000
  )
  camera.position.set(5, 6, 13)
  camera.lookAt(0, 0, 0)
  return camera
}
export function createOrthoGraphicCamera(){
  const orthoCamera = new OrthographicCamera(-widthHalf, widthHalf, heightHalf, -heightHalf, 0.1, 10000)
  orthoCamera.position.z = 50
  orthoCamera.lookAt(0,0,0)
  return orthoCamera
}



export const cubeRendererTarget = new WebGLCubeRenderTarget(120, {
  generateMipmaps: true,
  minFilter: LinearMipMapLinearFilter
})

// 构造一个包含6个PerspectiveCameras（透视摄像机）的立方摄像机， 并将其拍摄的场景渲染到一个WebGLCubeRenderTarget上。
export const cubeCamera = new CubeCamera(0.1, 100000, cubeRendererTarget)
cubeCamera.position.set(0, 0, 0)



const switchCamera = function () {
  if (camera instanceof PerspectiveCamera) {
    camera = new OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500)
    camera.position.set(120, 60, 180)
    this.perspective = "Orthographic"
  } else {
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,
      0.01,
      1000)
    camera.position.set(120, 60, 180)
    camera.lookAt(0, 0, 0)
    this.perspective = 'Perspective'
  }
}