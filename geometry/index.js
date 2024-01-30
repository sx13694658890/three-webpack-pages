import { Mesh, BoxGeometry, PlaneGeometry, SphereGeometry, MultiplyBlending, Vector3, Group, Line, BufferGeometry, BufferAttribute, CircleGeometry, RingGeometry, Shape, ShapeGeometry,Path,Points, DoubleSide, Vector2, LatheGeometry, ExtrudeGeometry,PointsMaterial,Float32BufferAttribute,Sprite,SpriteMaterial,Texture} from "three"
import {ConvexGeometry} from "three/examples/jsm/geometries/ConvexGeometry.js"

import { basicMaterial, depthMaterial, meshes, multipleFace, lambertMaterial, phongMaterial,shaderMaterial, lineMaterial, pointMaterial,normalMaterial } from './materials/index.js'

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

// 盒子
let boxIndex = 0
let boxPoor = []
export const boxMesh = () => {

    const boxMesh = new Mesh(new BoxGeometry(1, 1, 1),
        multipleFace([0x009e60, 0x0051ba, 0xffd500, 0xff5800, 0xc41e3a, 0xffffff])
    )
    boxMesh.name = "boxMesh-" + boxIndex
    boxMesh.position.y = 1
    boxMesh.castShadow = true
    boxIndex += 1
    boxPoor.push(boxMesh)
    return boxPoor
}

// 魔方
export function cubeBox() {
    let group = new Group()
    // 创建魔方
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const cubeGeom = new BoxGeometry(0.95, 0.95, 0.95)
                const cube = new Mesh(cubeGeom, multipleFace([0x009e60, 0x0051ba, 0xffd500, 0xff5800, 0xc41e3a, 0xffffff]))
                cube.position.set(x * 1 - 1, y * 1, z * 1 - 1)
                group.add(cube)
            }
        }
    }
    group.position.y = 2
    return group
}


// 平面
export const planeMesh = new Mesh(new PlaneGeometry(10, 10),
    lambertMaterial())
planeMesh.rotation.x = -.5 * Math.PI
planeMesh.receiveShadow = true


//球体
export const sphereMesh = new Mesh(new SphereGeometry(1.5, 32, 32), shaderMaterial({
    // color: 0xcccccc,
    // ambient: 0xcccccc,
    // emissive: 0x1243ff,
      //  specular: 0xcccccc,
    // shininess: 50,
    // metal: true,
    //wrapAround: true
    // wrapAround: true
    
}))
sphereMesh.position.set(0, 1, 0)
sphereMesh.castShadow = true
sphereMesh.visible=false
// 线
const bufferGeo=new BufferGeometry()
bufferGeo.setAttribute('position',new BufferAttribute(new Float32Array([
  -5, 0, 0,
  0,  5, 0,
  5,  0, 0,
  0,  5, 0,
  0, 0,  5,
  0,  5, 0,
  0, 0,  -5,
]),3))
export const lineMesh=new Line(
   bufferGeo
  ,lineMaterial()
)



export const circleMesh=new Mesh(new CircleGeometry(0.5,22,0,Math.PI*2),basicMaterial())
circleMesh.position.set(0,1,0)

// 拉伸

const extrude=new Shape()
extrude.moveTo(0,0)
extrude.lineTo(0,2)
extrude.lineTo(2,2)
extrude.lineTo(2,0)
extrude.lineTo(0,0)
export const extrudeMesh=new Mesh(
  new ExtrudeGeometry(extrude,{
    steps:1,
    depth:2,
    bevelEnabled:true
  }),
  basicMaterial({
    color:'red'
  })
)

export const ringMesh=new Mesh(new RingGeometry(),basicMaterial({color:0x23fb21}))

ringMesh.position.set(1,1,1)

var heartShape = new Shape();

heartShape.moveTo( 1,1 );
// heartShape.lineTo(2,2)
// heartShape.bezierCurveTo(3,4,4,5,3,3)
// heartShape.splineThru([new Vector2(5,3),new Vector2(6,6),new Vector2(7,8)])
// heartShape.quadraticCurveTo(2,2,0,0)

const path=new Path()
path.lineTo(0,0.5)
path.quadraticCurveTo(0, 1, 0.2, 1 )
path.lineTo( 1, 1 );



const hole3=new Path()
heartShape.absellipse(4,4,4,2,0,2*Math.PI,true)
// heartShape.holes.push(hole3)

// 形状
export const  shapeMesh=new Mesh(
  new ShapeGeometry(heartShape,40),
  basicMaterial({
    side:DoubleSide
  })
)
console.log('111111',heartShape.getPointsHoles());
// 联合材质生成的网格体
export const multiMeshes = meshes(new BoxGeometry(5, 5, 5, 32, 32, 32), basicMaterial({ color: 0x00ff00, transparent: true, blending: MultiplyBlending }), depthMaterial())
multiMeshes.children[0].scale.set(0.99, 0.99, 0.99)
multiMeshes.position.set(0, 5, 0)



var points=[]
var spline=[]
for(var i=0;i<20;i++){
  var x=-2+Math.round(Math.random()*4);
  var y=-2+Math.round(Math.random()*4);
  var z=-2+Math.round(Math.random()*4);
  spline.push(new Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * 12 + 12,0,
      i - 2 + 2 / 2))
  points.push(new Vector3(x,y,z))
}
// 凸面几何体
export  const convexMesh=new Mesh(
  new ConvexGeometry(points),
  basicMaterial()
)


export  const latheMesh=new Mesh(
  new LatheGeometry(spline,12,0,Math.PI/2),
  basicMaterial()
)
latheMesh.position.set(0,1,0)

export function createParticles(scene){
   const geo=new BufferGeometry()
   const vertices=[]
   
   for(let x=0;x<5;x++){
    for(let y=0;y<5;y++){
      vertices.push(x*0.5,y*0.5,0)
    }
   }
   geo.setAttribute('position',new Float32BufferAttribute(vertices,3))
   scene.add(new Points(geo, pointMaterial))
}


export const spriteMesh=new Sprite(new SpriteMaterial({
  color:0xffffff,
  side:DoubleSide,
  map:generateSpriteTexture()
}))



function addCube () {
  const cubeSize = 3
  const cubeGeometry = new BoxGeometry(cubeSize, cubeSize, cubeSize)
  const cubeMaterial = normalMaterial({
    transparent: true,
    
  })
  const cube = new Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
 
  cube.position.x = -3 + Math.round(Math.random()*6)
  cube.position.y = -4+Math.round(Math.random()*8 )
  cube.position.z =-3+Math.round(Math.random()*3 )
 
  return cube
 }


 // 将多个网格 merge 
export function createMerge(scene){
  const group=new Group()
  let arrayGeometry=[]
  for (let i = 0; i < 5; i++) {
    const cube=addCube ()
    cube.updateMatrix()
    // arrayGeometry.push(cube.geometry.clone().applyMatrix4(cube.matrixWorld))
    group.add(cube)
  }
  
  // console.log(22222,arrayGeometry)
  // const geometry=BufferGeometryUtils.mergeGeometries(arrayGeometry, true)
  scene.add(group)
  // scene.add(new Mesh(geometry, normalMaterial({
  //   transparent: true,
  //   opacity: 0.5
  // })))
}


// 通过canvas 设置纹理
function generateSpriteTexture(){
  var canvas=document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  var context=canvas.getContext('2d')
  var gradient=context.createRadialGradient(8,8,0,8,8,8);
  gradient.addColorStop(0,'rgba(255,255,255,1');
  gradient.addColorStop(0.2,'rgba(10,255,255,1');
  gradient.addColorStop(0.6,'rgba(10,0,255,1');
  gradient.addColorStop(1.0,'rgba(255,255,255,1');
  context.fillStyle=gradient;
  context.fillRect(0,0,canvas.width,canvas.height)
  var texture=new Texture(canvas)
  texture.needsUpdate=true
  return texture
}

