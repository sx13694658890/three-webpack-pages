import { MeshBasicMaterial, MeshLambertMaterial } from "three";



export const  basicMaterial=(payload={})=>new MeshBasicMaterial({
    color:0xffffff,
    
    ...payload
})

export const lamberMaterial=(payload={})=>new MeshLambertMaterial({
    color:0xffffff,
    ...payload
})