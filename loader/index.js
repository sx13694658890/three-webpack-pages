import { ObjectLoader, Mesh, SphereGeometry, MeshPhongMaterial, Group } from 'three'
import { FontLoader, } from "three/examples/jsm/loaders/FontLoader"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

// 分子的结构 数据
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader'


import {CSS2DRenderer,CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
export {CSS2DRenderer,CSS2DObject}



// text 文字加载
export const fontLoader = new FontLoader()



export const objectLoader = new ObjectLoader()


/**
 * 
 * @param {*} loaderPath 模型地址
 * @return Promise
 */
// 加载gltf 模型
export function createLoaderGl(loaderPath) {
    const draco = new DRACOLoader()
    draco.setDecoderPath("three/examples/jsm/libs/draco")
    draco.setDecoderConfig({ type: 'js' })
    draco.preload()
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(draco)

    return new Promise((res, rej) => {
        gltfLoader.load(loaderPath, (gltf) => {
            res(gltf)
        })
    })
}


//加载OBJ模型

export function createOBJLoader(objPath) {
    const objLoader = new OBJLoader()
    objLoader.load(objPath, (loadedMesh) => {
        loadedMesh.children.forEach((child) => {
            child.geometry.computeFaceNormals()
            child.geometry.computeVertexNormals()
        })
    })
}

export const pdbLoader=new PDBLoader()