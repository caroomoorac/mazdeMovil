///////////////LUISSSSENK


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
    .setPath( 'luisenzk/cubemap/' )
    .load( [
        'redplanet_bk.jpg',
        'redplanet_ft.jpg',
        'redplanet_up.jpg',
        'redplanet_dn.jpg',
        'redplanet_rt.jpg',
        'redplanet_lf.jpg'
    ] );




var floorTexture = new THREE.ImageUtils.loadTexture( 'luisenzk/models/abstract.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(320, 190, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 50;
    floor.position.z = 10;
    floor.position.x = -95;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var floorTexture = new THREE.ImageUtils.loadTexture( 'luisenzk/models/abstract.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(120, 200, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 50;
    floor.position.z = -180;
    floor.position.x = -70;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    

    /*var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(500, 600, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 415;
    floor.position.z = 140;
    floor.rotation.x = Math.PI / -2;
    floor.receiveShadow = true;
    scene.add(floor);

    var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(490, 492, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 170;
    floor.position.z = -156;
    floor.rotation.z = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);


    var wallMaterial =  new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var wallGeometry = new THREE.PlaneGeometry(600, 490, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 171;
    wall.position.z = 140;
    wall.position.x = 248;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallMaterial =  new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide
    });
    var wallGeometry = new THREE.PlaneGeometry(600, 490, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 171;
    wall.position.z = 140;
    wall.position.x = -248;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);

    /*
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
    */

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
       loadingScreen.innerHTML =  '&nbsp;' + '&nbsp;' + " Arte por: deculturalization" + '<br>' + '<br>' +  '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' + "UTILIZA EL CONTROL IZQUIERDO" + '<br>' + '&nbsp;' + '&nbsp;' +  " PARA MOVERTE EN EL ESPACIO" + '<br>' + '<br>' +   '&nbsp;' + '&nbsp;' + '&nbsp;' + "UTILIZA EL CONTROL DERECHO" + '<br>' + '&nbsp;' + '&nbsp;' +  " PARA ROTAR EN EL ESPACIO"  + '<br>' + '<br>' +  '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' + ((itemsLoaded / itemsTotal * 100) + "% loaded") + '<br>' + '<br>' +  '&nbsp;' + '&nbsp;' +  '&nbsp;' + "Loading:" + '<br>' +  '&nbsp;' + '&nbsp;' + '&nbsp;' +  url, itemsLoaded, itemsTotal;
       console.log((itemsLoaded / itemsTotal * 100) + "%loaded");
       //loadingScreen.innerHTML = item, itemsLoaded, itemsTotal;
       console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
   };

   manager.onError = function ( url ) {
       console.log( 'There was an error loading ' + url );
   };



    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/1.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/1.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/2.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/2.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/3.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/3.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/4.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/4.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/5.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/5.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/6.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/6.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader(manager);
    murakit.load("luisenzk/models/7.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(manager);
      murakit.setMaterials(materials);
    
      murakit.load("luisenzk/models/7.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var lightH = new THREE.HemisphereLight( 0xFFC3EA, 1 ); // soft white light
    scene.add( lightH );

    const light = new THREE.PointLight( 0xFFC3EA, 4, 100 );
    light.position.set( -150, 50, 0 );
    scene.add( light );

    const lightPoint = new THREE.PointLight( 0xFFC3EA, 4, 100 );
    lightPoint.position.set( -20, 50, -30 );
    scene.add( lightPoint );

    const lightPointTwo = new THREE.PointLight( 0xFFC3EA, 4, 100 );
    lightPointTwo.position.set( -100, 50, -160 );
    scene.add( lightPointTwo );


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
        hitTestDistance: 40
    };
    
    controls = new TouchControls($container.parent(), camera, options);
    controls.setPosition(0, 60, 0);
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

 
    