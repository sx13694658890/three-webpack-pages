
import {MeshLambertMaterial,AnimationMixer,BoxGeometry} from 'three'

import { createLoaderGl } from "../../loader";



export  async function createMesh(scene){
    // const mat=new MeshLambertMaterial({
    //     vertexColors:FaceCOlor
    // })
    let mixer;
   const gltf =await createLoaderGl("/assets/models/gltf/Horse.glb")
   const mesh=gltf.scene.children[0]
   mesh.position.set(0,0,0)
   mesh.scale.set( 1.5, 1.5, 1.5 );
   scene.add(gltf.scene)

   mixer=new AnimationMixer(mesh)
   mixer.clipAction(gltf.animations[ 0 ]).setDuration(1)
   return mixer
}



export function createAnimate(){
    var cube1=new BoxGeometry(1,1,1)
    var material=new MeshLambertMaterial({
        morphTargets:true,
        color:0xff0000
    })
    var cube2=new BoxGeometry(2,2,2)
    var cube3=new BoxGeometry(5,5,5)
    cube1.morphTargets[0]={name:"m1",vertices:cube2.vertices}
}