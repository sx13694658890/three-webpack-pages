import "./css/index.css";
import { Scene, WebGLRenderer, AxesHelper, Clock, Color,  } from "three";
import { boxMesh, planeMesh, sphereMesh } from "./geometry/index.js";
import {spotLight, ambientLight,pointLight,directionLight,hemisphereLight,lensFlare} from "./lights/index.js"
import { OrbitControls,Stats ,Gui} from "./controls/index.js";
import { camera } from "./camera/index.js";
import { renderer } from "./render/index.js";

const scene = new Scene();
const  stats=new Stats()


// 灯光测试数据
const lightTest={
  ambient:0xc3c3c3,// 环境光
  pointIntensity:1,
  pointDistance:0,
  spotAngle:Math.PI/3,
  spotDistance:1,
  spotIntensity:1,
  onlyShadow:false,
  shadowBias:0,
  isPointLightLensflare:false
}

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
  scene.add(spotLight)
  //scene.add(ambientLight)
  scene.add(pointLight)
  // scene.add(directionLight)
  // scene.add(hemisphereLight)
  // scene.add(lensFlare)
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

// 辅助help
function help() {
  const axes = new AxesHelper(150, 150);
  scene.add(axes);
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
  

  // 灯光检验测试
  const lightControl=gui.addFolder('lightControl')
  lightControl.addColor(lightTest,'ambient').onChange((color)=>{ambientLight.color=new Color(color)})
  lightControl.add(lightTest,'pointIntensity',0,10,0.001).onChange((intensity)=>{pointLight.intensity=intensity})
  lightControl.add(lightTest,'pointDistance',0,10,0.001).onChange((distance)=>{pointLight.distance=distance})
  lightControl.add(lightTest,'spotAngle',0,Math.PI,0.001).onChange((angle)=>{spotLight.angle=angle})
  lightControl.add(lightTest,'spotDistance',0,10,0.001).onChange((distance)=>{spotLight.distance=distance})
  lightControl.add(lightTest,'spotIntensity',0,10,0.001).onChange((intensity)=>{spotLight.intensity=intensity})
  lightControl.add(lightTest,'onlyShadow',false).onChange((bool)=>{spotLight.onlyShadow=bool})
  lightControl.add(lightTest,'shadowBias',0,10,0.001).onChange((bias)=>{spotLight.shadowBias=bias})
  lightControl.add(lightTest,'isPointLightLensflare').onChange((bool)=>{console.log(bool);if(bool)pointLight.add(lensFlare)})
}

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new Clock();

let time = 0;
function run() {
  const elapsed = clock.getElapsedTime();
  boxMesh().forEach(box=>{
    box.position.x=1+(2*Math.cos(elapsed))
    box.position.y=1+(2*Math.abs(Math.sin(elapsed)*0.5))
    box.rotation.x+=controlsTest.rotateX*(Math.PI/180)
    box.rotation.y+=controlsTest.rotateY*(Math.PI/180)
  })
  sphereMesh.position.x=1+(2*Math.cos(elapsed))
  sphereMesh.position.z=1+(2*Math.sin(elapsed))
  sphereMesh.position.y=1+(2*Math.abs(Math.sin(elapsed)*0.5))
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
