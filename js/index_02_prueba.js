///////////////ITALO


var scene, renderer;
var camera;
var vrControls
var controls;
var clock = new THREE.Clock();
//var dir = new THREE.Vector3();
var width, height;
var viewAngle = 120,
	near = 1,
	far = 10000;
var aspect;
var sceneObject, intersected;
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
    //loadingManager = new THREE.LoadingManager;

    

    scene.background = new THREE.CubeTextureLoader()
    .setPath( 'italo/' )
    .load( [
        'skybox1.jpg',
        'skybox2.jpg',
        'skyboxtecho.jpg',
        'skyboxpiso.jpg',
        'skybox3.jpg',
        'skybox4.jpg'
    ] );



    var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(500, 500, 1);
    var sceneObject = new THREE.Mesh(floorGeometry, floorMaterial);
    sceneObject.position.y = 420;
    sceneObject.position.z = 155;
    sceneObject.rotation.x = Math.PI / -2;
    sceneObject.receiveShadow = true;
    scene.add(sceneObject);


    var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(503, 503, 1);
    var sceneObject = new THREE.Mesh(floorGeometry, floorMaterial);
    sceneObject.position.y = -70;
    sceneObject.position.z = 155;
    sceneObject.rotation.x = Math.PI / -2;
    sceneObject.receiveShadow = true;
    scene.add(sceneObject);


    var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(502, 502, 1);
    var sceneObject = new THREE.Mesh(floorGeometry, floorMaterial);
    sceneObject.position.y = 180;
    sceneObject.position.z = -90;
    sceneObject.rotation.z = Math.PI / -2;
    sceneObject.receiveShadow = true;
    scene.add(sceneObject);

    var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(512, 502, 1);
    var sceneObject = new THREE.Mesh(floorGeometry, floorMaterial);
    sceneObject.position.y = 180;
    sceneObject.position.z = 150;
    sceneObject.position.x = 250;
    sceneObject.rotation.y = Math.PI / -2;
    sceneObject.receiveShadow = true;
    scene.add(sceneObject);

    var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(512, 502, 1);
    var sceneObject = new THREE.Mesh(floorGeometry, floorMaterial);
    sceneObject.position.y = 180;
    sceneObject.position.z = 150;
    sceneObject.position.x = -255;
    sceneObject.rotation.y = Math.PI / -2;
    sceneObject.receiveShadow = true;
    scene.add(sceneObject);

    

    
    

    




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



    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    manager.onLoad = function ( ) {
        loadingScreen.remove();
        console.log( 'Loading complete!');
    };
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = (itemsLoaded / itemsTotal * 100) + "%loaded";
        loadingScreen.innerHTML = '<br>' + '<br>' + '<br>' + '<br>' +'<br>' +'<br>' +'<br>' + '&nbsp;' + '&nbsp;' + " Arte por: deculturalization" + '<br>' + '<br>'+ '<br>' + '<br>'+ '<br>' + '<br>' +  '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' + "UTILIZA EL CONTROL IZQUIERDO" + '<br>' + '&nbsp;' + '&nbsp;' +  " PARA MOVERTE EN EL ESPACIO" + '<br>' + '<br>' +   '&nbsp;' + '&nbsp;' + '&nbsp;' + "UTILIZA EL CONTROL DERECHO" + '<br>' + '&nbsp;' + '&nbsp;' +  " PARA ROTAR EN EL ESPACIO"  + '<br>' + '<br>' +  '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' + ((itemsLoaded / itemsTotal * 100) + "% loaded") + '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' +  '&nbsp;' + "Loading:" + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' +  url, itemsLoaded, itemsTotal;
        console.log((itemsLoaded / itemsTotal * 100) + "%loaded");
        //loadingScreen.innerHTML = item, itemsLoaded, itemsTotal;
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };


    var murakit = new THREE.MTLLoader(manager);
    murakit.load("italo/models/computer.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("italo/models/computer.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

        //




    var light = new THREE.SpotLight( 0xFFFFFF, 0.9 ); // soft white light
    light.position.y=800;
    light.position.z=1000;
    scene.add( light.target );
    scene.add( light );
    
    var pointlight = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
    pointlight.position.y=20;
    pointlight.position.x=20;
    scene.add( pointlight ); 

   /* camera = new THREE.PerspectiveCamera(80, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(50, 50, 50);
    camera.position.set(60, 60, 60);
    camera.rotation.y = Math.PI / 1.6;*/

    //camera.position.set(0, 300, 0);
   //scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    element = renderer.domElement;
    $container.append(element);



    camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
    var width  = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    // Controls
    var options = {
        speedFactor: 0.5,
        delta: 1,
        rotationFactor: 0.003,
        maxPitch: 90,
        hitTest: true,
        hitTestDistance: 40
    };
    
    controls = new TouchControls($container.parent(), camera, options);
    controls.setPosition(0, 35, 400);
    controls.addToScene(scene);

   /* controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    //controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
     controls.dynamicDampingFactor = 1;
    //controls.maxPolarAngle = Math.PI / 2.5;
    controls.target.set(0, 80, 20);
    camera.position.set(0,120,20);
    //camera.position.set(0,80,20);
    //controls.update();*/

    document.getElementById("main-container").addEventListener( 'touchstart', process_touchstart, false );
    document.getElementById("main-container").addEventListener("touchcancel", process_touchstart, false);
    document.getElementById("main-container").addEventListener("touchmove", process_touchstart, false);
    document.getElementById("main-container").addEventListener('touchend', process_touchstart, false);

    document.getElementById("footer").addEventListener( 'touchstart', process_touchstart, false );
    document.getElementById("footer").addEventListener("touchcancel", process_touchstart, false);
    document.getElementById("footer").addEventListener("touchmove", process_touchstart, false);
    document.getElementById("footer").addEventListener('touchend', process_touchstart, false);

    function process_touchstart(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
    }

}


    function animate() {
        controls.update();
        var vector = new THREE.Vector3(controls.mouse.x, controls.mouse.y, 1);
        vector.unproject(camera);
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

    }

 
    