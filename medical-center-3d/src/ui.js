import * as THREE from 'three';

export function initUI({ camera, controls, renderer, scene, floorManager, floorsData }) {

  const btnWalls = document.getElementById('btnWalls');
  const btnTop   = document.getElementById('btnTop');
  const btnIso   = document.getElementById('btnIso');
  const btnFurn  = document.getElementById('btnFurniture');
  const btnReset = document.getElementById('btnReset');
  const legend   = document.getElementById('legend');
  const tooltip  = document.getElementById('tooltip');

  let wallsTransparent = false;
  let furnitureVisible = true;

  /* Переключение этажей */
  document.querySelectorAll('#floorSelector .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const floorId = btn.dataset.floor;
      floorManager.showFloor(floorId);
      document.querySelectorAll('#floorSelector .btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateLegend(floorsData[floorId].legend);
    });
  });

  /* Прозрачные стены */
  btnWalls.addEventListener('click', () => {
    wallsTransparent = !wallsTransparent;
    btnWalls.classList.toggle('active', wallsTransparent);
    const floor = floorManager.getCurrent();
    floor.group.traverse(obj => {
      if (obj.userData.isWall) {
        obj.material.opacity = wallsTransparent ? 0.15 : 1;
        obj.material.depthWrite = !wallsTransparent;
      }
    });
  });

  /* Мебель */
  btnFurn.classList.add('active');
  btnFurn.addEventListener('click', () => {
    furnitureVisible = !furnitureVisible;
    btnFurn.classList.toggle('active', furnitureVisible);
    const floor = floorManager.getCurrent();
    floor.group.traverse(obj => {
      if (obj.userData.isFurniture) obj.visible = furnitureVisible;
    });
  });

  /* Камера */
  function animateCamera(toPos, toTarget) {
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const t0 = performance.now();
    const dur = 700;
    function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      const e = k < 0.5 ? 2*k*k : -1 + (4 - 2*k)*k;
      camera.position.lerpVectors(startPos, toPos, e);
      controls.target.lerpVectors(startTarget, toTarget, e);
      controls.update();
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  btnTop.addEventListener('click', () => {
    animateCamera(new THREE.Vector3(12.5, 38, 7.6), new THREE.Vector3(12.5, 0, 7.5));
  });
  btnIso.addEventListener('click', () => {
    animateCamera(new THREE.Vector3(30, 26, 34), new THREE.Vector3(12.5, 0, 7.5));
  });
  btnReset.addEventListener('click', () => {
    wallsTransparent = false;
    btnWalls.classList.remove('active');
    const floor = floorManager.getCurrent();
    floor.group.traverse(obj => {
      if (obj.userData.isWall) {
        obj.material.opacity = 1;
        obj.material.depthWrite = true;
      }
    });
    furnitureVisible = true;
    btnFurn.classList.add('active');
    floor.group.traverse(obj => {
      if (obj.userData.isFurniture) obj.visible = true;
    });
    animateCamera(new THREE.Vector3(30, 26, 34), new THREE.Vector3(12.5, 0, 7.5));
  });

  /* Tooltip — hover */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  renderer.domElement.addEventListener('pointermove', e => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const floor = floorManager.getCurrent();
    const floors = [];
    floor.group.traverse(obj => {
      if (obj.userData.isFloor) floors.push(obj);
    });

    const hits = raycaster.intersectObjects(floors);
    if (hits.length) {
      tooltip.style.display = 'block';
      tooltip.style.left = (e.clientX + 16) + 'px';
      tooltip.style.top  = (e.clientY + 16) + 'px';
      tooltip.textContent = hits[0].object.userData.name;
      document.body.style.cursor = 'pointer';
    } else {
      tooltip.style.display = 'none';
      document.body.style.cursor = 'default';
    }
  });

  /* Легенда */
  updateLegend(floorsData['1'].legend);

  function updateLegend(items) {
    if (!items) { legend.innerHTML = ''; return; }
    legend.innerHTML = items.map(([color, label]) =>
      `<span class="sw" style="background:${color}"></span>${label}`
    ).join('<br>');
  }
}