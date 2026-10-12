import * as THREE from 'three';

export function aquarium(group, cx, cy, cz, w, h, d, rotY = 0) {
  const g = new THREE.Group();
  const frameAqMat = new THREE.MeshStandardMaterial({ color: 0x2a2a30, roughness: 0.5, metalness: 0.3 });

  const topFrame = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), frameAqMat);
  topFrame.position.y = h/2; topFrame.castShadow = true; g.add(topFrame);
  const botFrame = new THREE.Mesh(new THREE.BoxGeometry(w, 0.10, d), frameAqMat);
  botFrame.position.y = -h/2; botFrame.castShadow = true; g.add(botFrame);

  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, 0.06), frameAqMat);
    v.position.set(sx * (w/2 - 0.03), 0, sz * (d/2 - 0.03));
    v.castShadow = true; g.add(v);
  }

  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x4aa8d0, transparent: true, opacity: 0.5,
    roughness: 0.05, metalness: 0, transmission: 0.6
  });
  g.add(new THREE.Mesh(new THREE.BoxGeometry(w - 0.1, h - 0.12, d - 0.1), waterMat));

  const sand = new THREE.Mesh(
    new THREE.BoxGeometry(w - 0.12, 0.08, d - 0.12),
    new THREE.MeshStandardMaterial({ color: 0xd4b888, roughness: 1 })
  );
  sand.position.y = -h/2 + 0.09; g.add(sand);

  for (let i = 0; i < 5; i++) {
    const plantH = 0.35 + Math.random()*0.35;
    const p = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, plantH, 6),
      new THREE.MeshStandardMaterial({ color: 0x3a8a3a, roughness: 0.9 })
    );
    p.position.set(-w/2 + 0.35 + i * (w - 0.7)/4, -h/2 + 0.1 + plantH/2, (Math.random()-0.5) * (d - 0.3));
    g.add(p);
  }

  const fishColors = [0xff8040, 0xffdd40, 0xff5566, 0x40a0ff, 0xc060ff];
  for (let i = 0; i < 5; i++) {
    const fish = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.09, 0.04),
      new THREE.MeshStandardMaterial({ color: fishColors[i], roughness: 0.6 })
    );
    const tail = new THREE.Mesh(
      new THREE.ConeGeometry(0.05, 0.08, 4),
      new THREE.MeshStandardMaterial({ color: fishColors[i], roughness: 0.6 })
    );
    tail.rotation.z = Math.PI/2;
    tail.position.x = -0.11;
    fish.add(body); fish.add(tail);
    fish.position.set(-w/2 + 0.5 + (i * (w - 1) / 4), -0.15 + (i % 3) * 0.18, (Math.random() - 0.5) * (d - 0.35));
    fish.rotation.y = (Math.random() - 0.5) * 0.6;
    g.add(fish);
  }

  const light = new THREE.Mesh(
    new THREE.BoxGeometry(w - 0.3, 0.03, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffaa, emissiveIntensity: 0.8 })
  );
  light.position.y = h/2 - 0.08;
  g.add(light);

  g.position.set(cx, cy, cz);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
}