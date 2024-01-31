
import { MeshLambertMaterial, AnimationMixer, BoxGeometry } from 'three'

import { createLoaderGl } from "../../loader";



export async function createMesh(scene) {
    // const mat=new MeshLambertMaterial({
    //     vertexColors:FaceCOlor
    // })
    let mixer;
    const gltf = await createLoaderGl("/assets/models/gltf/Horse.glb")
    const mesh = gltf.scene.children[0]
    mesh.position.set(0, 0, 0)
    mesh.scale.set(0.01, 0.01, 0.01);
    scene.add(gltf.scene)

    mixer = new AnimationMixer(mesh)
    mixer.clipAction(gltf.animations[0]).setDuration(3)
    return mixer
}



export function createAnimate() {


}