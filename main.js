import './style.css'

//Importation three.js
import * as THREE from 'three';

//Importation des controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

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

//like a game loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();