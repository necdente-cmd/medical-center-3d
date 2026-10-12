import * as THREE from 'three';

export function getFloor2Data() {
  return {
    legend: [['#cccccc', '2 этаж в разработке']],
    rooms: [],
    cameraTarget: { x: 12.5, y: 0, z: 7.5 }
  };
}

export function buildFloor2() {
  const group = new THREE.Group();
  group.userData.floorId = '2';
  return { group, roomFloors: [] };
}