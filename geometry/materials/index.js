import { DoubleSide, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshNormalMaterial, MeshPhongMaterial } from "three";

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
