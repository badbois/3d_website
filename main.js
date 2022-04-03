import './style.css'

//Importation three.js
import * as THREE from 'three';

//Importation des controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Importation de ObjLoader
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

//creation de la scene
const scene = new THREE.Scene();

//Creation de la camera : fov, aspect, near, far 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Creation du renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//Creation d'objets
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//Pas besoin de lumiere pour un basicMaterial
//const material = new THREE.MeshBasicMaterial({color: 0x123456, wireframe: true});
const earth_texture = new THREE.TextureLoader().load('assets/earth_texture.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/earth_normal.png');
const material = new THREE.MeshStandardMaterial({map: earth_texture, normalMap: normalTexture});
const earth = new THREE.Mesh(geometry, material);

scene.add(earth);

//Creation des lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambiantLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambiantLight);

//outils d'aide lumiere
//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

//2d grid dans la scene
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

//instantiation des controls
const controls = new OrbitControls(camera, renderer.domElement);

function add_stars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloat(-100,100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_stars);


const space_texture = new THREE.TextureLoader().load('assets/space.png');
scene.background = space_texture;



//Moon Material
const moon_texture = new THREE.TextureLoader().load('assets/moon_texture.jpg');
const moon_normalTexture = new THREE.TextureLoader().load('assets/moon_normal.jpg');
const moon_material = new THREE.MeshStandardMaterial({map: moon_texture, normalMap: moon_normalTexture});
 
let moon;
let moonObj;

//Loading my object
const objLoader = new OBJLoader();
//objLoader.setMaterials([moon_material]);
objLoader.setPath('assets/objects/');
objLoader.load('croissant.obj', (object) => {
  moon = new THREE.Mesh(object.children[0].geometry, moon_material);
  moonObj = new THREE.Object3D();
  moonObj.add(moon);
  scene.add(moonObj);
  moon.position.set(10, 5, 20);
  
  //scene.add(moon);
});



//like a game loop
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.01;
  earth.rotation.z += 0.01;

  moonObj.rotation.y += 0.01;
 

  moon.rotation.x += 0.005;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.005;




  controls.update();

  renderer.render(scene, camera);
}

animate();