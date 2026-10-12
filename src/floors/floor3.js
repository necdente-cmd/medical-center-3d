import * as THREE from 'three';

export function getFloor3Data() {
  return {
    legend: [['#cccccc', '3 этаж в разработке']],
    rooms: [],
    cameraTarget: { x: 12.5, y: 0, z: 7.5 }
  };
}

export function buildFloor3() {
  const group = new THREE.Group();
  group.userData.floorId = '3';
  return { group, roomFloors: [] };
}