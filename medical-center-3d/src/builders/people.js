import * as THREE from 'three';

export function personDetailed(group, x, z, rotY = 0, type = 'patient', options = {}) {
  const g = new THREE.Group();

  const skinTones = [0xf0c8a0, 0xe8b890, 0xd8a888, 0xc89878, 0xf8d8b8];
  const hairColors = [0x2a1a0a, 0x1a1a1a, 0x4a3020, 0x6a4a30, 0x8a6a4a, 0xc8a888];
  const nurseClothes = [0x7a9ec8, 0x9ab8d8, 0x88a8c8];
  const doctorClothes = [0xffffff, 0xf8f8f8, 0xf0f0f0];
  const patientClothes = [0x4a6b8a, 0x8a5a4a, 0x6a8a5a, 0x8a7a4a, 0x6a5a8a, 0x4a7a7a, 0x9a6a6a];

  let clothColor, hairColor, skin, hasFolder = false;

  if (type === 'doctor') {
    clothColor = doctorClothes[Math.floor(Math.random()*doctorClothes.length)];
    hasFolder = true;
  } else if (type === 'nurse' || type === 'receptionist') {
    clothColor = nurseClothes[Math.floor(Math.random()*nurseClothes.length)];
  } else {
    clothColor = patientClothes[Math.floor(Math.random()*patientClothes.length)];
  }
  hairColor = hairColors[Math.floor(Math.random()*hairColors.length)];
  skin = skinTones[Math.floor(Math.random()*skinTones.length)];

  if (options.clothColor) clothColor = options.clothColor;
  if (options.hairColor) hairColor = options.hairColor;
  if (options.skin) skin = options.skin;

  const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.75 });
  const clothMat = new THREE.MeshStandardMaterial({ color: clothColor, roughness: 0.85 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });

  // Торс
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.24, 0.65, 12), clothMat);
  torso.position.y = 0.95; torso.castShadow = true; g.add(torso);

  // Бёдра
  const hips = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.15, 12), clothMat);
  hips.position.y = 0.58; hips.castShadow = true; g.add(hips);

  // Ноги
  const legColor = type === 'doctor' ? 0x4a4a5a :
                   (type === 'nurse' || type === 'receptionist') ? 0x5a6a8a : 0x3a3a4a;
  const legMat = new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.85 });

  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.55, 8), legMat);
    leg.position.set(side * 0.09, 0.28, 0);
    leg.castShadow = true; g.add(leg);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9 }));
    foot.position.set(side * 0.09, 0.03, 0.04);
    foot.castShadow = true; g.add(foot);
  }

  // Руки
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), clothMat);
    shoulder.position.set(side * 0.24, 1.18, 0);
    shoulder.castShadow = true; g.add(shoulder);

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.55, 8), clothMat);
    arm.position.set(side * 0.24, 0.88, 0);
    arm.castShadow = true; g.add(arm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), skinMat);
    hand.position.set(side * 0.24, 0.58, 0);
    hand.castShadow = true; g.add(hand);
  }

  // Шея
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.10, 8), skinMat);
  neck.position.y = 1.32; neck.castShadow = true; g.add(neck);

  // Голова
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), skinMat);
  head.position.y = 1.48;
  head.scale.set(1, 1.05, 1);
  head.castShadow = true; g.add(head);

  // Волосы
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.135, 14, 12, 0, Math.PI*2, 0, Math.PI/2),
    hairMat
  );
  hair.position.y = 1.50;
  hair.castShadow = true; g.add(hair);

  // Длинные волосы
  if (Math.random() > 0.5 && (type === 'nurse' || type === 'receptionist' || type === 'patient' || type === 'visitor')) {
    const longHair = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.25, 12, 1, true),
      hairMat
    );
    longHair.position.y = 1.38;
    longHair.castShadow = true; g.add(longHair);
  }

  // Глаза
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3 });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), eyeMat);
    eye.position.set(side * 0.05, 1.48, 0.12);
    g.add(eye);
  }

  // Халат врача
  if (type === 'doctor') {
    const gown = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.28, 0.75, 12, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide })
    );
    gown.position.y = 0.95;
    gown.castShadow = true; g.add(gown);
  }

  // Папка
  if (hasFolder) {
    const folder = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.25, 0.03),
      new THREE.MeshStandardMaterial({ color: 0xc8a878, roughness: 0.7 })
    );
    folder.position.set(0.28, 0.70, 0.05);
    folder.rotation.z = 0.2;
    folder.castShadow = true; g.add(folder);
  }

  // Стетоскоп
  if (type === 'doctor') {
    const steth = new THREE.Mesh(
      new THREE.TorusGeometry(0.10, 0.012, 6, 12, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.3 })
    );
    steth.position.set(0, 1.25, 0.06);
    steth.rotation.x = Math.PI/2;
    g.add(steth);
  }

  // Сумка
  if ((type === 'patient' || type === 'visitor') && Math.random() > 0.6) {
    const bag = new THREE.Mesh(
      new THREE.BoxGeometry(0.20, 0.15, 0.10),
      new THREE.MeshStandardMaterial({ color: 0x5a3a2a, roughness: 0.85 })
    );
    bag.position.set(0.25, 0.55, 0);
    bag.castShadow = true; g.add(bag);
  }

  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.userData.isFurniture = true;
  group.add(g);
  return g;
}