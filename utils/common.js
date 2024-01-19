import {Stats} from '../controls/index.js'

function show(conent){
    
}


export  const stats=new Stats()
// 检测动画运行时的帧数
export function statsInit(){
    stats.setMode(0)
    stats.domElement.style.position='absolute'
    stats.domElement.style.left='0px'
    stats.domElement.style.top='0px'
    const statsDiv=document.createElement("div")
    statsDiv.appendChild(stats.domElement)
    document.body.appendChild(statsDiv)
    return stats
}


// 弧度转换

export function deg2rad(degress){
    return degress*Math.PI/180
}


export function rad2deg(radians){
    return radians*180/Math.PI
}