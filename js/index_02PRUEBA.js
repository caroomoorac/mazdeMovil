///////////////ITALO


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


    camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
    // Controls
    var options = {
        speedFactor: 0.5,
        delta: 1,
        rotationFactor: 0.002,
        maxPitch: 55,
        hitTest: true,
        hitTestDistance: 40
    };
    controls = new TouchControls($container.parent(), camera, options);
    controls.setPosition(0, 35, 400);
    controls.addToScene(scene);
    
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


    var murakit = new THREE.MTLLoader(loadingManager);
    murakit.load("italo/models/computer.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(loadingManager);
      murakit.setMaterials(materials);
    
      murakit.load("italo/models/computer.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var light = new THREE.AmbientLight( 0xFFFFFF, 0.2 ); // soft white light
    scene.add( light );
    var pointlight = new THREE.HemisphereLight( 0xFFFFFF ); // soft white light
   // pointlight.position.y=20;
    pointlight.position.x=20;
    scene.add( pointlight ); 

    /*camera = new THREE.PerspectiveCamera(80, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(50, 50, 50);
    camera.position.set(60, 60, 60);
    //camera.position.set(0, 300, 0);
    scene.add(camera);*/

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    element = renderer.domElement;
    $container.append(element);



}


    function animate() {
        requestAnimationFrame( animate );
        controls.update();

        // Mouse hit-testing:
       /* var vector = new THREE.Vector3(controls.mouse.x, controls.mouse.y, 1);
        vector.unproject(camera);*/

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
        }

        renderer.render(scene, camera);
    }

    function onWindowResize() {

        width = window.innerWidth - 50;
        height = window.innerHeight - 80;
    
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    
        renderer.setSize(width, height);
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


