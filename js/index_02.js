///////////////ITALO

import * as THREE from '/js/lib/three.module.js';

import { PointerLockControls } from '/js/ThreeJS_Pointerlockcontrols_Mobile.js';

var scene, renderer;
var stereoEffect;
var camera;
var vrControls
var controls;
var clock = new THREE.Clock();
//var dir = new THREE.Vector3();
var $container;
var loadingManager;

var speed = 8;
var chaseCamera, topCamera;
var player = new THREE.Object3D();
var timer;
var tex = new THREE.ImageUtils.loadTexture( 'img/loading.png' );
var tex2 = new THREE.ImageUtils.loadTexture( 'img/wait.png' );
var iterations = 0;
var iterationsLeft = 0;
var iterationsRight = 0;
var element;

var width, height;
var viewAngle = 45,
	near = 1,
	far = 10000;
var aspect;
var sceneObject, intersected;

let prevTime = performance.now();


const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
let raycaster;


let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

const objects = [];



/*var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280/70, 0.1, 100),
    box: new THREE.Mesh(
        new THREE.BoxGeometry(120, 1, 1),
        new THREE.MeshBasicMaterial({ map: tex})
    )
   /* box2: new THREE.Mesh(
        new THREE.BoxGeometry(180, 1),
        new THREE.MeshBasicMaterial({ map: tex2})
    )
};*/


var RESOURCES_LOADED = false;
var LOADING_MANAGER = null;


var loadingScreen = document.getElementById( 'loading-screen' );

setUp();

function setUp() {
    setupWorld();
    animate(); 


}

function setupWorld() {
    clock = new THREE.Clock();
    $container = $('#main-container');
    scene = new THREE.Scene();
    //scene.background = new THREE.Color('#ffffff');

   /* loadingScreen.box.position.set(0,0,-5);
    loadingScreen.box2.position.set(0,-2,-8);
    loadingScreen.scene.add(loadingScreen.box2);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);*/
    

    loadingManager = new THREE.LoadingManager;




    scene.background = new THREE.CubeTextureLoader(loadingManager)
    .setPath( 'italo/' )
    .load( [
        'skybox1.jpg',
        'skybox2.jpg',
        'skyboxtecho.jpg',
        'skyboxpiso.jpg',
        'skybox3.jpg',
        'skybox4.jpg'
    ] );



    /*var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.CubeGeometry(500, 500, 500, 1);
    var sceneObject = new THREE.Mesh(floorGeometry, floorMaterial);
    sceneObject.position.y = 170;
    sceneObject.position.z = 155;
    sceneObject.rotation.x = Math.PI / -2;
    sceneObject.receiveShadow = true;
    scene.add(sceneObject);*/



    var wallTexture = new THREE.ImageUtils.loadTexture( 'italo/lake.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture,
        color: 0xFFFFFF,
        opacity: 0.7,
        bumpmap: wallTexture,
        shininess: 150,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(500, 750, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -75;
    floor.position.z = 780;
    floor.rotation.x = Math.PI / -2;
    floor.receiveShadow = true;
    scene.add(floor);
    

    /*var murakit = new THREE.MTLLoader(loadingManager);
    murakit.load("italo/models/computer.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(loadingManager);
      murakit.setMaterials(materials);
    
      murakit.load("italo/models/computer.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });*/


    var light = new THREE.AmbientLight( 0xFFFFFF, 0.2 ); // soft white light
    scene.add( light );
    var pointlight = new THREE.HemisphereLight( 0xFFFFFF ); // soft white light
   // pointlight.position.y=20;
    pointlight.position.x=20;
    scene.add( pointlight ); 

    camera = new THREE.PerspectiveCamera(80, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(50, 50, 50);
    camera.position.set(60, 60, 60);
    camera.rotation.y = Math.PI / 1.6;

    //camera.position.set(0, 300, 0);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    element = renderer.domElement;
    $container.append(element);

    var width  = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);


    // Controls
    /*var options = {
        speedFactor: 0.5,
        delta: 1,
        rotationFactor: 0.002,
        maxPitch: 90,
        hitTest: true,
        hitTestDistance: 40
    };
    
    controls = new TouchControls($container.parent(), camera, options);
    controls.setPosition(0, 35, 400);
    controls.addToScene(scene);*/

    //camera.clone();
  //  camera.copy()



    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
   // dir.applyQuaternion( camera.quaternion );
   // camera.position.add( dir );


/*
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.coupleCenters = true;
    //controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    //controls.staticMoving = true;
    // controls.dynamicDampingFactor = 1;
    //controls.maxPolarAngle = Math.PI / 2.5;
   // controls.target.set(camera.position.x + 1, camera.position.y, camera.position.z);
    //camera.position.set(0,120,20);
    //camera.position.set(0,80,20);
    //controls.update();*/
   // camera.getWorldDirection(controls.target);
    // controls.target.addScaledVector(dir, speed);
     //controls.update();  
    
    
    /*vrControls = new THREE.OrbitControls(camera, element);
    vrControls.target.set(
      camera.position.x + 0.1,
      camera.position.y,
      camera.position.z
    );*/

    /*controls = new THREE.TrackballControls( camera );
    controls.target.set( 0, 0, 0 );*/

    controls = new PointerLockControls( camera, document.body );

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        controls.lock();

    }, false );

    controls.addEventListener( 'lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );

    scene.add( controls.getObject());

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );



    //document.getElementById("mvForward").addEventListener( 'mousedown', moveForward );
    document.getElementById("mvForward").addEventListener("mouseup", function(){
        if (timer) clearInterval(timer)
    });

    document.getElementById("mvForward").addEventListener('touchstart', process_touchstart, false);
    document.getElementById("mvForward").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("mvForward").addEventListener("touchmove", handleMove, false);
    document.getElementById("mvForward").addEventListener('touchend', process_touchend, false);

    /*document.getElementById("rtLeft").addEventListener( 'touchstart', rotateLeft, false );
    document.getElementById("rtLeft").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("rtLeft").addEventListener("touchmove", handleMove, false);
    document.getElementById("rtLeft").addEventListener('touchend', process_touchend, false);


    document.getElementById("rtRight").addEventListener( 'touchstart', rotateRight, false );
    document.getElementById("rtRight").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("rtRight").addEventListener("touchmove", handleMove, false);
    document.getElementById("rtRight").addEventListener('touchend', process_touchend, false);

    document.getElementById("main-container").addEventListener( 'touchstart', touchStartCanvas, false );
    document.getElementById("main-container").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("main-container").addEventListener("touchmove", handleMove, false);
    document.getElementById("main-container").addEventListener('touchend', handleCancel, false);*/


    
    document.getElementById("footer").addEventListener( 'touchstart', touchStartCanvas, false );
    document.getElementById("footer").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("footer").addEventListener("touchmove", handleMove, false);
    document.getElementById("footer").addEventListener('touchend', handleCancel, false);





    function process_touchstart(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        iterations = 0;        



        timer=setInterval(function(){
            iterations++;
            var vector = new THREE.Vector3();

            const direction = new THREE.Vector3(camera.position.x,camera.position.x, camera.position.x);
            direction.applyQuaternion( camera.quaternion );
            //camera.getWorldDirection(direction);
            //vector.applyQuaternion( camera.quaternion );
            camera.getWorldDirection( vector );
            //vector.applyQuaternion( camera.quaternion );
            camera.position.addScaledVector( vector, speed );
            //controls.target.addScaledVector(direction, speed);

            //camera.position.add( vector );
            

            //console.log(timer);
            //vector.applyQuaternion( camera.quaternion );
            //camera.getWorldDirection( vector );
            
           //console.log(controls.target);


          // controls.target.set(camera.position.x + 1, camera.position.y, camera.position.z);
          // controls.update();

            if (iterations >= 70){
            clearInterval(timer);
            iterations = 0;
            }
        }, 70); 

        //controls.update();


    }

    function rotateLeft(evt) { 
        evt.preventDefault();
        evt.stopImmediatePropagation();
        iterationsLeft = 0;
        timer=setInterval(function(){
            iterationsLeft++;
            camera.rotation.y += Math.PI / 40;
            console.log(timer);

                        
            if (iterationsLeft >= 70){
                clearInterval(timer);
                iterationsLeft = 0;
                }

        }, 70); 
    }

    function rotateRight(evt) { 
        evt.preventDefault();
        evt.stopImmediatePropagation();
        iterationsRight = 0;
        timer=setInterval(function(){
            iterationsRight++;
            camera.rotation.y -= Math.PI / 40;
            console.log(timer);

            if (iterationsRight >= 70) {
                clearInterval(timer);
                iterationsRight = 0;
            }

        }, 70);
    }

    function touchStartCanvas(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
    }

    function process_touchend(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if (timer) clearInterval(timer)

    }

    function handleMove(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();

    }

    function handleCancel(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();

    }
}


     


    function animate() {
        requestAnimationFrame( animate );

        if (RESOURCES_LOADED == false){
            requestAnimationFrame( animate );
            loadingManager.onProgress = function (item, loaded, total) {
            /*loadingScreen.innerHTML = (loaded / total * 100) + "%loaded";*/
            loadingScreen.innerHTML = " Arte por: MazdeUno" + '<br>' + '<br>'+ "Usa los botones de las flechas para moverte en el espacio" + "&#x0003C;" + "&#x02227;" + "&#x0003E;" + '<br>' + '<br>' + ((loaded / total * 100) + "% loaded") + '<br>' + '<br>' + "Loading:" + '<br>' + item, loaded, total;
            console.log((loaded / total * 100) + "%loaded");
            /*loadingScreen.innerHTML = item, loaded, total;*/
        }

        loadingManager.onLoad = function () {
            loadingScreen.remove();
            console.log("ITEMS LOADED");
            RESOURCES_LOADED = true;
        }
           /* loadingScreen.box.rotation.x += 0.009;
            renderer.render(loadingScreen.scene, loadingScreen.camera);*/
            return;
        }

        const time = performance.now();

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;
        const intersections = raycaster.intersectObjects( objects );
        const onObject = intersections.length > 0;
        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );
        controls.getObject().position.y += ( velocity.y * delta );
        if ( controls.getObject().position.y < 10 ) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }

        prevTime = time;


        //update();
        //render();
        renderer.render( scene, camera );

    }


    /*function moveForward(evt) { 
        evt.preventDefault();
        evt.stopImmediatePropagation();
        timer=setInterval(function(){
            camera.getWorldDirection( dir );
            camera.position.addScaledVector( dir, speed );
        }, 100); // the above code is executed every 100 ms
        //camera.translateZ( -moveDistance );
    }*/


