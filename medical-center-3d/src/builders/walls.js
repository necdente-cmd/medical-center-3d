import * as THREE from 'three';
import { wallMat } from '../materials.js';

export const WALL_H = 2.8;
export const WALL_T = 0.10;

export function makeWall(group, x1, z1, x2, z2, h = WALL_H) {
  const len = Math.hypot(x2-x1, z2-z1);
  const w = new THREE.Mesh(new THREE.BoxGeometry(len, h, WALL_T), wallMat.clone());
  w.position.set((x1+x2)/2, h/2, (z1+z2)/2);
  w.rotation.y = -Math.atan2(z2-z1, x2-x1);
  w.castShadow = true; w.receiveShadow = true;
  w.userData.isWall = true;
  group.add(w);
  return w;
}

export function makeRoomWalls(group, r) {
  makeWall(group, r.x1, r.z1, r.x2, r.z1);
  makeWall(group, r.x2, r.z1, r.x2, r.z2);
  makeWall(group, r.x2, r.z2, r.x1, r.z2);
  makeWall(group, r.x1, r.z2, r.x1, r.z1);
}