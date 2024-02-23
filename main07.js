import "./css/index.css";
import { Scene, AxesHelper, Clock, Vector3, ArrowHelper, Vector2 } from "three";
import { boxMesh, shapeMesh, sphereMesh, planeMesh } from "./geometry/index.js";
import {  pointLight, ambientLight, createSpotLight } from "./lights/index.js"
import { createOrbitControls, createTrackballControls, createFlyControls, Gui } from "./controls/index.js";
import { createPerspectiveCamera,createOrthoGraphicCamera } from "./camera/index.js";
import { renderer } from "./render/index.js";
import { statsInit, stats, createRayCaster } from '@utils/common.js'
import { createTween } from '@utils/tween.js'

import { createMesh,} from "./geometry/modelGlft/index.js";
import { createBgMesh, createBoxMesh, createEarthMesh, createMarisMesh, createPlaneMesh, createSphereMesh } from "./geometry/meshTexture/index.js";
import { createPostProcessing100 } from "./composer/index.js";

const scene = new Scene();
const camera=createPerspectiveCamera()
const composer=createPostProcessing100(renderer,{scene,camera})


// 动画运动初始值
let tweenObj = {
    x: 0,
    y: 0,
    z: 0,
}

window.onload = function () {
    sceneGeometryInit();
    sceneLightInit()
    run();
    help();
    statsInit()
    eventInit()
};
let mixer;
// 场景几何
async function sceneGeometryInit() {
 
    scene.add(planeMesh)
    
}
// 场景灯光
function sceneLightInit() {
   scene.add(createSpotLight())
   scene.add(pointLight)
}



// 查找几何体
function searchMesh() {
   
}

// 辅助help
function help() {
    const axes = new AxesHelper(150, 150);
    const arrow = new ArrowHelper(new Vector3(0, 1, 0), undefined, 2)
   scene.add(arrow)
}






// 补偿动画
var tween = createTween(tweenObj, {
    value: 20,
    time: 5000,
    type: "bounce_inout",
    yoyo: false,
    repeat: false,
}, () => {
    sphereMesh.position.set(tweenObj.x, 0, 0)
})
tween.stop()


// 鼠标光线追踪

function eventInit() {
    window.onmousedown = function (event) {
        var vector = new Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
        )
        // createRayCaster(vector, camera, scene)
    }
}


// const control = new createOrbitControls(camera, renderer.domElement)

// const trackball = createTrackballControls(camera, renderer.domElement)
const fly = createFlyControls(camera, renderer.domElement)


const clock = new Clock();
let time = 0;
const widthHalf=window.innerWidth/2, 
          heightHalf=window.innerHeight/2;

function run() {
    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta()
    stats && stats.update()
    composer.render()

    camera.updateProjectionMatrix()
    fly.update(delta)
    requestAnimationFrame(run);
    time = elapsed;
}



