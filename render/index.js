
import { WebGLRenderer, Color, PCFShadowMap, PCFSoftShadowMap, WebGLDeferredRenderer } from "three";
// const canvas = document.getElementById("canvas");
import {
    widthHalf,
    heightHalf
} from '@utils/const.js'

function initGlRender() {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha:true
    });

    renderer.setSize(widthHalf*2, heightHalf*2);
    renderer.setClearColor(new Color(0xeeeeee),0);
    
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.autoClear=false
    renderer.clear()
    document.body.appendChild(renderer.domElement)
    return renderer

}

/**
 * WebGLDeferredRenderer存在问题 已经被作者删除
 * https://github.com/mrdoob/three.js/issues/7095
 */

function initGlDeferredRender() {
    const deferredRenderer = new WebGLDeferredRenderer()
    return
}

const renderer = initGlRender()

// 屏幕监听
// function windowInit(){

//     const clientWidth=window.innerWidth
//     const clientHeight=window.innerHeight
//     if(canvas.width!==clientWidth||canvas.height!==clientHeight){
//       canvas.width=clientWidth
//       canvas.height=clientHeight
//       camera.aspect=canvas.width/canvas.height
//       camera.updateProjectionMatrix()
//       renderer.setSize(canvas.width,canvas.height)
//     }
//   }




export {
    renderer
}