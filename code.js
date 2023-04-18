import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { FirstPersonControls } from 'FirstPersonControls';

let camera, scene, renderer;
let monitor,monitor2,monitorStand,monitorStand2,cpu,cpu2,cpu3,cpu4;
let light,light2,light3,light4,index = 0,BGTexture,base;

init();
animate();

function init() {
// Creating camera
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 0, 5 );

// Creating scene
scene = new THREE.Scene();

scene.background = new THREE.TextureLoader().load("./Textures/Space.jpg");


//const canvas = renderer.domElement;



// Creating monitor
const textureLoader = new THREE.TextureLoader();
let texture1Loaded = false;
let texture2Loaded = false;
let texture1 = null;
let texture2 = null;
textureLoader.load('Textures/monitorTexture.jpg', (tex) => {
    texture1 = tex;
    texture1Loaded = true;
  });
  textureLoader.load('Textures/monitorTexture2.jpg', (tex) => {
    texture2 = tex;
    texture2Loaded = true;
  });

// Creating a mesh with a BoxGeometry and the first texture
const geometry = new THREE.BoxGeometry( 2, 1.5, 0.1 );
const material = new THREE.MeshBasicMaterial({ map: texture1 });
monitor = new THREE.Mesh(geometry, material);

// Add the mesh to the scene and set its position
monitor.rotation.set( -Math.PI/9, 0, 0 );
monitor.position.set( -1.5, 0, 0 );
scene.add( monitor );


let imageStirng = ['Textures/monitorTexture.jpg','Textures/monitorTexture2.jpg','Textures/monitorTexture3.jpg']

window.addEventListener('click',function (e){
  console.log("index");
  const monitorTexture = new THREE.TextureLoader().load(imageStirng[index]);
  const monitorGeometry = new THREE.BoxGeometry( 2, 1.5, 0.1 );
  const monitorMaterial = new THREE.MeshStandardMaterial( { map: monitorTexture, side: THREE.FrontSide } );
  monitor = new THREE.Mesh( monitorGeometry, monitorMaterial );
  monitor.rotation.set( -Math.PI/9, 0, 0 );
  monitor.position.set( -1.5, 0, 0 );
  scene.add( monitor );
  index++;
  if(index == 3){
    index = 0;
}
})
  
const monitorTexture = new THREE.TextureLoader().load(imageStirng[index]);
const monitorGeometry = new THREE.BoxGeometry( 2, 1.5, 0.1 );
const monitorMaterial = new THREE.MeshStandardMaterial( { map: monitorTexture, side: THREE.FrontSide } );
monitor = new THREE.Mesh( monitorGeometry, monitorMaterial );
monitor.rotation.set( -Math.PI/9, 0, 0 );
monitor.position.set( -1.5, 0, 0 );
scene.add( monitor );
  
  



const monitorGeometry2 = new THREE.BoxGeometry( 2.05, 1.55, .1 );
const monitorMaterial2 = new THREE.MeshStandardMaterial( { color: 0x0E2F44 } );
monitor2 = new THREE.Mesh( monitorGeometry2, monitorMaterial2 );
monitor2.rotation.set( -Math.PI/9, 0, 0 );
monitor2.position.set( -1.5, 0, -0.01 );
scene.add( monitor2 );

//Creating Monitor Stand
const standGeometry = new THREE.BoxGeometry( 0.1, 1.25, .1 );
const standMaterial = new THREE.MeshStandardMaterial( { color: 0x0E2F44 } );
monitorStand = new THREE.Mesh( standGeometry, standMaterial );
monitorStand.rotation.set( Math.PI/9, 0, 0 );
monitorStand.position.set( -1.5, -.5, -.25 );
scene.add( monitorStand );

const standGeometry2 = new THREE.BoxGeometry( .8, .1, .8 );
const standMaterial2 = new THREE.MeshStandardMaterial( { color: 0x0E2F44 } );
monitorStand2 = new THREE.Mesh( standGeometry2, standMaterial2 );
monitorStand2.rotation.set( 0, 0, 0 );
monitorStand2.position.set( -1.5, -1.1, -.25 );
scene.add( monitorStand2 );

// Creating CPU
const cpuTexture = new THREE.TextureLoader().load('Textures/cpuTexture.jpg');
const cpuGeometry = new THREE.BoxGeometry( 1.5, 1.5, 0.7 );
const cpuMaterial = new THREE.MeshStandardMaterial( { map: cpuTexture, side: THREE.FrontSide } );
cpu = new THREE.Mesh( cpuGeometry, cpuMaterial );
cpu.position.set( 1.5, -.3, 0 );
scene.add( cpu );

const cpuTexture2 = new THREE.TextureLoader().load('Textures/front.jpg');
const cpuGeometry2 = new THREE.BoxGeometry( 1.52, 1.52, 0.67 );
const cpuMaterial2 = new THREE.MeshStandardMaterial( { map: cpuTexture2} );
cpu2 = new THREE.Mesh( cpuGeometry2, cpuMaterial2 );
cpu2.position.set( 1.6, -.3, 0 );
scene.add( cpu2 );

const cpuMaterial3 = new THREE.MeshStandardMaterial( { color: 0x264356 } );
const cpuGeometry3 = new THREE.BoxGeometry( 1.52, 1.53, 0.67 );
cpu3 = new THREE.Mesh( cpuGeometry3, cpuMaterial3 );
cpu3.position.set( 1.49, -.3, -.02 );
scene.add( cpu3 );



//Creating Base
const baseMaterial = new THREE.MeshStandardMaterial( { color: 0x264356 } );
const baseGeometry = new THREE.BoxGeometry( 1.0, 0.53, 3.67 );
base = new THREE.Mesh( baseMaterial, baseGeometry );
base.position.set( 1.49, -.3, -.02 );
scene.add( base );


// Creating main light
light = new THREE.PointLight( 0xffffff, 1 );
light.position.set( 0, 0, 0 );
scene.add( light );

// Creating Other lights

light2 = new THREE.PointLight( 0xffffff, 1 );
light2.position.set( -1.5, 0, 0 );
light2.intensity = .5;
scene.add( light2 );

light3 = new THREE.PointLight( 0xffffff, 1 );
light3.position.set( 1.5, -.3, 0 );
light3.intensity = .5;
scene.add( light3 );

light4 = new THREE.PointLight( 0xffffff, 1 );
light4.position.set( 1.6, -.3, 0 );
light4.intensity = .6;
scene.add( light4 );

// Creating renderer
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add event listeners
window.addEventListener( 'resize', onWindowResize );
//document.addEventListener( 'keydown', onKeyDown );
}





function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
}

// Add keyboard and mouse controls to the camera
//const controls = new FirstPersonControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// Set the camera position and look at the monitor
camera.position.set(0, 0, 5);
camera.lookAt(monitor.position);

// Add keyboard controls
var keyboard = {};
window.addEventListener('keydown', function(event) {
  if (event.key == 'w') {
    camera.position.y += 0.1;
}
if (event.key == 's') {
    camera.position.y -= 0.1;
}
if (event.key == 'a') {
    camera.position.x -= 0.1;
}
if (event.key == 'd') {
    camera.position.x += 0.1;
}
if (event.key == 'q') {
    camera.position.z += 0.05;
}
if (event.key == 'e') {
    camera.position.z -= 0.05;
}
});


// // Animate the camera
// function animateCamera() {
//     if (keyboard['KeyW']) {
//         camera.position.y += 0.1;
//     }
//     if (keyboard['KeyS']) {
//         camera.position.y -= 0.1;
//     }
//     if (keyboard['KeyA']) {
//         camera.position.x -= 0.1;
//     }
//     if (keyboard['KeyD']) {
//         camera.position.x += 0.1;w
//     }
//     if (keyboard['KeyQ']) {
//         camera.rotation.z += 0.05;
//     }
//     if (keyboard['KeyE']) {
//         camera.rotation.z -= 0.05;
//     }
// }

// Add an animation loop
function animate() {
  requestAnimationFrame(animate);
  
  //animateCamera();

  // Rotate the light source around the monitor
  const time = Date.now() * 0.001;
  light.position.x = Math.sin(time * 1) * 3;
  light.position.y = Math.cos(time * 1) * 3;
  light.position.z = Math.cos(time * 1) * 3;

  light2.position.x = -1.5;
  light2.position.y = 2;
  light2.position.z = .1;

  light3.position.x = 1.5;
  light3.position.y = 0;
  light3.position.z = 1;

  light4.position.x = 2.5;
  light4.position.y = 0;
  light4.position.z = .1;


  //controls.update(1.0);

  renderer.render(scene, camera);
}



animate();