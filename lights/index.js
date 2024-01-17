import { AmbientLight, SpotLight } from "three";


export const  sportLight=new SpotLight(0xffffff);
sportLight.position.set(0,3,0)
sportLight.castShadow=true


export const ambientLight=new AmbientLight(0x0c0c0c)
ambientLight.position.set(0,0,5)