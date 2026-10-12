import * as THREE from 'three';
import { makeWall, makeRoomWalls, WALL_H, WALL_T } from '../builders/walls.js';
import { makeWindow } from '../builders/windows.js';
import { makeDoor } from '../builders/doors.js';
import { makeDoorSign } from '../builders/signs.js';
import { medicalCouch, doctorDesk, monitor, chair, cabinet, sink, plant, fridge, toilet } from '../builders/furniture.js';
import { personDetailed } from '../builders/people.js';
import { buildStairsUp, buildStairsDown, railing } from '../builders/stairs.js';
import { buildElevator } from '../builders/elevator.js';
import { aquarium } from '../builders/aquarium.js';
import { linoleumWhite, linoleumHall, linoleumCorr, linoleumRoom } from '../materials.js';
import { buildCeiling } from '../builders/ceiling.js';
import { buildPlinth } from '../builders/plinth.js';
import { sanitizerDispenser, entranceMat, wallClock, fireExtinguisher, infoStand } from '../builders/extras.js';

const ROOMS = [
  { name:'Прививочный кабинет', area:'21.0', x1:6.5, x2:9.0, z1:0.5, z2:7.0, type:'exam_L' },
  { name:'Прививочный кабинет', area:'21.0', x1:9.0, x2:10.5, z1:0.5, z2:4.5, type:'exam_R', noLabel:true },
  { name:'Касса', area:'3.75', x1:9.0, x2:10.5, z1:4.5, z2:7.0, type:'cashier' },
  { name:'Сестринский кабинет', area:'36.05', x1:0.5, x2:6.0, z1:0.5, z2:7.0, type:'nurse' },
  { name:'Холл / регистратура', area:'59.0', x1:10.5, x2:19.5, z1:0.0, z2:7.5, type:'hall', noWalls:true },
  { name:'Коридор', area:'', x1:0.5, x2:19.5, z1:7.5, z2:10.5, type:'corridor', noWalls:true },
  { name:'Лестница ↑', area:'9.45', x1:19.5, x2:23.0, z1:0.5, z2:3.2, type:'stairs_up', noWalls:true },
  { name:'Лестница ↓', area:'8.4',  x1:19.5, x2:23.0, z1:3.4, z2:5.8, type:'stairs_dn', noWalls:true },
  { name:'Лифт',      area:'3.75', x1:20.5, x2:23.0, z1:6.0, z2:7.5, type:'elevator', noWalls:true },
  { num:'9',  name:'Каб. семейного врача', area:'17.53', x1:0.5,  x2:4.4,  z1:10.5, z2:14.5, type:'doctor' },
  { num:'7',  name:'Каб. семейного врача', area:'15.81', x1:4.6,  x2:8.1,  z1:10.5, z2:14.5, type:'doctor' },
  { num:'10', name:'Каб. семейного врача', area:'10.53', x1:8.3,  x2:10.9, z1:10.5, z2:14.5, type:'doctor' },
  { num:'12', name:'Каб. семейного врача', area:'19.55', x1:11.1, x2:15.0, z1:10.5, z2:14.5, type:'doctor' },
  { num:'15', name:'Каб. семейного врача', area:'15.72', x1:15.2, x2:18.6, z1:10.5, z2:14.5, type:'doctor' },
  { num:'14', name:'Каб. семейного врача', area:'18.55', x1:18.8, x2:22.2, z1:10.5, z2:14.5, type:'doctor' },
  { name:'Санузел МГН', area:'3.46', x1:22.5, x2:24.5, z1:10.5, z2:12.5, type:'wc_hidden', noWalls:true },
  { name:'М/Ж туалеты', area:'5.47', x1:22.5, x2:24.5, z1:12.5, z2:14.5, type:'wc_hidden', noWalls:true },
];

export function getFloor1Data() {
  return {
    legend: [
      ['#f0c8a8', 'Сестринский'],
      ['#c8e8b8', 'Прививочный'],
      ['#f0e0b0', 'Касса'],
      ['#f8f0c8', 'Холл / регистратура'],
      ['#e8dcc8', 'Коридор'],
      ['#e0c0e0', 'Лестница ↑ / ↓'],
      ['#a8d8e8', 'Кабинеты врачей'],
      ['#c8d8e8', 'Санузлы']
    ],
    rooms: ROOMS,
    cameraTarget: { x: 12.5, y: 0, z: 7.5 }
  };
}

export function buildFloor1() {
  const group = new THREE.Group();
  group.userData.floorId = '1';

  const roomFloors = [];

  ROOMS.forEach(r => {
    const w = r.x2 - r.x1, d = r.z2 - r.z1;
    const cx = (r.x1 + r.x2)/2, cz = (r.z1 + r.z2)/2;

    let floorTex = linoleumWhite;
    if (r.type === 'hall') floorTex = linoleumHall;
    else if (r.type === 'corridor') floorTex = linoleumCorr;
    else if (r.type === 'doctor' || r.type === 'nurse' || r.type === 'exam_L' || r.type === 'exam_R') floorTex = linoleumRoom;

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(w - WALL_T*0.5, d - WALL_T*0.5),
      new THREE.MeshStandardMaterial({ map: floorTex, color: 0xffffff, roughness: 0.55, metalness: 0.02 })
    );
    floor.rotation.x = -Math.PI/2;
    floor.position.set(cx, 0.02, cz);
    floor.receiveShadow = true;
    floor.userData.isFloor = true;
    floor.userData.name = (r.num ? '№'+r.num+' · ' : '') + r.name + (r.area ? ' · ' + r.area + ' м²' : '');
    group.add(floor);
    roomFloors.push(floor);

    if (!r.noWalls && r.type !== 'exam_R' && r.type !== 'exam_L' && r.type !== 'cashier') {
      makeRoomWalls(group, r);
    }

    // Потолок со светильниками (кроме лестниц и лифта)
    if (r.type !== 'stairs_up' && r.type !== 'stairs_dn' && r.type !== 'elevator') {
      buildCeiling(group, r.x1, r.x2, r.z1, r.z2, WALL_H);
    }

    // Плинтус (только у комнат со стенами)
    if (!r.noWalls && r.type !== 'exam_R' && r.type !== 'exam_L' && r.type !== 'cashier') {
      buildPlinth(group, r.x1, r.x2, r.z1, r.z2);
    }

    // мебель по типу
    if (r.type === 'nurse') {
      [1.4, 2.9, 4.4, 5.9].forEach(nz => {
        makeBoxLike(group, r.x2 - 1.6, nz);
        monitor(group, r.x2 - 1.6, nz, Math.PI/2);
        chair(group, r.x2 - 0.6, nz, Math.PI/2, 0x5a7ab8);
      });
      cabinet(group, r.x1 + 0.35, r.z1 + 1.5, -Math.PI/2, 1.8, 2.0);
      cabinet(group, r.x1 + 0.35, r.z1 + 3.5, -Math.PI/2, 1.8, 2.0);
      sink(group, r.x1 + 0.6, r.z2 - 0.6, 0);
      medicalCouch(group, r.x1 + 2.0, r.z2 - 1.2, 0);
      [1.4, 2.9, 4.4, 5.9].forEach(nz => personDetailed(group, r.x2 - 0.6, nz, Math.PI/2, 'nurse'));
    } else if (r.type === 'exam_L') {
      medicalCouch(group, r.x1 + 1.2, r.z1 + 1.3, 0);
      doctorDesk(group, r.x1 + 1.2, r.z1 + 3.4, 0);
      monitor(group, r.x1 + 1.2, r.z1 + 3.4, 0);
      chair(group, r.x1 + 1.2, r.z1 + 4.3, Math.PI, 0x5a7ab8);
      fridge(group, r.x1 + 0.4, r.z2 - 0.8, 0);
      sink(group, r.x2 - 0.5, r.z2 - 0.6, Math.PI/2);
      personDetailed(group, r.x1 + 1.2, r.z1 + 4.3, Math.PI, 'nurse');
    } else if (r.type === 'exam_R') {
      makeBox(group, 0.9, 0.8, 0.5, 0xe8dcc0, cx, 0.4, cz, 0, 0.5);
      chair(group, cx, cz + 0.7, Math.PI, 0x5a7ab8);
    } else if (r.type === 'cashier') {
      makeBox(group, 1.0, 1.05, 0.6, 0xe8dcc0, cx, 0.52, r.z2 - 1.2, 0, 0.5);
      monitor(group, cx, r.z2 - 1.25, 0);
      makeBox(group, 0.3, 0.25, 0.3, 0x333333, cx + 0.3, 0.75, r.z2 - 1.2);
      chair(group, cx, r.z2 - 2.1, Math.PI, 0x5a7ab8);
      cabinet(group, r.x2 - 0.35, r.z1 + 0.6, Math.PI/2, 1.0, 1.8);
      personDetailed(group, cx, r.z2 - 2.1, Math.PI, 'receptionist');
    } else if (r.type === 'hall') {
      makeBox(group, 0.6, 1.05, 5.0, 0xf0ede6, 11.3, 0.52, 4.0, 0, 0.45);
      [2.3, 4.0, 5.7].forEach(rz => {
        monitor(group, 11.1, rz, Math.PI/2);
        chair(group, 10.9, rz, -Math.PI/2, 0x5a7ab8);
        personDetailed(group, 10.9, rz, -Math.PI/2, 'receptionist');
      });
      makeBox(group, 0.08, 1.5, 2.6, 0x0a0a0a, 10.62, 1.75, 4.0, 0, 0.2);
      makeBox(group, 0.03, 1.3, 2.35, 0x2a4a6a, 10.68, 1.75, 4.0, 0, 0.15);
      plant(group, 11.0, 1.2);
      plant(group, 19.0, 1.2);
      plant(group, 19.0, 7.0);

      // пациенты в холле
      personDetailed(group, 14.5, 3.2, Math.PI, 'patient');
      personDetailed(group, 17.5, 1.8, Math.PI*0.75, 'patient');
      personDetailed(group, 13.0, 4.5, -Math.PI/2, 'patient');
      personDetailed(group, 16.0, 5.5, Math.PI, 'patient');
      personDetailed(group, 16.4, 5.5, Math.PI, 'patient', { skin: 0xf8d8b8 });
      personDetailed(group, 12.5, 6.0, -Math.PI/2, 'visitor');
      personDetailed(group, 15.5, 2.5, Math.PI, 'visitor');
    } else if (r.type === 'corridor') {
      personDetailed(group, 3.5, 8.8, Math.PI/2, 'patient');
      personDetailed(group, 6.5, 9.5, -Math.PI/2, 'visitor');
      personDetailed(group, 10.5, 8.5, Math.PI/2, 'patient');
      personDetailed(group, 14.0, 9.3, -Math.PI/2, 'visitor');
      personDetailed(group, 17.5, 8.8, Math.PI/2, 'patient');
    } else if (r.type === 'stairs_up') {
      buildStairsUp(group, r);
    } else if (r.type === 'stairs_dn') {
      buildStairsDown(group, r);
    } else if (r.type === 'elevator') {
      buildElevator(group, r);
      personDetailed(group, 19.8, 6.7, Math.PI/2, 'patient');
    } else if (r.type === 'doctor') {
      medicalCouch(group, r.x1 + 0.55, cz, Math.PI/2);
      cabinet(group, r.x2 - 0.35, cz, -Math.PI/2, 1.6, 1.9);
      doctorDesk(group, cx, r.z2 - 1.4, 0, 1.6);
      monitor(group, cx, r.z2 - 1.45, 0);
      chair(group, cx, r.z2 - 0.6, Math.PI, 0x5a7ab8);
      chair(group, cx, r.z2 - 2.5, 0, 0x6a8aa8);
      makeBox(group, 0.35, 0.1, 0.35, 0xdddddd, r.x1 + 0.6, 0.05, r.z1 + 0.5);
      personDetailed(group, cx, r.z2 - 0.6, Math.PI, 'doctor');
      personDetailed(group, cx, r.z2 - 2.5, 0, 'patient');
    } else if (r.type === 'wc_hidden') {
      if (r.name.includes('МГН')) {
        toilet(group, r.x1 + 0.7, r.z2 - 1.0, 0);
        sink(group, r.x2 - 0.6, r.z1 + 0.7, Math.PI);
      } else {
        toilet(group, r.x1 + 0.7, r.z1 + 0.7, 0);
        toilet(group, r.x1 + 0.7, r.z2 - 0.7, 0);
        sink(group, r.x2 - 0.6, (r.z1+r.z2)/2, Math.PI/2);
      }
    }

    // подписи над комнатой
    if (!r.noLabel) makeRoomLabel(group, r);
  });

  // достройка стен прививочного + кассы
  makeWall(group, 6.5, 0.5, 10.5, 0.5);
  makeWall(group, 10.5, 0.5, 10.5, 7.0);
  makeWall(group, 10.5, 7.0, 9.0, 7.0);
  makeWall(group, 9.0, 7.0, 6.5, 7.0);
  makeWall(group, 6.5, 7.0, 6.5, 0.5);
  makeWall(group, 9.0, 4.5, 9.0, 7.0);
  makeWall(group, 9.0, 4.5, 10.5, 4.5);

  // стена холл/коридор + аквариум
  makeWall(group, 10.5, 7.5, 14.0, 7.5);
  aquarium(group, 12.25, 1.6, 7.80, 2.6, 1.0, 0.40, 0);

  // правый блок
  makeWall(group, 19.5, 0.5, 23.0, 0.5);
  makeWall(group, 23.0, 0.5, 23.0, 7.5);
  makeWall(group, 23.0, 7.5, 19.5, 7.5);
  makeWall(group, 19.5, 5.9, 23.0, 5.9);
  railing(group, 19.6, 3.3, 22.9, 3.3, 0.9, 0.0);

  // блок санузлов
  makeWall(group, 22.5, 10.5, 24.5, 10.5);
  makeWall(group, 24.5, 10.5, 24.5, 14.5);
  makeWall(group, 24.5, 14.5, 22.5, 14.5);
  makeWall(group, 22.5, 14.5, 22.5, 10.5);

  // двери
  makeDoor(group, 12.4, 0.05, 0, 'glass');
  makeDoor(group, 14.2, 0.05, 0, 'glass');
  makeDoor(group, 3.0, 7.0, 0, 'glass_insert');
  makeDoor(group, 7.5, 7.0, 0, 'glass_insert');
  makeDoor(group, 9.75, 7.0, 0, 'glass_insert');
  makeDoor(group, 20.5, 6.75, Math.PI/2, 'glass_insert');
  makeDoor(group, 23.2, 10.5, 0, 'glass_insert');
  makeDoor(group, 24.0, 10.5, 0, 'glass_insert');
  ROOMS.forEach(r => {
    if (r.type === 'doctor') makeDoor(group, (r.x1 + r.x2)/2, r.z1, 0, 'glass_insert');
  });

  // таблички
  makeDoorSign(group, 'ВХОД|ВХОД', 12.4, 0.4);
  makeDoorSign(group, 'ВХОД|ВХОД', 14.2, 0.4);
  makeDoorSign(group, 'Сестринский', 3.0, 6.6);
  makeDoorSign(group, 'Прививочный', 7.5, 6.6);
  makeDoorSign(group, 'Касса', 9.75, 6.6);
  makeDoorSign(group, 'Семейный|врач №9',  (0.5+4.4)/2, 10.1);
  makeDoorSign(group, 'Семейный|врач №7',  (4.6+8.1)/2, 10.1);
  makeDoorSign(group, 'Семейный|врач №10', (8.3+10.9)/2, 10.1);
  makeDoorSign(group, 'Семейный|врач №12', (11.1+15.0)/2, 10.1);
  makeDoorSign(group, 'Семейный|врач №15', (15.2+18.6)/2, 10.1);
  makeDoorSign(group, 'Семейный|врач №14', (18.8+22.2)/2, 10.1);
  makeDoorSign(group, 'Санузел|МГН', 23.2, 10.1);
  makeDoorSign(group, 'М/Ж|туалеты', 24.0, 10.1);
  makeDoorSign(group, 'ЛИФТ', 20.0, 6.75);
  makeDoorSign(group, 'Вверх ↑', 20.5, 3.0);
  makeDoorSign(group, 'Вниз ↓', 21.5, 3.55);

  // окна
  makeWindow(group, 1.5, 0.5, 4.5, 0.5);
  makeWindow(group, 7.0, 0.5, 9.5, 0.5);
  makeWindow(group, 20.0, 0.5, 22.6, 0.5);
  makeWindow(group, 0.5, 1.8, 0.5, 4.2);
  makeWindow(group, 0.5, 11.5, 0.5, 13.8);
  makeWindow(group, 1.0, 14.5, 3.8, 14.5);
  makeWindow(group, 5.0, 14.5, 7.7, 14.5);
  makeWindow(group, 8.5, 14.5, 10.5, 14.5);
  makeWindow(group, 11.5, 14.5, 14.6, 14.5);
  makeWindow(group, 15.5, 14.5, 18.2, 14.5);
  makeWindow(group, 19.0, 14.5, 22.0, 14.5);
  makeWindow(group, 24.5, 10.8, 24.5, 12.2);
  makeWindow(group, 24.5, 12.9, 24.5, 14.3);

  /* ---------- ДЕКОР ---------- */
  // Дозаторы антисептика у входа
  sanitizerDispenser(group, 11.8, 1.2, 0.55, 0);
  sanitizerDispenser(group, 14.8, 1.2, 0.55, 0);

  // Коврик у входа
  entranceMat(group, 13.3, 1.6, 2.6, 1.4, 0);

  // Часы в холле — на северной стене
  wallClock(group, 17.5, 2.1, 0.55, 0);

  // Огнетушитель в коридоре
  fireExtinguisher(group, 1.2, 10.2, 0);

  // Информационный стенд в холле
  infoStand(group, 12.5, 6.8, Math.PI);

  return { group, roomFloors };
}

/* вспомогательные */
function makeBox(group, w, h, d, color, x, y, z, rotY = 0, rough = 0.7) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: rough })
  );
  m.position.set(x, y, z); m.rotation.y = rotY;
  m.castShadow = true; m.receiveShadow = true;
  m.userData.isFurniture = true;
  group.add(m);
  return m;
}

function makeBoxLike(group, x, z) {
  makeBox(group, 0.7, 0.06, 1.1, 0xe8dcc8, x, 0.75, z, 0, 0.4);
  makeBox(group, 0.65, 0.72, 0.06, 0xc8b89a, x, 0.37, z - 0.52);
  makeBox(group, 0.65, 0.72, 0.06, 0xc8b89a, x, 0.37, z + 0.52);
}

function makeRoomLabel(group, r) {
  const cx = (r.x1 + r.x2)/2, cz = (r.z1 + r.z2)/2;
  const cvs = document.createElement('canvas');
  cvs.width = 640; cvs.height = 160;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.fillRect(0, 0, 640, 160);
  ctx.strokeStyle = '#1a5490';
  ctx.lineWidth = 5;
  ctx.strokeRect(3, 3, 634, 154);
  ctx.fillStyle = '#0f2a4a';
  ctx.font = 'bold 54px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const line1 = r.num ? ('№ ' + r.num) : r.name;
  const line2 = r.num ? (r.name) : (r.area ? (r.area + ' м²') : '');
  ctx.fillText(line1, 320, 55);
  ctx.font = '40px Segoe UI, sans-serif';
  ctx.fillStyle = '#3a5a7a';
  ctx.fillText(line2 + (r.num ? ' · ' + r.area + ' м²' : ''), 320, 115);
  const tex = new THREE.CanvasTexture(cvs);
  tex.minFilter = THREE.LinearFilter;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sprite.scale.set(2.4, 0.6, 1);
  sprite.position.set(cx, WALL_H + 0.55, cz);
  group.add(sprite);
}