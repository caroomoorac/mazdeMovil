


var scene, renderer;
var stereoEffect;
var camera;
var vrControls
var controls;
var clock = new THREE.Clock();
var dir = new THREE.Vector3();
var speed = 3;
var chaseCamera, topCamera;
var player = new THREE.Object3D();
var timer;
var tex = new THREE.ImageUtils.loadTexture( 'img/loading.png' );
var tex2 = new THREE.ImageUtils.loadTexture( 'img/wait.png' );

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

    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/rafa_img/10.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(500, 600, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 40;
    floor.position.z = 0;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/rafa_img/15.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(250, 200, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 50;
    floor.position.z = 100;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/rafa_img/11.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(600, 400, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 240;
    wall.position.z = 0;
    wall.position.x = 248;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/rafa_img/12.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(600, 400, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 240;
    wall.position.z = 0;
    wall.position.x = -248;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);



    ////lados

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/rafa_img/13.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(500, 400, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 240;
    wall.position.z = 300;
    wall.position.x = 0;
    wall.rotation.y = Math.PI / 1;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/rafa_img/14.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(500, 400, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 240;
    wall.position.z = -300;
    wall.position.x = 0;
    wall.rotation.y = Math.PI / 1;
    wall.receiveShadow = true;
    scene.add(wall);



    var murakit = new THREE.MTLLoader(loadingManager);
    murakit.load("models/model/6.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(loadingManager);
      murakit.setMaterials(materials);
    
      murakit.load("models/model/6.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var light = new THREE.AmbientLight( 0xFFFFFF, 0.2 ); // soft white light
    scene.add( light );
    var pointlight = new THREE.HemisphereLight( 0xFFFFFF ); // soft white light
   // pointlight.position.y=20;
    pointlight.position.x=20;
    scene.add( pointlight ); 

    camera = new THREE.PerspectiveCamera(80, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(50, 50, 50);
    camera.position.set(60, 60, 60);
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


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    //controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
     controls.dynamicDampingFactor = 1;
    //controls.maxPolarAngle = Math.PI / 2.5;
    controls.target.set(0, 80, 20);
    camera.position.set(0,120,20);
    //camera.position.set(0,80,20);
    //controls.update();

    document.getElementById("mvForward").addEventListener( 'mousedown', moveForward );
    document.getElementById("mvForward").addEventListener("mouseup", function(){
        if (timer) clearInterval(timer)
    });

    document.getElementById("mvForward").addEventListener('touchstart', process_touchstart, false);
    document.getElementById("mvForward").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("mvForward").addEventListener("touchmove", handleMove, false);
    document.getElementById("mvForward").addEventListener('touchend', process_touchend, false);

    document.getElementById("rtLeft").addEventListener( 'touchstart', rotateLeft, false );
    document.getElementById("rtLeft").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("rtLeft").addEventListener("touchmove", handleMove, false);
    document.getElementById("rtLeft").addEventListener('touchend', process_touchend, false);


    document.getElementById("rtRight").addEventListener( 'touchstart', rotateRight, false );
    document.getElementById("rtRight").addEventListener("touchcancel", handleCancel, false);
    document.getElementById("rtRight").addEventListener("touchmove", handleMove, false);
    document.getElementById("rtRight").addEventListener('touchend', process_touchend, false);


    function process_touchstart(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        timer=setInterval(function(){
            camera.getWorldDirection( dir );
            camera.position.addScaledVector( dir, speed );
        }, 100); 
        
    }

    function rotateLeft(evt) { 
        evt.preventDefault();
        evt.stopImmediatePropagation();
        timer=setInterval(function(){
            camera.rotation.y += Math.PI / 40;
        }, 100); 
    }

    function rotateRight(evt) { 
        evt.preventDefault();
        evt.stopImmediatePropagation();
        timer=setInterval(function(){
            camera.rotation.y -= Math.PI / 40;
        }, 100);
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
    //update();
    requestAnimationFrame( animate );
    //render();
    renderer.render( scene, camera );
    //controls.update()

}


function moveForward(evt) { 
    evt.preventDefault();
    evt.stopImmediatePropagation();
    timer=setInterval(function(){
        camera.getWorldDirection( dir );
        camera.position.addScaledVector( dir, speed );
    }, 100); // the above code is executed every 100 ms
    //camera.translateZ( -moveDistance );
}