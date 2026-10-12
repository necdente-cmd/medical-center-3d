export class FloorManager {
  constructor(scene) {
    this.scene = scene;
    this.floors = {};        // { 'basement': {group, data}, '1': {...}, ... }
    this.current = null;
  }

  registerFloor(id, floorData) {
    this.floors[id] = floorData;
    this.scene.add(floorData.group);
    floorData.group.visible = false;
  }

  showFloor(id) {
    if (this.current) this.floors[this.current].group.visible = false;
    this.floors[id].group.visible = true;
    this.current = id;
  }

  getCurrent() { return this.floors[this.current]; }
}