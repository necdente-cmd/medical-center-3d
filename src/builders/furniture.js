import { makeBox, makeCylinder } from '../materials.js';

export function medicalCouch(g, x, z, rotY = 0) {
  makeBox(g, 1.9, 0.08, 0.7, 0xffffff, x, 0.72, z, rotY, 0.5);
  makeBox(g, 1.9, 0.5, 0.7, 0xe8eef2, x, 0.42, z, rotY, 0.6);
  makeBox(g, 0.5, 0.7, 0.6, 0xd8dde2, x - 0.75*Math.cos(rotY), 0.35, z + 0.75*Math.sin(rotY), rotY, 0.6);
  const px = x + Math.cos(rotY)*0.75, pz = z - Math.sin(rotY)*0.75;
  makeBox(g, 0.5, 0.1, 0.5, 0xf8fbfd, px, 0.82, pz, rotY, 0.4);
}

export function doctorDesk(g, x, z, rotY = 0, w = 1.6) {
  makeBox(g, w, 0.06, 0.7, 0xd9b896, x, 0.75, z, rotY, 0.4);
  makeBox(g, 0.08, 0.72, 0.65, 0xb88a5c, x - (w/2 - 0.04)*Math.cos(rotY), 0.37, z + (w/2 - 0.04)*Math.sin(rotY), rotY);
  makeBox(g, 0.08, 0.72, 0.65, 0xb88a5c, x + (w/2 - 0.04)*Math.cos(rotY), 0.37, z - (w/2 - 0.04)*Math.sin(rotY), rotY);
}

export function monitor(g, x, z, rotY = 0) {
  makeBox(g, 0.5, 0.32, 0.04, 0x1a1a20, x, 1.0, z, rotY);
  makeBox(g, 0.12, 0.1, 0.12, 0x333333, x, 0.85, z, rotY);
}

export function chair(g, x, z, rotY = 0, color = 0x4a6b8a) {
  makeBox(g, 0.45, 0.06, 0.45, color, x, 0.45, z, rotY);
  makeBox(g, 0.45, 0.6, 0.06, color, x + Math.sin(rotY)*0.22, 0.75, z + Math.cos(rotY)*0.22, rotY);
  for (const dx of [-0.18, 0.18]) for (const dz of [-0.18, 0.18]) {
    const lx = x + dx*Math.cos(rotY) - dz*Math.sin(rotY);
    const lz = z + dx*Math.sin(rotY) + dz*Math.cos(rotY);
    makeCylinder(g, 0.02, 0.02, 0.45, 0x333333, lx, 0.22, lz);
  }
}

export function cabinet(g, x, z, rotY = 0, w = 1.0, h = 1.8) {
  makeBox(g, w, h, 0.45, 0xeae4d8, x, h/2, z, rotY, 0.55);
}

export function sink(g, x, z, rotY = 0) {
  makeBox(g, 0.5, 0.15, 0.4, 0xffffff, x, 0.85, z, rotY, 0.3);
  makeCylinder(g, 0.03, 0.03, 0.25, 0xaaaaaa, x + Math.sin(rotY)*0.15, 1.05, z + Math.cos(rotY)*0.15);
}

export function plant(g, x, z) {
  makeCylinder(g, 0.18, 0.14, 0.32, 0x9c6b3f, x, 0.16, z);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x4d8a4a, roughness: 0.85 });
  for (let i = 0; i < 5; i++) {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 5), leafMat);
    l.position.set(x + (Math.random()-0.5)*0.3, 0.55 + i*0.08, z + (Math.random()-0.5)*0.3);
    l.castShadow = true;
    g.add(l);
  }
}

export function fridge(g, x, z, rotY = 0) {
  makeBox(g, 0.6, 1.6, 0.55, 0xf0f0f0, x, 0.8, z, rotY, 0.4);
  makeBox(g, 0.55, 0.02, 0.02, 0x555555, x + Math.sin(rotY)*0.3, 1.1, z + Math.cos(rotY)*0.3, rotY);
}

export function toilet(g, x, z, rotY = 0) {
  makeBox(g, 0.4, 0.4, 0.6, 0xffffff, x, 0.2, z, rotY, 0.3);
  makeBox(g, 0.4, 0.5, 0.15, 0xffffff, x + Math.sin(rotY)*0.35, 0.55, z + Math.cos(rotY)*0.35, rotY, 0.3);
}

// Экспорт THREE нужен для plant
import * as THREE from 'three';