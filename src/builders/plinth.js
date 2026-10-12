import * as THREE from 'three';

/* Плинтус по низу стен — тонкая тёмная полоса */
export function buildPlinth(group, x1, x2, z1, z2, height = 0.10, color = 0x3a3a42) {
  const wallT = 0.10;
  const h = height;
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });

  // Север
  const n = new THREE.Mesh(new THREE.BoxGeometry(x2 - x1, h, wallT * 0.55), mat);
  n.position.set((x1 + x2) / 2, h / 2, z1 + wallT * 0.28);
  n.userData.isFurniture = true;
  group.add(n);

  // Юг
  const s = new THREE.Mesh(new THREE.BoxGeometry(x2 - x1, h, wallT * 0.55), mat);
  s.position.set((x1 + x2) / 2, h / 2, z2 - wallT * 0.28);
  s.userData.isFurniture = true;
  group.add(s);

  // Запад
  const w = new THREE.Mesh(new THREE.BoxGeometry(wallT * 0.55, h, z2 - z1), mat);
  w.position.set(x1 + wallT * 0.28, h / 2, (z1 + z2) / 2);
  w.userData.isFurniture = true;
  group.add(w);

  // Восток
  const e = new THREE.Mesh(new THREE.BoxGeometry(wallT * 0.55, h, z2 - z1), mat);
  e.position.set(x2 - wallT * 0.28, h / 2, (z1 + z2) / 2);
  e.userData.isFurniture = true;
  group.add(e);
}