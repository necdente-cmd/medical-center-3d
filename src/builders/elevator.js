import * as THREE from 'three';
import { makeBox } from '../materials.js';

export function buildElevator(group, r) {
  const cx = (r.x1 + r.x2) / 2;
  const cz = (r.z1 + r.z2) / 2;

  makeBox(group, r.x2-r.x1, 2.4, 0.08, 0xb8c0c8, cx, 1.20, r.z1 + 0.05, 0, 0.5);
  makeBox(group, r.x2-r.x1, 2.4, 0.08, 0xb8c0c8, cx, 1.20, r.z2 - 0.05, 0, 0.5);
  makeBox(group, 0.10, 2.4, 1.4, 0xb8c0c8, r.x2 - 0.05, 1.20, cz, 0, 0.5);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.6, 4),
    new THREE.MeshBasicMaterial({ color: 0x5a6a7a, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI/2; ring.rotation.z = Math.PI/4;
  ring.position.set(cx, 0.05, cz);
  ring.userData.isFurniture = true;
  group.add(ring);
  makeBox(group, 1.5, 0.02, 1.2, 0xb8c0c8, cx, 0.06, cz, 0, 0.3);
}