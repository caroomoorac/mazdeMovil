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




    scene.background = new THREE.CubeTextureLoader()
    .setPath( 'cubemap/' )
    .load( [
        'lagoon_ft.jpg',
        'lagoon_bk.jpg',
        'lagoon_up.jpg',
        'lagoon_dn.jpg',
        'lagoon_rt.jpg',
        'lagoon_lf.jpg'
    ] );

    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/metal_plate_spec_1k.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 2, 2 );
    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(400, 400, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 34;
    floor.position.z = 0;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/factory_wall_diff_1k.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 2, 2 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(270, 90, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = 0;
    wall.position.x = 135;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/factory_wall_diff_1k.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 2, 2 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(270, 90, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = 0;
    wall.position.x = -135;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);



    ////lados

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/factory_wall_diff_1k.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 2, 2 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(270, 90, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = 135;
    wall.position.x = 0;
    wall.rotation.y = Math.PI / 1;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/factory_wall_diff_1k.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 2, 2 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(140, 90, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = -135;
    wall.position.x = -65;
    wall.rotation.y = Math.PI / 1;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/factory_wall_diff_1k.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 2, 2 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(100, 90, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = -135;
    wall.position.x = 85;
    wall.rotation.y = Math.PI / 1;
    wall.receiveShadow = true;
    scene.add(wall);


    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/doorcop.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(40, 90, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = -120;
    wall.position.x = 15;
    wall.rotation.y = Math.PI / 1.5;
    wall.receiveShadow = true;
    scene.add(wall);


    ////POSTER1

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/12.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(50, 60, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = -130;
    wall.position.x = 90;
    wall.rotation.y = Math.PI / -1;
    wall.receiveShadow = true;
    scene.add(wall);

    ///VIDEO1

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/video1.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(40, 60, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 80;
    wall.position.z = -90;
    wall.position.x = 130;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);

    ///PINTURAS PISO

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/10.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(30, 50, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 90;
    wall.position.z = 90;
    wall.position.x = -130;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/video2.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(30, 50, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 90;
    wall.position.z = 130;
    wall.position.x = -20;
    wall.rotation.y = Math.PI / -1;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/15.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(20, 40, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 37;
    wall.position.z = 90;
    wall.position.x = 10;
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = -120;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/11.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(20, 40, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 37;
    wall.position.z = 90;
    wall.position.x = -40;
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = 120;
    wall.receiveShadow = true;
    scene.add(wall);


    /////poster3


    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/14.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(30, 50, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 90;
    wall.position.z = -130;
    wall.position.x = -50;
    wall.rotation.y = Math.PI / -1;
    wall.receiveShadow = true;
    scene.add(wall);


    ////TV SCREEN

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/video3.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(28, 18, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 75;
    wall.position.z = -15;
    wall.position.x = -82;
    wall.rotation.y = Math.PI / -1;
    wall.receiveShadow = true;
    scene.add(wall);


    ///FUEGO


    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/Flame_di.png' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(38, 38, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 75;
    wall.position.z = -85;
    wall.position.x = -92;
    wall.rotation.y = Math.PI / -1;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/Flame_di.png' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(38, 38, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 75;
    wall.position.z = -85;
    wall.position.x = -92;
    wall.rotation.y = Math.PI / 2;
    wall.receiveShadow = true;
    scene.add(wall);


    ////REVISTAS


    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/3_front.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(28, 30, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 40;
    wall.position.z = -85;
    wall.position.x = -42;
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = 120;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/mpm_vol.06_p23_book_01C_diff.JPG' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(39, 20, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 40;
    wall.position.z = -55;
    wall.position.x = -42;
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = 320;
    wall.receiveShadow = true;
    scene.add(wall);

    var wallTexture = new THREE.ImageUtils.loadTexture( 'img/RenderStuff_Magazines_Kit_Vol.1_magazine_rolling_stone.jpg' );
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; 
    wallTexture.repeat.set( 1, 1 );
    var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide, transparent:true } );
    var wallGeometry = new THREE.PlaneGeometry(39, 20, 1, 1);
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.y = 40;
    wall.position.z = -55;
    wall.position.x = -62;
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = 20;
    wall.receiveShadow = true;
    scene.add(wall);

    var murakit = new THREE.MTLLoader(loadingManager);
    murakit.load("models/model/escritorio.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader(loadingManager);
      murakit.setMaterials(materials);
    
      murakit.load("models/model/escritorio.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var murakit = new THREE.MTLLoader();
    murakit.load("models/model/mazde3.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/model/mazde3.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader();
    murakit.load("models/model/4.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/model/4.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });

    var murakit = new THREE.MTLLoader();
    murakit.load("models/model/5.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/model/5.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var murakit = new THREE.MTLLoader();
    murakit.load("models/model/6.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/model/6.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });



   /* var murakit = new THREE.MTLLoader();
    murakit.load("models/model/laCarniceriaMazDE.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/model/laCarniceriaMazDE2.obj", function(mesh) {
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


    /*controls = new THREE.OrbitControls(camera, renderer.domElement);
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

   /* vrControls = new THREE.OrbitControls(camera, element);
    vrControls.target.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    );*/


  


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


