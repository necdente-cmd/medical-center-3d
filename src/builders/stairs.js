import * as THREE from 'three';
import { railMat } from '../materials.js';

export function railing(group, x1, z1, x2, z2, h = 0.9, yBase = 0) {
  const len = Math.hypot(x2-x1, z2-z1);
  const angle = -Math.atan2(z2-z1, x2-x1);
  const top = new THREE.Mesh(new THREE.BoxGeometry(len, 0.05, 0.05), railMat);
  top.position.set((x1+x2)/2, yBase + h, (z1+z2)/2);
  top.rotation.y = angle;
  top.castShadow = true;
  group.add(top);

  const n = Math.max(2, Math.round(len / 0.8));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const px = x1 + (x2-x1)*t;
    const pz = z1 + (z2-z1)*t;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, h, 0.04), railMat);
    post.position.set(px, yBase + h/2, pz);
    post.castShadow = true;
    group.add(post);
  }
}

export function buildStairsUp(group, r) {
  const cz = (r.z1 + r.z2) / 2;
  const stepW = 0.28, stepH = 0.16, stepD = 1.8;
  const startX = r.x1 + 0.35;
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(stepW, stepH, stepD),
      new THREE.MeshStandardMaterial({ color: 0xe0c8e0, roughness: 0.7 })
    );
    step.position.set(startX + i*stepW + stepW/2, stepH/2 + i*stepH, cz);
    step.castShadow = true; step.receiveShadow = true;
    step.userData.isFurniture = true;
    group.add(step);
  }
  const platform = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, stepH*(steps+1), stepD),
    new THREE.MeshStandardMaterial({ color: 0xc8bcd8, roughness: 0.7 })
  );
  platform.position.set(r.x2 - 0.3, stepH*(steps+1)/2, cz);
  platform.userData.isFurniture = true;
  group.add(platform);

  railing(group, startX, cz - stepD/2 - 0.06, r.x2 - 0.05, cz - stepD/2 - 0.06, 0.9, 1.6);
  railing(group, startX, cz + stepD/2 + 0.06, r.x2 - 0.05, cz + stepD/2 + 0.06, 0.9, 1.6);
}

export function buildStairsDown(group, r) {
  const cz = (r.z1 + r.z2) / 2;
  const cx = (r.x1 + r.x2) / 2;
  const stepW = 0.28, stepH = 0.16, stepD = 1.8;
  const startX = r.x1 + 0.35;

  const shaft = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, stepD + 0.3),
    new THREE.MeshStandardMaterial({ color: 0x1a1a20, roughness: 0.95 })
  );
  shaft.rotation.x = -Math.PI/2;
  shaft.position.set(cx + 0.1, 0.015, cz);
  shaft.userData.isFurniture = true;
  group.add(shaft);

  for (let i = 0; i < 8; i++) {
    const y = 0.08 - i * stepH;
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(stepW, stepH, stepD),
      new THREE.MeshStandardMaterial({ color: 0xb8a0c8, roughness: 0.65 })
    );
    step.position.set(startX + i*stepW + stepW/2, y, cz);
    step.castShadow = true; step.receiveShadow = true;
    step.userData.isFurniture = true;
    group.add(step);
  }
  railing(group, startX, cz - stepD/2 - 0.06, r.x2 - 0.05, cz - stepD/2 - 0.06, 0.9, 0.9);
  railing(group, startX, cz + stepD/2 + 0.06, r.x2 - 0.05, cz + stepD/2 + 0.06, 0.9, 0.9);
}