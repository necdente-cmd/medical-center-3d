import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfe4ea);
  scene.fog = new THREE.Fog(0xdfe4ea, 65, 150);
  return scene;
}

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 500);
  camera.position.set(30, 26, 34);
  return camera;
}

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  document.body.appendChild(renderer.domElement);
  return renderer;
}

export function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(12.5, 0, 7.5);
  controls.maxPolarAngle = Math.PI/2.05;
  controls.minDistance = 6;
  controls.maxDistance = 80;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  return controls;
}

export function addLights(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb0b8c0, 0.55));

  const sun = new THREE.DirectionalLight(0xfff5e8, 1.3);
  sun.position.set(20, 32, 14);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 30;
  sun.shadow.camera.bottom = -30;
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xc8d8ff, 0.35);
  fill.position.set(-15, 18, -12);
  scene.add(fill);
}

export function addGround(scene) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 90),
    new THREE.MeshStandardMaterial({ color: 0xd2d8de, roughness: 1 })
  );
  ground.rotation.x = -Math.PI/2;
  ground.position.set(12.5, -0.03, 7.5);
  ground.receiveShadow = true;
  scene.add(ground);
}