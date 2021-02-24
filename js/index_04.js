///////////////BRUNADENEGRI


var scene, renderer;
var camera;
var vrControls
var controls;
var clock = new THREE.Clock();
//var dir = new THREE.Vector3();
var width, height;
var viewAngle = 90,
	near = 1,
	far = 10000;
var aspect;
var sceneObject, intersected;

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
    scene.background = new THREE.CubeTextureLoader()
    .setPath( 'brunaD/cubemap/' )
    .load( [
        'nightsky_bk.jpg',
        'nightsky_ft.jpg',
        'nightsky_up.jpg',
        'nightsky_dn.jpg',
        'nightsky_rt.jpg',
        'nightsky_lf.jpg'
    ] );






    /*var floorTexture = new THREE.ImageUtils.loadTexture( 'luisenzk/models/abstract.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(600, 800, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 50;
    floor.position.z = -180;
    floor.position.x = -70;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);*/
    

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
        loadingScreen.innerHTML =  '<br>' + '<br>' +  '<br>' + '&nbsp;' + '&nbsp;' + " Arte por: Bruna Denegri" + '<br>' + '<br>' +  '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' + "UTILIZA EL CONTROL IZQUIERDO" + '<br>' + '&nbsp;' + '&nbsp;' +  " PARA MOVERTE EN EL ESPACIO" + '<br>' + '<br>' +   '&nbsp;' + '&nbsp;' + '&nbsp;' + "UTILIZA EL CONTROL DERECHO" + '<br>' + '&nbsp;' + '&nbsp;' +  " PARA ROTAR EN EL ESPACIO"  + '<br>' + '<br>' +  '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' + ((itemsLoaded / itemsTotal * 100) + "% loaded") + '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' +  '&nbsp;' + "Loading:" + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' +  url, itemsLoaded, itemsTotal;
        console.log((itemsLoaded / itemsTotal * 100) + "%loaded");
        //loadingScreen.innerHTML = item, itemsLoaded, itemsTotal;
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
 
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("brunaD/mtl/arbolito.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("brunaD/mtl/arbolito.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("brunaD/mtl/flowers.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("brunaD/mtl/flowers.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });
    
    var murakit = new THREE.MTLLoader(manager);
    murakit.load("brunaD/mtl/animals.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("brunaD/mtl/animals.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("brunaD/mtl/cat.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("brunaD/mtl/cat.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var murakit = new THREE.MTLLoader(manager);
    murakit.load("brunaD/mtl/walls.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("brunaD/mtl/walls.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var lightH = new THREE.AmbientLight( 0x800040, 0.8 ); // soft white light
    lightH.position.set( 0, 450, 0 );
    //scene.add( lightH );


    var lightH2 = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
    lightH2.position.set( 0, 450, 0 );
    scene.add( lightH2 );

    const light = new THREE.PointLight( 0x800040, 0.2, 100 );
    light.position.set( -150, 50, 0 );
    //scene.add( light );

    const lightPoint = new THREE.PointLight( 0x800040, 0.2, 0 );
    lightPoint.position.set( -20, 00, -30 );
    //scene.add( lightPoint );

    const lightPointTwo = new THREE.PointLight( 0x800040, 0.2, 200 );
    lightPointTwo.position.set( -100, 40, -300 );
    //scene.add( lightPointTwo );


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
        rotationFactor: 0.005,
        maxPitch: 90,
        hitTest: true,
        hitTestDistance: 2
    };
    
    controls = new TouchControls($container.parent(), camera, options);
    controls.setPosition(-90, 20, 180);
    controls.addToScene(scene);


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
