import { DoubleSide, LineBasicMaterial, LineDashedMaterial, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshNormalMaterial, MeshPhongMaterial, ShadowMaterial, Vector2,PointsMaterial } from "three";

import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'


// 基础材质
export const basicMaterial = (payload = {}) => new MeshBasicMaterial({
    ...payload
})


export const depthMaterial = (payload = {}) => new MeshDepthMaterial({
    wireframe: true,
    wireframeLinewidth: 2
})


export const normalMaterial = (payload = {}) => new MeshNormalMaterial({
    ...payload
})


// export const faceMaterial=(payload={})=>new M({
//     ...payload
// })



// 联合材质
export const meshes = (geometry, ...material) => new SceneUtils.createMultiMaterialObject(geometry, material)



// 多面材质
export const multipleFace = (colors) => {
    var matArray = [];
    for (var i = 0; i < colors.length; i++) {
        matArray.push(new MeshBasicMaterial(basicMaterial({ color: colors[i] })));
    }
    return matArray
}



// 高级材质

export const lambertMaterial = (payload = {}) => new MeshLambertMaterial({
    color: 0xffffff,
    ...payload
})


export const phongMaterial = (payload = {}) => new MeshPhongMaterial({
    color: 0xffffff,
    ...payload
})


export const shaderMaterial = (payload = {}) => new ShadowMaterial({
    uniforms: {
        time: { value: 0.2 },
        scale: { value: 0.2 },
        alpha: { value: 0.6 },
        resolution: { value: new Vector2(window.innerWidth, window.innerHeight) }
    },
    transparent: false,
    vertexShader: require('./shader/vertex_shader.glsl'),
    fragmentShader: require('./shader/fragment_shader.glsl'),
    ...payload
})


// 线材质  solid dashed

export const lineMaterial = (payload = { type: 'solid' }) => {

    const type = payload.type;
    return type == 'solid' ?
     new LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 5,
        linecap: "round",
        linejoin: "round"
    }) :
     new LineDashedMaterial({
        color: 0x00ffff,
        dashSize: 2,
        gapSize:1
    })
}


export const pointMaterial=new PointsMaterial({
    color: 0x888888,
    size:0.1,
    transparent:true,
    opacity:0.5,
    

})