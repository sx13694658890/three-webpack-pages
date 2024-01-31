import * as TWEEN from '@lib/tween.js'

const easingObj={
   'linear_none':TWEEN.Easing.Linear.None,
   'quadratic_in':TWEEN.Easing.Quadratic.In,
   'quadratic_inout':TWEEN.Easing.Quadratic.InOut,
   'elastic_out':TWEEN.Easing.Elastic.Out,
   'bounce_inout':TWEEN.Easing.Bounce.InOut,
   'sinusoidal_inout':TWEEN.Easing.Sinusoidal.InOut,
}

function switchEasing({type}){
   return easingObj[type]?? TWEEN.Easing.Linear.None;
}

/**
 * 
 * @param {*} obj 
 * @param {value:number,time:Date,type:easingObj} param1 
 * @param {*} fn 
 * @returns 
 */
// 补间动画
export function createTween(obj,{value,time,type},fn){
    var tween=new TWEEN.Tween(obj)
   .to({x:value,},time)
   .easing(switchEasing(type))
   .onUpdate(fn)
   .start()
   return tween
}