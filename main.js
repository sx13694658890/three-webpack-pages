import "./css/index.css";
import { Scene, WebGLRenderer, AxesHelper, Clock, Color } from "three";
import { boxMesh, planeMesh, sphereMesh } from "./geometry/index.js";
import {sportLight, ambientLight} from "./lights/index.js"
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
  // windowInit()
  searchMesh()
};

// 场景几何
function sceneGeometryInit() {
  boxMesh().forEach(box=>{
    scene.add(box);
   
  })
  
  scene.add(planeMesh);
  scene.add(sphereMesh);
}
// 场景灯光
function sceneLightInit(){
  scene.add(sportLight)
  scene.add(ambientLight)
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


// 查找几何体
function searchMesh(){
  let mesh=scene.getObjectByName("boxMesh-0")
  console.log(222233333,mesh)
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

// 屏幕监听
function windowInit(){
 
  const clientWidth=window.innerWidth
  const clientHeight=window.innerHeight
  if(canvas.width!==clientWidth||canvas.height!==clientHeight){
    canvas.width=clientWidth
    canvas.height=clientHeight
    camera.aspect=canvas.width/canvas.height
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.width,canvas.height)
  }
}

const controlsTest={
  posX:1,
  posY:1,
  rotateX:0.001,
  rotateY:0.001,
  ambientColor:'0xcccccc'
}
function testInit(){
  const gui=new Gui()
  
  gui.add(controlsTest,"posX",-10,10,0.001).name("box-positionX")
  gui.add(controlsTest,"posY",-10,10,0.001).name("box-positionY")
  gui.add(controlsTest,"rotateX",0.001,0.1,0.000001).name("box-rotateX")
  gui.add(controlsTest,"rotateY",0.001,0.1,0.000001).name("box-rotateY")
  const folder = gui.addFolder( 'Color' );
  folder.addColor(controlsTest,'ambientColor')
}

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new Clock();

let time = 0;
function run() {
  const elapsed = clock.getElapsedTime();
  boxMesh().forEach(box=>{
    box.position.x=1+(2*Math.cos(elapsed))
    box.position.y=1+(2*Math.abs(Math.sin(elapsed)*0.5))
    box.rotation.x+=controlsTest.rotateX
    box.rotation.y+=controlsTest.rotateY
  })
  
  stats.update()
  controls.update();
  renderer.render(scene, camera);
  // windowInit()
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
