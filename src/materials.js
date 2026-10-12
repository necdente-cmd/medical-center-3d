import * as THREE from 'three';

export const wallMat = new THREE.MeshStandardMaterial({
  color: 0xf2f4f6, roughness: 0.92, metalness: 0.02,
  transparent: true, opacity: 1
});

export const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xd4e8f2, transparent: true, opacity: 0.10,
  roughness: 0.02, metalness: 0.0, transmission: 0.98,
  thickness: 0.05, ior: 1.5, reflectivity: 0.15,
  clearcoat: 1.0, clearcoatRoughness: 0.02,
  side: THREE.DoubleSide, depthWrite: false
});

export const doorMat = new THREE.MeshStandardMaterial({
  color: 0xa0704a, roughness: 0.65
});

export const doorGlassMat = new THREE.MeshPhysicalMaterial({
  color: 0xe0eef4, transparent: true, opacity: 0.15,
  roughness: 0.02, metalness: 0, transmission: 0.96,
  thickness: 0.04, ior: 1.5, reflectivity: 0.12,
  clearcoat: 1.0, clearcoatRoughness: 0.02,
  side: THREE.DoubleSide, depthWrite: false
});

export const frameMat = new THREE.MeshStandardMaterial({
  color: 0xe8e8e8, roughness: 0.7
});

export const railMat = new THREE.MeshStandardMaterial({
  color: 0x8898a8, roughness: 0.4, metalness: 0.5
});

/* ---------- ЛИНОЛЕУМ (процедурная текстура) ---------- */
export function makeLinoleumTexture(baseColor = '#e8e0d0', accentColor = '#d8d0c0') {
  const cvs = document.createElement('canvas');
  cvs.width = 256; cvs.height = 256;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? accentColor : 'rgba(0,0,0,0.03)';
    const x = Math.random() * 256, y = Math.random() * 256, r = Math.random() * 1.5 + 0.3;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }
  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 256; i += 128) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

export const linoleumWhite = makeLinoleumTexture('#eae4d6', '#d8d0c0');
export const linoleumHall  = makeLinoleumTexture('#ece6d8', '#dcd4c4');
export const linoleumCorr  = makeLinoleumTexture('#e0d8c8', '#d0c8b8');
export const linoleumRoom  = makeLinoleumTexture('#e8eeea', '#d8e0dc');

/* ---------- УТИЛИТА: стандартный бокс ---------- */
export function makeBox(group, w, h, d, color, x, y, z, rotY = 0, rough = 0.7) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: rough })
  );
  m.position.set(x, y, z); m.rotation.y = rotY;
  m.castShadow = true; m.receiveShadow = true;
  group.add(m);
  return m;
}

export function makeCylinder(group, rt, rb, h, color, x, y, z) {
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(rt, rb, h, 16),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
  );
  m.position.set(x, y, z);
  m.castShadow = true;
  group.add(m);
  return m;
}