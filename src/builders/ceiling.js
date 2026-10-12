import * as THREE from 'three';

/* Потолок со встроенными LED-светильниками */
export function buildCeiling(group, x1, x2, z1, z2, height = 2.8, opts = {}) {
  const w = x2 - x1, d = z2 - z1;
  const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;

  // Потолочная плита
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(w - 0.02, d - 0.02),
    new THREE.MeshStandardMaterial({
      color: 0xf6f7f8,
      roughness: 0.92,
      side: THREE.DoubleSide
    })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(cx, height - 0.02, cz);
  ceiling.receiveShadow = true;
  ceiling.userData.isFurniture = true;
  group.add(ceiling);

  // Раскладка LED-панелей
  const lightRows = opts.lightRows || Math.max(1, Math.round(d / 3));
  const lightCols = opts.lightCols || Math.max(1, Math.round(w / 3.5));
  const stepX = w / (lightCols + 1);
  const stepZ = d / (lightRows + 1);

  for (let i = 1; i <= lightCols; i++) {
    for (let j = 1; j <= lightRows; j++) {
      const px = x1 + i * stepX;
      const pz = z1 + j * stepZ;

      // Светящаяся панель
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.04, 0.7),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xfffce0,
          emissiveIntensity: 1.0,
          roughness: 0.3
        })
      );
      panel.position.set(px, height - 0.05, pz);
      panel.userData.isFurniture = true;
      group.add(panel);

      // Рамка светильника
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.78, 0.02, 0.78),
        new THREE.MeshStandardMaterial({ color: 0xc8c8c8, roughness: 0.5 })
      );
      frame.position.set(px, height - 0.025, pz);
      frame.userData.isFurniture = true;
      group.add(frame);
    }
  }
}