/* ============================================
   ТОЧКА ВХОДА
   ============================================ */
import * as THREE from 'three';
import { createScene, createRenderer, createCamera, createControls, addLights, addGround } from './scene.js';
import { initUI } from './ui.js';
import { buildFloor1, getFloor1Data } from './floors/floor1.js';
import { buildFloor2, getFloor2Data } from './floors/floor2.js';
import { buildFloor3, getFloor3Data } from './floors/floor3.js';
import { buildBasement, getBasementData } from './floors/basement.js';
import { FloorManager } from './floorManager.js';

/* ---------- ИНИЦИАЛИЗАЦИЯ ---------- */
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const controls = createControls(camera, renderer);

addLights(scene);
addGround(scene);

/* ---------- ГРУППЫ ПО ЭТАЖАМ ---------- */
const floorManager = new FloorManager(scene);

// Цоколь
floorManager.registerFloor('basement', buildBasement());
// 1 этаж
floorManager.registerFloor('1', buildFloor1());
// 2 этаж
floorManager.registerFloor('2', buildFloor2());
// 3 этаж
floorManager.registerFloor('3', buildFloor3());

// По умолчанию — 1 этаж
floorManager.showFloor('1');

/* ---------- UI ---------- */
initUI({
  camera,
  controls,
  renderer,
  scene,
  floorManager,
  floorsData: {
    basement: getBasementData(),
    '1': getFloor1Data(),
    '2': getFloor2Data(),
    '3': getFloor3Data()
  }
});

/* ---------- АНИМАЦИЯ ---------- */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});