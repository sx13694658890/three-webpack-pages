
import {MeshLambertMaterial,AnimationMixer} from 'three'

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
//    mixer.clipAction(gltf.animations[ 0 ]).setDuration(1)
   return mixer
}
