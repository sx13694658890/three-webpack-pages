import "./css/index.css";
import { Scene, AxesHelper, Clock, Vector3, ArrowHelper, Vector2 } from "three";
import { boxMesh, shapeMesh, sphereMesh, planeMesh } from "./geometry/index.js";
import { spotLight, pointLight, ambientLight, createSpotLight } from "./lights/index.js"
import { createOrbitControls, createTrackballControls, createFlyControls, Gui } from "./controls/index.js";
import { createPerspectiveCamera,createOrthoGraphicCamera } from "./camera/index.js";
import { renderer } from "./render/index.js";
import { statsInit, stats, createRayCaster } from '@utils/common.js'
import { createTween } from '@utils/tween.js'

import { createMesh,} from "./geometry/modelGlft/index.js";
import { createBgMesh, createBoxMesh, createEarthMesh, createMarisMesh, createPlaneMesh, createSphereMesh } from "./geometry/meshTexture/index.js";
import { createMaskPass, createPostProcessing, createRenderPass } from "./composer/index.js";

const sceneBg = new Scene();
const sceneEarth = new Scene();
const sceneMaris = new Scene();
const earthCamera=createPerspectiveCamera()
const marisCamera=createPerspectiveCamera()
const bgCamera=createOrthoGraphicCamera()
sceneEarth.add(earthCamera)
sceneMaris.add(marisCamera)
sceneBg.add(bgCamera)

const bgPass=createRenderPass(sceneBg,bgCamera)
const earthPass=createRenderPass(sceneEarth,earthCamera)
earthPass.clear=false
const marisPass=createRenderPass(sceneMaris,marisCamera)
marisPass.clear=false

const marisMask=createMaskPass(sceneMaris,marisCamera)

const earthMask=createMaskPass(sceneEarth,earthCamera)
//后期处理 post-processing
const composer=createPostProcessing
(renderer,{bgPass,earthPass,marisPass,marisMask,earthMask})


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
 
    sceneEarth.add(createEarthMesh())
    sceneMaris.add(createMarisMesh())
    sceneBg.add(createBgMesh())
    
}
// 场景灯光
function sceneLightInit() {
    sceneEarth.add(createSpotLight())
    sceneMaris.add(createSpotLight())
   
}



// 查找几何体
function searchMesh() {
   
}

// 辅助help
function help() {
    const axes = new AxesHelper(150, 150);
    const arrow = new ArrowHelper(new Vector3(0, 1, 0), undefined, 2)
    sceneEarth.add(axes)
    sceneEarth.add(arrow)
    sceneBg.add(arrow)
    sceneBg.add(axes)
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
const fly = createFlyControls(bgCamera, renderer.domElement)


const clock = new Clock();
let time = 0;
const widthHalf=window.innerWidth/2, 
          heightHalf=window.innerHeight/2;

function run() {
    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta()
    stats && stats.update()
    composer.render()

    // camera.updateProjectionMatrix()
    fly.update(delta)
    requestAnimationFrame(run);
    time = elapsed;
}



