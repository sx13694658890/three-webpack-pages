import { AdditiveBlending, AmbientLight, DirectionalLight, HemisphereLight, PointLight, SpotLight } from "three";
import { planeMesh } from "../geometry";
import { texture } from '../textures/index.js'
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js"
// 聚光
export function createSpotLight() {
    const spotLight = new SpotLight(0xffffff);
    spotLight.position.set(0, 11, 0)
    spotLight.castShadow = true
    spotLight.intensity = 10.0
    spotLight.angle = 90
    spotLight.target = planeMesh
    spotLight.shadowCameraVisible = true
    spotLight.shadowDarkness = 1
    return spotLight
}
// 环境光
export const ambientLight = new AmbientLight(0xcccccc)
// ambientLight.position.set(1,1,5)


// 点光
export const pointLight = new PointLight(0xffffff,)
pointLight.position.set(1, 2, 1)
pointLight.intensity = 2.0;


// 平行光
export const directionLight = new DirectionalLight(0xffffff);
directionLight.position.set(0, 2.5, 0)
// directionLight.castShadow=true
directionLight.shadowCascade = true
directionLight.shadowCameraNear = 2.0
directionLight.shadowCameraFar = 200.0
directionLight.shadowCameraLeft = -50.1
directionLight.shadowCameraRight = 50
directionLight.shadowCameraTop = 50.0
directionLight.shadowCameraBottom = -50.0



// 半球光光源
// THREE.HemisphereLight  可 以通 过模拟反 光面和 光线 微弱的 天空来创 建更 加自然的室外光线。 这个光源也不提供任何与阴影相关的功能


export const hemisphereLight = new HemisphereLight(0x0000ff, 0x00ff00, 0.6)
hemisphereLight.position.set(0, 5.0)



// AreaLight 使用 这种光源可以 指定散发 光线的平面，而不是一个点。THREE. 1 AreaLight 不投 射任何阴影


// 镜头光晕
export const lensFlare = new Lensflare()
lensFlare.addElement(new LensflareElement(texture, 150, 2));
lensFlare.addElement(new LensflareElement(texture, 100, 0));
lensFlare.addElement(new LensflareElement(texture, 200, 0));

