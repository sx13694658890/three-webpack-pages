import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'

// 在当前图片上添加掩码，后续的 通道只会影 响掩码区域
import {MaskPass,ClearMaskPass} from 'three/examples/jsm/postprocessing/MaskPass'

// 通常位于过程链的开始，以便将渲染好的场景作为输入来提供给下一个后期处理步骤
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
//通过扫描线和失真来模拟电视屏幕效 
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass'
// 故障效果随机地在屏幕上显示电脉冲
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'
// 执行sRGB色彩空间转换和可选色调映射的链中的最后一个通道
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass'
//通过增强场景中明亮的区域来模拟真实世界中的摄像机
import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass'

// 将组合器的当前狀态保存为纹理,然后将其作为参数传到其他的EffectComposer组合器中
import {TexturePass} from 'three/examples/jsm/postprocessing/TexturePass'

// 将黑点图层应用到屏蓉的原始图片上
import {DotScreenPass} from 'three/examples/jsm/postprocessing/DotScreenPass'

// 可以在后期处理阶段添加抗锯齿效果。如果在演染阶段添加抗锯齿效果影响效率，那么可以使用该着色器来添加



// 自定义的shader
import {CopyShader} from 'three/examples/jsm/shaders/CopyShader'
import {LuminosityShader} from 'three/examples/jsm/shaders/LuminosityShader'
import {ColorifyShader} from 'three/examples/jsm/shaders/ColorifyShader'
import {SepiaShader} from 'three/examples/jsm/shaders/SepiaShader'
// 屏幕创建镜面效果
import {MirrorShader} from 'three/examples/jsm/shaders/MirrorShader'
// 改变顏色的色调和饱和度
import {HueSaturationShader} from 'three/examples/jsm/shaders/HueSaturationShader'

// 可以添加晕映效果。该效果可以在图片的中央周围显示黑色的边框
import {VignetteShader} from 'three/examples/jsm/shaders/VignetteShader'
// 着色器可以调整顏色的分布
import {ColorCorrectionShader} from 'three/examples/jsm/shaders/ColorCorrectionShader'
// 可以将构成颜色的红、绿、蓝 分开
import {RGBShiftShader} from 'three/examples/jsm/shaders/RGBShiftShader'
// 可以在场景上添加类似万花筒的效果 ，该效果会围绕场景的中央星径向反射
import {KaleidoShader} from 'three/examples/jsm/shaders/KaleidoShader'
// 可以模拟类似老电影里面的两条彩色效果
import {TechnicolorShader} from 'three/examples/jsm/shaders/TechnicolorShader'
// 散景效果使部分场景，从而突显主要的对象
import {BokehShader} from 'three/examples/jsm/shaders/BokehShader'
import {BokehShader2} from 'three/examples/jsm/shaders/BokehShader2'
import {DOFMipMapShader} from 'three/examples/jsm/shaders/DOFMipMapShader'
// import {DOFMipMapShader} from 'three/examples/jsm/'

import { Vector2 } from 'three'
import { Gui } from '../controls'




// 渲染通道
export function createRenderPass(scene,camera){
    const renderPass=new RenderPass(scene,camera)
    return renderPass
}
// 掩码通道
export function createMaskPass(scene,camera){
    const maskPass=new MaskPass(scene,camera)
    return maskPass
}
// 自定义后期处理着色器，并将其包含到后期处理过程链中
function createShaderPass(shader){
    return new ShaderPass(shader)
}

function createGlitch(){
    const glitch=new GlitchPass(1000)
    glitch.renderToScreen=false
    return glitch
}

function createFilm(){
   const film= new FilmPass(10,false)
   return film
}
function createDotScreenPass(){
    /**
     * center?: 可以徽调点的信移量, 
     * angle?: 点是按照某种方式对齐的通过angle属性可以改变对齐的方式, 
     * scale?:  设置所用点的大小。其值越小，则点越大
     */
    const dot= new DotScreenPass(new Vector2(0,0),45,4)
    return dot
 }
function createBloom(){
    /**
     * strength?: 泛光效果的强度其值越大, 则明亮的区域越明亮，而且渗到较暗区域的也就越多, 
     * kernelSize?: 控制的 是泛 光效果的𠌥移量,
     *  sigma?: 控制泛光效果的镜利程度。其值越大 ，泛光效果看起来越模糊
     */
    const bloom= new BloomPass(40,0,10)
    bloom.renderToScreen=true
    return bloom
 }


 /// 合成器100
 export function createPostProcessing100(renderer,{scene,camera}){
    const composer=new EffectComposer(renderer)
    composer.addPass(createRenderPass(scene,camera))
    // composer.addPass(createShaderPass(DOFMipMapShader))

    // function testShader(){
    //     const gui=new Gui()

    //     switch(){
    //         case
    //     }
    // }
    return composer
 }

 export function createPostProcessing(renderer,{bgPass,earthPass,marisPass,marisMask,earthMask}){
    const clearPass=new ClearMaskPass()
    const composer=new EffectComposer(renderer)
    composer.renderTarget1.stencilBuffer=true
    composer.renderTarget2.stencilBuffer=true
    composer.addPass(bgPass)
    composer.addPass(earthPass)
    composer.addPass(marisPass)

    composer.addPass(marisMask)
    const effectColorify=createShaderPass(ColorifyShader)
    effectColorify.uniforms['color'].value.setRGB(123, 15, 1);
    composer.addPass(effectColorify)
    composer.addPass(clearPass)

    const effectSepia=createShaderPass(SepiaShader)
   
    composer.addPass(earthMask)
    composer.addPass(effectSepia)
    composer.addPass(clearPass)

    const effectCopy=createShaderPass(CopyShader)
   
   composer.addPass(effectCopy)
       
    return composer

}

// 合成器1
export function createPostProcessing1(renderer,scene,camera){
    const composer=new EffectComposer(renderer)
    composer.addPass(createRenderPass(scene,camera))
    composer.addPass(createGlitch())
       
        return composer

}
// 合成器2
export function createPostProcessing2(renderer,scene,camera){
    const composer=new EffectComposer(renderer)
    composer.addPass(createRenderPass(scene,camera))
    composer.addPass(createDotScreen())
    return composer

}





