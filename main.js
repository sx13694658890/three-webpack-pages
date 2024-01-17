import "./css/index.css";
import { Scene, WebGLRenderer, AxesHelper, Clock, Color } from "three";
import { boxMesh, planeMesh, sphereMesh } from "./geometry/index.js";
import {sportLight} from "./lights/index.js"
import { OrbitControls,Stats ,Gui} from "./controls/index.js";
import { camera } from "./camera/index.js";

const scene = new Scene();
const  stats=new Stats()
window.onload = function () {
  sceneGeometryInit();
  sceneLightInit()
  help();
  statsInit()
  testInit()
};

// 场景几何
function sceneGeometryInit() {
  scene.add(boxMesh);
  scene.add(planeMesh);
  scene.add(sphereMesh);
}
// 场景灯光
function sceneLightInit(){
  scene.add(sportLight)
}


// 检测动画运行时的帧数
function statsInit(){
  
        stats.setMode(0)
        stats.domElement.style.position='absolute'
        stats.domElement.style.left='0px'
        stats.domElement.style.top='0px'
        const statsDiv=document.createElement("div")
        statsDiv.appendChild(stats.domElement)
        document.body.appendChild(statsDiv)

}

const canvas = document.getElementById("canvas");
const renderer = new WebGLRenderer({
  antialias: true,
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new Color(0xeeeeee));
renderer.shadowMap.enabled = true;

function help() {
  const axes = new AxesHelper(150, 150);
  scene.add(axes);
}


function testInit(){
  const controlsTest={
    posX:1,
    posY:1
  }
  const gui=new Gui()
  gui.add(controlsTest,"posX",-10,10,0.001).name("positionX")
  gui.add(controlsTest,"posY",-10,10,0.001).name("positionY")
}

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new Clock();

let time = 0;
function run() {
  const elapsed = clock.getElapsedTime();
  boxMesh.position.x=1+(2*Math.cos(elapsed))
  boxMesh.position.y=1+(2*Math.abs(Math.sin(elapsed)*0.5))
  stats.update()
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(run);
  time = elapsed;
}
run();

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  import(/* webpackChunkName: "show" */ "./js/show.js").then((show) => {
    show.show("webpack");
  });
});
