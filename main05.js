import "./css/index.css";
import { Scene, AxesHelper, Clock, Vector3, ArrowHelper, Vector2 } from "three";
import { boxMesh, shapeMesh, sphereMesh, planeMesh } from "./geometry/index.js";
import { spotLight, pointLight, ambientLight } from "./lights/index.js"
import { createOrbitControls, createTrackballControls, createFlyControls, Gui } from "./controls/index.js";
import { camera,cubeCamera } from "./camera/index.js";
import { renderer } from "./render/index.js";
import { statsInit, stats, createRayCaster } from '@utils/common.js'
import { createTween } from '@utils/tween.js'

import { createMesh,} from "./geometry/modelGlft/index.js";
import { createPlaneMesh, createSphereMesh } from "./geometry/meshTexture/index.js";

const scene = new Scene();

scene.add(cubeCamera)

// 灯光测试数据
const lightTest = {
    ambient: 0xc3c3c3,// 环境光
    pointIntensity: 1,
    pointDistance: 0,
    spotAngle: Math.PI / 3,
    spotDistance: 1,
    spotIntensity: 1,
    onlyShadow: false,
    shadowBias: 0,
    isPointLightLensflare: false
}

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
    scene.add(planeMesh);
    scene.add(sphereMesh)
    // scene.add(lineMesh)
    scene.add(createPlaneMesh())
    // scene.add(createSphereMesh())
    
}
// 场景灯光
function sceneLightInit() {
    scene.add(spotLight)
    // scene.add(ambientLight)
    scene.add(pointLight)
}



// 查找几何体
function searchMesh() {
    let mesh = scene.getObjectByName("boxMesh-0")
    console.log(222233333, mesh)
}

// 辅助help
function help() {
    const axes = new AxesHelper(150, 150);
    const arrow = new ArrowHelper(new Vector3(0, 1, 0), undefined, 2)
    scene.add(axes);
    scene.add(arrow);
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
        createRayCaster(vector, camera, scene)
    }
}


const control = new createOrbitControls(camera, renderer.domElement)

const trackball = createTrackballControls(camera, renderer.domElement)
const fly = createFlyControls(camera, renderer.domElement)


const clock = new Clock();
let time = 0;

function run() {
    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta()
    // tween.update()
   
    stats && stats.update()
    cubeCamera.update(renderer,scene)
    renderer.render(scene, camera);
    camera.updateProjectionMatrix()
    //control.update()
    // trackball.update()
    fly.update(delta)
    requestAnimationFrame(run);
    time = elapsed;
}



