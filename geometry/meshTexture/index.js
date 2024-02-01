import { DoubleSide, Mesh, PlaneGeometry, ShaderLib, SphereGeometry, Vector2 } from "three";
import { createTexture } from "../../textures";
import { phongMaterial } from "../materials";
import { Gui } from "../../controls";
import { cubeRendererTarget } from "../../camera";





export function createPlaneMesh(){
    var texture=createTexture('/assets/images/111.webp')
    var text=createTexture('/assets/images/b41001f2.png')

    const mapObj={
        bumpScale:0.5,
        reflectivity:0.5
    }
    const material=phongMaterial({
         map:text,
         envMap:cubeRendererTarget.texture,
        // bumpMap :texture,
        // bumpScale :mapObj.bumpScale,
        normalMap:texture,
        normalScale:new Vector2(mapObj.bumpScale,mapObj.bumpScale),
        reflectivity:mapObj.reflectivity,
        // lightMap:texture,
        side:DoubleSide
    })

    testInit()
    //  测试模拟
function testInit() {
    const gui = new Gui()
    const tween = gui.addFolder("纹理测试")
    tween.add(mapObj, 'bumpScale', 0, 2, 0.001).name("巴凸的高度").onChange((value)=>{
        material.bumpScale=value
        material.normalScale=new Vector2(value,value)
    })
    tween.add(mapObj, 'reflectivity', 0, 2, 0.001).name("环境贴图对表面的影响程度").onChange((value)=>{
        material.reflectivity=value
    })
   
}

    return new Mesh(new PlaneGeometry(10,10,10,10),material)
}


export function createSphereMesh(){
    var texture=createTexture('/assets/images/111.webp')
    var text=createTexture('/assets/images/b41001f2.png')

    const mapObj={
        bumpScale:0.5,
        reflectivity:0.5
    }
    const material=phongMaterial({
        
    })

    testInit()
    //  测试模拟
function testInit() {
    const gui = new Gui()
    const tween = gui.addFolder("纹理测试")
    tween.add(mapObj, 'bumpScale', 0, 2, 0.001).name("巴凸的高度").onChange((value)=>{
        material.bumpScale=value
        material.normalScale=new Vector2(value,value)
    })
    tween.add(mapObj, 'reflectivity', 0, 2, 0.001).name("环境贴图对表面的影响程度").onChange((value)=>{
        material.reflectivity=value
    })
   
}

    return new Mesh(new SphereGeometryGeometry(2,32,32),material)
}

