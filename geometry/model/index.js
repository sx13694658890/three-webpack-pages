import { PlaneGeometry } from 'three'
import {Reflector} from 'three/examples/jsm/objects/Reflector'
import { innerWidth, innerHeight, pixelRatio } from '../../utils/const';


// 创建一面镜子
export function createMirror(){
    const plane= new PlaneGeometry(10,10);
    var mirror=new Reflector(plane,{
        clipBias: 0.003,
        textureWidth: innerWidth*pixelRatio,
        textureHeight: innerHeight*pixelRatio,
        color: 0xffffff
    })
    return mirror
}