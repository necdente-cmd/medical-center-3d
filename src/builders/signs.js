import * as THREE from 'three';

export function makeDoorSign(group, text, x, z, rotY = 0) {
  const cvs = document.createElement('canvas');
  cvs.width = 512; cvs.height = 128;
  const ctx = cvs.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = '#1a5490';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 504, 120);
  ctx.fillStyle = '#0f2a4a';
  ctx.font = 'bold 40px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lines = text.split('|');
  if (lines.length === 2) {
    ctx.fillText(lines[0], 256, 42);
    ctx.font = '34px Segoe UI, sans-serif';
    ctx.fillText(lines[1], 256, 88);
  } else {
    ctx.fillText(text, 256, 64);
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.minFilter = THREE.LinearFilter;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sprite.scale.set(1.4, 0.35, 1);
  sprite.position.set(x, 2.35, z);
  group.add(sprite);
}