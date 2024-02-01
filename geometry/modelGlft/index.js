
import { MeshLambertMaterial, AnimationMixer,AnimationUtils, BoxGeometry, SkeletonHelper } from 'three'

import { createLoaderGl } from "../../loader";

import { Gui } from '../../controls';


//  马
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
    mixer.clipAction(gltf.animations[0]).setDuration(1).play()
    return mixer
}

//  木偶人
export async function createMeshBot(scene) {
    // const mat=new MeshLambertMaterial({
    //     vertexColors:FaceCOlor
    // })
    let mixer;
    const crossFadeControls = [];
    let currentBaseAction = 'walk';
    const allActions = [];
    const baseActions = {
        idle: { weight: 0 },
        walk: { weight: 0 },
        run: { weight: 0 }
    };
    const additiveActions = {
        sneak_pose: { weight: 0 },
        sad_pose: { weight: 0 },
        agree: { weight: 0 },
        headShake: { weight: 0 }
    };
    const panelSettings = {
        'modify time scale': 1.0
    };
    const gltf = await createLoaderGl("/assets/models/gltf/Xbot.glb")
    const mesh = gltf.scene
   
    scene.add(mesh)
    mesh.traverse(child=>{
        if(child.isMesh)child.castShadow=true
    })
    const skeleton=new SkeletonHelper(mesh)
    skeleton.visible=true
    scene.add(skeleton)

    const animations=gltf.animations
    mixer = new AnimationMixer(mesh)
    for( let i = 0; i !== animations.length; ++ i){
        let clip=animations[i]
        const name=clip.name
        if ( baseActions[ name ] ){
            const action=mixer.clipAction(clip)
            activateAction(action)
            baseActions[ name ].action=action
            allActions.push(action)
        }else{
            AnimationUtils.makeClipAdditive(clip)
            if(clip.name.endsWith("_pose")){
                clip=AnimationUtils.subclip(clip,clip.name,2,3,30)
            }
            const action = mixer.clipAction( clip );
			activateAction( action );
			additiveActions[ name ].action = action;
			allActions.push( action );
        }
    }
    createPanel()

    function activateAction(action){
        const clip=action.getClip()
        const settings=baseActions[clip.name]||additiveActions[clip.name]
        setWeight(action,settings.weight)
        action.play()
    }
    function setWeight(action,weight){
        action.enabled=true
        action.setEffectiveTimeScale( 1 );
		action.setEffectiveWeight( weight );
    }
    function createPanel(){
        const panel = new Gui()
        const folder1 = panel.addFolder( 'Base Actions' );
        const folder2 = panel.addFolder( 'Additive Action Weights' );
        const folder3 = panel.addFolder( 'General Speed' );
       
        const baseNames = [ 'None', ...Object.keys( baseActions ) ];
        for ( let i = 0, l = baseNames.length; i !== l; ++ i ){
            const name = baseNames[ i ];
			const settings = baseActions[ name ];
            panelSettings[ name ]=function(){
                console.log(68999,name)
                const currentSettings = baseActions[ currentBaseAction ];
                const currentAction = currentSettings ? currentSettings.action : null;
                const action = settings ? settings.action : null;
                console.log()
                if ( currentAction !== action ) {
                    prepareCrossFade( currentAction, action, 0.35 );
                }
            }
            crossFadeControls.push( folder1.add( panelSettings, name ) );
        }
        for ( const name of Object.keys( additiveActions ) ){
            const settings = additiveActions[ name ];
            panelSettings[ name ] = settings.weight;
            folder2.add( panelSettings, name, 0.0, 1.0, 0.01 )
            .listen()
            .onChange( function ( weight ) {
                setWeight( settings.action, weight );
                settings.weight = weight;

            } );
        }
        folder3.add( panelSettings, 'modify time scale', 0.0, 1.5, 0.01 )
        .onChange( (speed)=>{
            mixer.timeScale = speed;
        } )

    }
    function prepareCrossFade( startAction, endAction, duration ){
        if ( currentBaseAction === 'idle' || ! startAction || ! endAction ){
            executeCrossFade( startAction, endAction, duration );
        } else {
            synchronizeCrossFade( startAction, endAction, duration );
        }
        if ( endAction ) {
            startAction&&startAction.play()
            const clip = endAction.getClip();
            currentBaseAction = clip.name;
        } else {
            currentBaseAction = 'None';
            startAction.stop()
        }
    }
    function executeCrossFade( startAction, endAction, duration ){
        console.log(88888,currentBaseAction,endAction)
        if ( endAction ){
            setWeight( endAction, 1 );
			endAction.time = 0;
            if ( startAction ){
                startAction.crossFadeTo( endAction, duration, true );
            }else{
                endAction.fadeIn( duration )
            }
        }
    }
    function synchronizeCrossFade( startAction, endAction, duration ) {
        mixer.addEventListener( 'loop', onLoopFinished )
        function onLoopFinished( event ) {
            if ( event.action === startAction ) {
                mixer.removeEventListener( 'loop', onLoopFinished );
                executeCrossFade( startAction, endAction, duration );

            }

        }
    }
    return {mixer,allActions,baseActions,additiveActions}
}

export function createAnimate() {


}