import { Mesh, BoxGeometry, PlaneGeometry, SphereGeometry, MultiplyBlending, Vector3, Group, Line, BufferGeometry, BufferAttribute, CircleGeometry, RingGeometry, Shape, ShapeGeometry,Path, DoubleSide, Vector2, LatheGeometry, ExtrudeGeometry } from "three"
import {ConvexGeometry} from "three/examples/jsm/geometries/ConvexGeometry.js"

import { basicMaterial, depthMaterial, meshes, multipleFace, lambertMaterial, phongMaterial,shaderMaterial, lineMaterial } from './materials/index.js'





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