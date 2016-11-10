
window.onload = function(){
  init();
};

let init = function(){
  // rendering area
  let container = document.getElementById('webgl-container');
  let width = window.innerWidth;
  let height = window.innerHeight;
  // renderer
  renderer    = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(new THREE.Color(0xFFFFFF, 0));
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  // camera
  let camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
  camera.position.set( 0, 50, 200 );
  camera.lookAt(new THREE.Vector3(0,30,0));
  // scene
  let scene = new THREE.Scene();
  scene.add(camera);
  // light
  let spotlight = new THREE.SpotLight(0xffffff);
  spotlight.angle = Math.PI/3;
  spotlight.castShadow = true;
  spotlight.shadowMapWidth = 2048;
  spotlight.shadowMapHeight = 2048;
  spotlight.shadowBias = 0.0001;
  spotlight.shadowDarkness = 0.8;
  spotlight.shadowCameraNear = 10;
  spotlight.shadowCameraFar = 1000;
  spotlight.shadowCameraFov = 90;
  spotlight.position.set(5, 200, 100);
  spotlight.intensity = 1.5;
  scene.add(spotlight);
  let spotlight2 = new THREE.SpotLight(0xffffff);
  spotlight2.angle = Math.PI/3;
  spotlight2.shadowMapWidth = 2048;
  spotlight2.shadowMapHeight = 2048;
  spotlight2.shadowBias = 0.0001;
  spotlight2.shadowDarkness = 0.8;
  spotlight2.shadowCameraNear = 10;
  spotlight2.shadowCameraFar = 1000;
  spotlight2.shadowCameraFov = 90;
  spotlight2.position.set(10, 40, 150);
  spotlight2.intensity = 1.5;
  scene.add(spotlight2);
  // floor
  var floorgeo=new THREE.PlaneGeometry(400,400,1,1);
  var floorTexture = new THREE.ImageUtils.loadTexture('img/back2.jpg');
  floorTexture.wrapS=floorTexture.wrapT=THREE.RepeatWrapping;
  var floormat =new THREE.MeshBasicMaterial({map:floorTexture,side:THREE.DoubleSide});
  var floormesh = new THREE.Mesh(floorgeo, floormat);
  floormesh.rotation.x = Math.PI/2;
  floormesh.position.z = -100;
  floormesh.position.y = 0;
  floormesh.receiveShadow = true;
  scene.add(floormesh);
  // loading model and rendering
  loader = new THREE.JSONLoader();
  loader.load( "model/untitled.json", function(geometry, mats) {
          mats.forEach( function ( mat ) {
                      mat.skinning = true;
                      //mat.morphTargets = true;
          } );
          mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial( mats ));
          //THREE.AnimationHandler.add(mesh.geometry.animations[0]);
          mesh.position.set(0, 0, 0);
          mesh.scale.set(5, 5, 5);
          mesh.castShadow = true;
          scene.add(mesh);
          // render
          renderer.render(scene, camera);
  });

};
