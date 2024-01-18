import { OrthographicCamera, PerspectiveCamera } from "three";


export const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  )
  camera.position.set(5, 6, 8)
  camera.lookAt(0, 0, 0)
  

const switchCamera=function(){
  if(camera instanceof PerspectiveCamera){
    camera=new OrthographicCamera(window.innerWidth/-16,window.innerWidth/16,window.innerHeight/16,window.innerHeight/-16,-200,500)
    camera.position.set(120,60,180)
    this.perspective="Orthographic"
  }else{
    camera=new PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    0.01,
    1000)
    camera.position.set(120,60,180)
    camera.lookAt(0,0,0)
    this.perspective='Perspective'
  }
}