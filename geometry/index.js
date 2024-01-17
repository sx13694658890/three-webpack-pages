import { Mesh, BoxGeometry, PlaneGeometry, SphereGeometry } from "three"


import {basicMaterial, lamberMaterial} from './materials/index.js'

// 盒子
export const boxMesh = new Mesh(
    new BoxGeometry(1, 1),
    lamberMaterial({color:0xff0000})
  )
  boxMesh.position.y=1
  boxMesh.castShadow=true

// 平面
  export  const planeMesh=new Mesh(new PlaneGeometry(10,10),
  lamberMaterial())
  planeMesh.rotation.x=-.5*Math.PI
  planeMesh.receiveShadow=true


//球体
  export const sphereMesh= new Mesh(new SphereGeometry(0.5,20,20), lamberMaterial({color:0x7777ff}))
  sphereMesh.position.set(0,1,1)
  sphereMesh.castShadow=true