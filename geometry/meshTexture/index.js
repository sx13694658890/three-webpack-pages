import { BoxGeometry, Color, DoubleSide, Mesh, PlaneGeometry, RepeatWrapping, ShaderLib, SphereGeometry, Vector2 } from "three";
import { createTexture } from "../../textures";
import { basicMaterial, phongMaterial } from "../materials";
import { Gui } from "../../controls";
import { cubeRendererTarget } from "../../camera";

import {
    widthHalf,
    heightHalf
  } from '@utils/const.js'



export function createPlaneMesh() {
    var texture = createTexture('/assets/images/build2.jpg')
    var texture1 = createTexture('/assets/images/111.webp')
    // texture.repeat.x=-2
    // texture.repeat.y=2

    texture.wrapS=texture.wrapT=RepeatWrapping
    texture.needsUpdate=true
    var text = createTexture('/assets/images/b41001f2.png')

    const mapObj = {
        bumpScale: 0.5,
        reflectivity: 0.5
    }
    const material = phongMaterial({
        // map: text,
        envMap: cubeRendererTarget.texture,
        // bumpMap :texture,
        // bumpScale :mapObj.bumpScale,
        normalMap: texture,
        normalScale: new Vector2(mapObj.bumpScale, mapObj.bumpScale),
        reflectivity: mapObj.reflectivity,
        // lightMap:texture,
        side: DoubleSide
    })

    testInit()
    //  测试模拟
    function testInit() {
        const gui = new Gui()
        const tween = gui.addFolder("纹理测试")
        tween.add(mapObj, 'bumpScale', 0, 2, 0.001).name("巴凸的高度").onChange((value) => {
            material.bumpScale = value
            material.normalScale = new Vector2(value, value)
        })
        tween.add(mapObj, 'reflectivity', 0, 2, 0.001).name("环境贴图对表面的影响程度").onChange((value) => {
            material.reflectivity = value
        })

    }

    return new Mesh(new PlaneGeometry(10, 10, 10, 10), material)
}


export function createSphereMesh() {
    var texture1 = createTexture('/assets/images/moon.jpg')
    var texture2 = createTexture('/assets/images/earth.jpg')

    const mapObj = {
        bumpScale: 0.5,
        normalScale :0.5,
        reflectivity: 0.5,
        shininess:30,
        specular:0xffffff,
    }
    const material = phongMaterial({
        specularMap:texture1,
        normalMap:texture2,
        specular:mapObj.specular,
        shininess:mapObj.shininess,
        
    })

    testInit()
    //  测试模拟
    function testInit() {
        const gui = new Gui()
        const tween = gui.addFolder("纹理测试")
        tween.add(mapObj, 'bumpScale', 0, 2, 0.001).name("巴凸的高度").onChange((value) => {
            material.bumpScale = value
            material.normalScale = new Vector2(value, value)
        })
        tween.add(mapObj, 'normalScale', 0, 2, 0.001).name("法线贴图影响程度").onChange((value) => {
            material.normalScale = new Vector2(value,value)
        })
        tween.addColor(mapObj,'specular').onChange((value) => {
            material.specular = new Color(value)
        })
        tween.add(mapObj, 'shininess', 0, 100, 0.001).name("高亮的程度").onChange((value) => {
            material.shininess = value
        })
    }

    const sphereMesh=new Mesh(new SphereGeometry(2, 32, 32), material)
    sphereMesh.position.set(3,2,-2)
   

    return sphereMesh
}

export function createBoxMesh() {
    var texture1 = createTexture('/assets/images/moon.jpg')
    var texture2 = createTexture('/assets/images/earth.jpg')

    const mapObj = {
        bumpScale: 0.5,
        normalScale :0.5,
        reflectivity: 0.5,
        shininess:30,
        specular:0xff2aff,
    }

    const material = phongMaterial({
        specularMap:texture1,
        // normalMap:texture2,
        specular:mapObj.specular,
        shininess:mapObj.shininess,
        
    })

    testInit()
    //  测试模拟
    function testInit() {
        const gui = new Gui()
        const tween = gui.addFolder("纹理测试")
       
    }

    const cubeMesh=new Mesh(new BoxGeometry(2, 2,2), material)
    cubeMesh.position.set(3,2,-2)
   

    return cubeMesh
}



export function createEarthMesh(){
    const earth=new Mesh(new SphereGeometry(5,32,32),phongMaterial({
        specular:0xfffff,
        shininess:4
    }))
    earth.position.x=-5
    return earth
}
export function createMarisMesh(){
    const earth=new Mesh(new SphereGeometry(2,32,32),phongMaterial({
        specular:0xfffff,
        shininess:4
    }))
    earth.position.x=5
    return earth
}
export function createBgMesh(){
    var texture = createTexture('/assets/images/map.jpg')
    const bg=new Mesh(new PlaneGeometry(10,10),basicMaterial({
    
        map:texture,
        side:DoubleSide
    }))
    bg.position.set(0,0,-50)
    bg.scale.set(widthHalf*2,heightHalf*2,1)
    return bg
}