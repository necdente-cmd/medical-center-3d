import * as THREE from 'three';

export function getBasementData() {
  return {
    legend: [['#cccccc', 'Цоколь в разработке']],
    rooms: [],
    cameraTarget: { x: 12.5, y: 0, z: 7.5 }
  };
}

export function buildBasement() {
  const group = new THREE.Group();
  group.userData.floorId = 'basement';
  return { group, roomFloors: [] };
}