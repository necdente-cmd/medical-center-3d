import * as THREE from 'three';
import { glassMat, frameMat } from '../materials.js';

export function makeWindow(group, x1, z1, x2, z2, sill = 0.9, top = 2.4) {
  const len = Math.hypot(x2-x1, z2-z1);
  const h = top - sill;
  const angle = -Math.atan2(z2-z1, x2-x1);
  const cx = (x1+x2)/2, cz = (z1+z2)/2;

  const w = new THREE.Mesh(new THREE.BoxGeometry(len, h, 0.04), glassMat);
  w.position.set(cx, sill + h/2, cz);
  w.rotation.y = angle;
  group.add(w);

  for (const y of [sill, top]) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(len, 0.08, 0.12), frameMat);
    f.position.set(cx, y, cz);
    f.rotation.y = angle;
    group.add(f);
  }
  const mid = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, 0.12), frameMat);
  mid.position.set(cx, sill + h/2, cz);
  mid.rotation.y = angle;
  group.add(mid);

  for (const side of [-1, 1]) {
    const off = side * (len/2 - 0.03);
    const px = cx + off * Math.cos(angle);
    const pz = cz + off * Math.sin(angle);
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, 0.12), frameMat);
    s.position.set(px, sill + h/2, pz);
    s.rotation.y = angle;
    group.add(s);
  }
}