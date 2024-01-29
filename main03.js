import "./css/index.css";
import { Scene, AxesHelper, Clock, } from "three";
import { sphereMesh, planeMesh, multiMeshes, boxMesh, cubeBox, lineMesh, circleMesh, ringMesh, shapeMesh, convexMesh, latheMesh, extrudeMesh,createParticles } from "./geometry/index.js";
import { spotLight, pointLight, ambientLight } from "./lights/index.js"
import { OrbitControls, Gui } from "./controls/index.js";
import { camera } from "./camera/index.js";
import { renderer } from "./render/index.js";
import { statsInit, stats } from './utils/common.js'
const scene = new Scene();

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

window.onload = function () {
    sceneGeometryInit();
    sceneLightInit()
    help();
    testInit()
    statsInit()
};

// 场景几何
function sceneGeometryInit() {
    // scene.add(sphereMesh)
    scene.add(planeMesh);
    scene.add(lineMesh)
    // scene.add(convexMesh)
    // scene.add(latheMesh)
    // scene.add(extrudeMesh)
    createParticles(scene)
    // scene.add(ringMesh)
    // scene.add(shapeMesh)
}
// 场景灯光
function sceneLightInit() {
    // scene.add(spotLight)
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
    scene.add(axes);
}


const eventTest = {
    addEvent: () => {
        console.log("aa")
    }
}



function testInit() {
    const gui = new Gui()
    gui.add(eventTest, "addEvent").name("增加几何体")

}

const control=new OrbitControls(camera,renderer.domElement)
control.update()
control.autoRotate=true

const clock = new Clock();
let time = 0;
function run() {
    const elapsed = clock.getElapsedTime();


    stats && stats.update()
    renderer.render(scene, camera);
    control.update()
    requestAnimationFrame(run);
    time = elapsed;
}
run();


