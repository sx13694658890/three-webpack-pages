import { Mesh, BoxGeometry, PlaneGeometry, SphereGeometry, MultiplyBlending, Vector3, Group } from "three"


import { basicMaterial, lamberMaterial, depthMaterial, meshes, normalMaterial, multipleFace } from './materials/index.js'

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

// 模仿
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
  group.position.y=2
  return group
}


// 平面
export const planeMesh = new Mesh(new PlaneGeometry(10, 10),
  lamberMaterial())
planeMesh.rotation.x = -.5 * Math.PI
planeMesh.receiveShadow = true


//球体
export const sphereMesh = new Mesh(new SphereGeometry(1.5, 10, 10), normalMaterial({}))
sphereMesh.position.set(0, 1.5, 1)
sphereMesh.castShadow = true

console.log("777", sphereMesh.geometry)




// 联合材质生成的网格体
export const multiMeshes = meshes(new BoxGeometry(5, 5, 5, 32, 32, 32), basicMaterial({ color: 0x00ff00, transparent: true, blending: MultiplyBlending }), depthMaterial())
multiMeshes.children[0].scale.set(0.99, 0.99, 0.99)
multiMeshes.position.set(0, 5, 0)