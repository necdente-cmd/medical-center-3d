import * as THREE from 'three';
import { doorMat, doorGlassMat, frameMat } from '../materials.js';

export function makeDoor(group, cx, cz, rotY = 0, type = 'wood') {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.15, 0.12), frameMat);
  frame.position.y = 1.075; g.add(frame);

  if (type === 'glass') {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.0, 0.03), doorGlassMat);
    panel.position.set(0, 1.0, 0.07);
    g.add(panel);
    for (const y of [0.4, 1.0, 1.6]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.05), frameMat);
      bar.position.set(0, y, 0.07);
      g.add(bar);
    }
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.3 })
    );
    handle.position.set(0.35, 1.0, 0.12);
    g.add(handle);
  } else if (type === 'glass_insert') {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.0, 0.04), doorMat);
    panel.position.set(0, 1.0, 0.07);
    g.add(panel);
    const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.05), doorGlassMat);
    glassPanel.position.set(0, 1.5, 0.08);
    g.add(glassPanel);
  } else {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.0, 0.05), doorMat);
    panel.position.set(0, 1.0, 0.07);
    g.add(panel);
  }

  g.position.set(cx, 0, cz);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
}