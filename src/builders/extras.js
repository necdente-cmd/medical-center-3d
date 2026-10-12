import * as THREE from 'three';

/* Дозатор антисептика на стене */
export function sanitizerDispenser(group, x, y, z, rotY = 0) {
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.22, 0.10),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 })
  );
  g.add(body);

  const btn = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.03, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x2a7acc, roughness: 0.4 })
  );
  btn.position.set(0, -0.05, 0.06);
  g.add(btn);

  const nozzle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.04, 8),
    new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.3 })
  );
  nozzle.position.set(0, -0.09, 0.06);
  g.add(nozzle);

  g.position.set(x, y, z);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
}

/* Коврик у входа */
export function entranceMat(group, cx, cz, w = 1.8, d = 1.2, rotY = 0) {
  const mat = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.015, d),
    new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.95 })
  );
  mat.position.set(cx, 0.03, cz);
  mat.rotation.y = rotY;
  mat.receiveShadow = true;
  mat.userData.isFurniture = true;
  group.add(mat);

  for (let i = -1; i <= 1; i++) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.9, 0.005, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.9 })
    );
    stripe.position.set(cx + i * 0.15, 0.04, cz);
    stripe.rotation.y = rotY;
    stripe.userData.isFurniture = true;
    group.add(stripe);
  }
}

/* Часы на стене */
export function wallClock(group, x, y, z, rotY = 0) {
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  );
  body.rotation.x = Math.PI / 2;
  g.add(body);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.015, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 })
  );
  g.add(ring);

  const hourHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.10, 0.01),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  hourHand.position.set(0, 0.04, 0.03);
  g.add(hourHand);

  const minHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.015, 0.14, 0.01),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  minHand.position.set(0.03, 0.05, 0.03);
  minHand.rotation.z = -Math.PI / 3;
  g.add(minHand);

  g.position.set(x, y, z);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
}

/* Огнетушитель */
export function fireExtinguisher(group, x, z, rotY = 0) {
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.5, 16),
    new THREE.MeshStandardMaterial({ color: 0xc82020, roughness: 0.5, metalness: 0.2 })
  );
  body.position.y = 0.25;
  g.add(body);

  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.09, 0.08, 16),
    new THREE.MeshStandardMaterial({ color: 0xc82020, roughness: 0.5 })
  );
  top.position.y = 0.54;
  g.add(top);

  const handle = new THREE.Mesh(
    new THREE.BoxGeometry(0.10, 0.04, 0.03),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.5, roughness: 0.3 })
  );
  handle.position.set(0, 0.60, 0);
  g.add(handle);

  const hose = new THREE.Mesh(
    new THREE.TorusGeometry(0.08, 0.012, 6, 12, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7 })
  );
  hose.position.set(0, 0.42, 0.10);
  hose.rotation.x = Math.PI / 2;
  g.add(hose);

  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
}

/* Информационный стенд */
export function infoStand(group, x, z, rotY = 0) {
  const g = new THREE.Group();

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.04, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5 })
  );
  base.position.y = 0.02;
  g.add(base);

  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1.6, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 })
  );
  panel.position.y = 0.82;
  g.add(panel);

  const holder = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.06, 0.15),
    new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.4 })
  );
  holder.position.set(0, 1.65, 0.05);
  g.add(holder);

  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
}