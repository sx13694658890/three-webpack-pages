// 轨道 控 制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// 轨 迹 球控制器
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls.js"
// 飞行控制器
import {FlyControls} from "three/examples/jsm/controls/FlyControls.js"

//  第一视角控制器
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'



// 检测动画运行时的帧数
// 设置为 0：检测的是画面每秒传输帧数（fps）
// 设置为 1：检测的是画面渲染的时间
import Stats from "./js/stats.js"


// 改变代码变量的界面组件 测试

import Gui from './js/gui.js'

export function createOrbitControls(camera,dom){
    const orbit=new OrbitControls(camera,dom)
    orbit.autoRotate=true
    orbit.enableDamping=true 
    return orbit
}


export function createTrackballControls(camera,dom){
    const trackball=new TrackballControls(camera,dom)
    trackball.enabled=true
    trackball.rotateSpeed=3
    trackball.panSpeed=3
    trackball.zoomSpeed=3
    trackball.keys = [ 'KeyA', 'KeyS', 'KeyD' ];
    return trackball
}
export function createFlyControls(camera,dom){
    const fly=new FlyControls(camera,dom)
    fly.movementSpeed=3
    fly.rollSpeed=Math.PI/2
    fly.autoForward=true
    fly.dragToLook=false
    
    return fly
}
export function createFirstPersonControls(camera,dom){
    const firstPerson=new FirstPersonControls(camera,dom)
    firstPerson.lookSpeed=0.5
    firstPerson.movementSpeed=2
    firstPerson.lookVertical=true
    firstPerson.constrainVertical=true
    firstPerson.verticalMin=1.0
    firstPerson.verticalMax=2.0
    return firstPerson
}


export {
    Stats, 
    Gui
}