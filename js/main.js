import { OrbitControls } from "./OrbitControls.js";
import * as THREE from './three.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

//camera
const angle = 25; // degree
const cameraDistance = 16; // distance
const cameraHeight = Math.tan(THREE.MathUtils.degToRad(angle)) * cameraDistance;
camera.position.set(0, cameraHeight, cameraDistance); // change (x,0,0) for perspective

// Look at the center of the scene
camera.lookAt(new THREE.Vector3(0, 0, 0));


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.shadowMap.enabled = true; // Enable shadows in renderer
document.body.appendChild( renderer.domElement );


// //Orbiiiiiiiiiiit (try lng)
// // Initialize OrbitControls
 
//     import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true; 
    // controls.dampingFactor = 0.25; // non-inertia
    // controls.screenSpacePanning = false;
    // controls.maxPolarAngle = Math.PI / 2; // don't allow the camera to go below because thats spg
    const controls = new OrbitControls(camera, renderer.domElement);


// Create a floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('img/tile.png');
    const floorMaterial = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true; // Receive shadows
    scene.add(floor);

// const floorGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
// const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide }); // Set color directly
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.rotation.x = Math.PI / 2;
// floor.receiveShadow = true; // Receive shadows
// scene.add(floor);

// Create a vertical wall
const verticalWallGeometry = new THREE.BoxGeometry(0.2, 4, 10);
const verticalWallMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const verticalWall = new THREE.Mesh(verticalWallGeometry, verticalWallMaterial);
verticalWall.castShadow = true; // Cast shadows
verticalWall.receiveShadow = true; // Receive shadows
scene.add(verticalWall);
verticalWall.position.set(0, 2, 0);

// Create a horizontal wall
const horizontalWallGeometry = new THREE.BoxGeometry(10, 4, 0.2);
const horizontalWallMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const horizontalWall = new THREE.Mesh(horizontalWallGeometry, horizontalWallMaterial);
horizontalWall.castShadow = true; // Cast shadows
horizontalWall.receiveShadow = true; // Receive shadows
scene.add(horizontalWall);
horizontalWall.position.set(0, 2, 0);

//-----------------------------------
// Cube 1st quadrant
const cubeGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
const woodTexture = textureLoader.load('img/wood.jpg');
const cubeMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true; // Cast shadows
cube.receiveShadow = true; // Receive shadows
scene.add(cube);
cube.position.set(3, 0.5, 3);

//sphere 4th quadrant
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const goldieTexture = textureLoader.load('img/goldie.jpg')
const sphereMaterial = new THREE.MeshStandardMaterial({ map: goldieTexture }); // Apply texture to the sphere material
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true; // Cast shadows
sphere.receiveShadow = true; // Receive shadows
scene.add(sphere);
sphere.position.set(-3, 0.5, 3);

//-------------------------
// C.ball as a lamp
const lampGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const lampMaterial = new THREE.MeshStandardMaterial({ emissive: 0xf2c56b, emissiveIntensity: 2 }); // Yellow emissive material
const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
lamp.castShadow = true; // Cast shadows
lamp.position.set(4, 2, 1.5); // Adjust position\
scene.add(lamp);

//C.Create a point light for the lamp
const lampLight = new THREE.PointLight(0xf2c56b, 20, 5);
lampLight.castShadow = true; // Enable shadow casting for the light
lamp.add(lampLight);

//C.Set up shadow properties for light
lampLight.shadow.mapSize.width = 1024; 
lampLight.shadow.mapSize.height = 1024;
lampLight.shadow.camera.near = 0.1;
lampLight.shadow.camera.far = 10;

// S.spotlight on top of the sphere
const spotLight = new THREE.SpotLight(0xffffff, 5); // color, intensity
spotLight.position.set(-3, 2, 3); // position above the sphere
spotLight.target = sphere; 
spotLight.angle = Math.PI / 4; // cone angle
spotLight.penumbra = 0.1; // softness (??)
scene.add(spotLight);

// Add ambient light (warm light)
const ambientLight = new THREE.AmbientLight(0xffccaa, 0.5); 
scene.add(ambientLight);


// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // ye, add something

  renderer.render(scene, camera);
}

animate();