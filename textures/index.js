import { CubeTextureLoader, TextureLoader } from "three";
import {DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'

import {TGALoader } from 'three/examples/jsm/loaders/TGALoader'

//标准格式的PNG、GIF或JPEG图片
const textureLoader=new TextureLoader()
export function createTexture(url='/assets/images/111.webp'){
    const texture=textureLoader.load(url)
    return texture
}

//转换的结果 为6 张图片:right.png, left.png, top.png, bottom.png，front.png 和back.png。
export function createCubeTexture(url,imgNameArr){
    return new CubeTextureLoader().setPath(url)
    .load(imgNameArr)
}



// 可 以 加 载 DDS 格式的纹理
const ddsLoader=new DDSLoader()
// export const ddsTexture=ddsLoader.load('')


// Targa是概格图形文件格式，该格 式仍然被大量的3D软件程序使用
const tgaLoader=new TGALoader()
// export const tgaTexture=tgaLoader.load('')
