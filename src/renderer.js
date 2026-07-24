import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GRID_SIZE_X, GRID_SIZE_Y, GRID_SIZE_Z, BLOCK_SIZE } from './constants.js';

export class Renderer3D {
  constructor(containerEl) {
    this.container = containerEl;
    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.wireframeMode = false;

    // Shared Geometries (Optimization to prevent GC allocation overhead)
    this.blockGeo = new THREE.BoxGeometry(BLOCK_SIZE * 0.94, BLOCK_SIZE * 0.94, BLOCK_SIZE * 0.94);
    this.blockEdgesGeo = new THREE.EdgesGeometry(this.blockGeo);

    // Material Caches
    this.materialCache = new Map();
    this.ghostMaterialCache = new Map();
    this.outlineMaterial = new THREE.LineBasicMaterial({ color: 0x050508, linewidth: 2 });

    // Groups
    this.wellGroup = new THREE.Group();
    this.pieceGroup = new THREE.Group();
    this.ghostGroup = new THREE.Group();
    this.gridMeshGroup = new THREE.Group();
    this.particleGroup = new THREE.Group();
    this.speedLineGroup = new THREE.Group();

    this.particles = [];
    this.speedLines = [];

    // Screen Shake State
    this.shakeIntensity = 0;
    this.shakeDecay = 10.0;

    this.init();
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.resetCameraPosition();

    // WebGL Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ensure canvas replaces any previous renderer elements
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 50;
    this.controls.target.set(0, (GRID_SIZE_Y * BLOCK_SIZE) / 2, 0);
    this.controls.update();

    // Add Groups to Scene
    this.scene.add(this.wellGroup);
    this.scene.add(this.pieceGroup);
    this.scene.add(this.ghostGroup);
    this.scene.add(this.gridMeshGroup);
    this.scene.add(this.particleGroup);
    this.scene.add(this.speedLineGroup);

    // Lighting setup
    this.setupLighting();

    // Build Glass Container & Stage
    this.createGlassWell();

    // Window Resize Handler
    window.addEventListener('resize', () => this.onWindowResize());
  }

  resetCameraPosition() {
    this.camera.position.set(16, 20, 24);
    if (this.controls) {
      this.controls.target.set(0, (GRID_SIZE_Y * BLOCK_SIZE) / 2, 0);
      this.controls.update();
    }
  }

  setupLighting() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    // Main Spotlight (Electric Cyan)
    const spotLight = new THREE.SpotLight(0x00f0ff, 2.5);
    spotLight.position.set(15, 30, 20);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 60;
    this.scene.add(spotLight);

    // Secondary Rim Light (Neon Crimson)
    const rimLight = new THREE.PointLight(0xff2a5f, 2.0, 45);
    rimLight.position.set(-15, 10, -15);
    this.scene.add(rimLight);
  }

  createGlassWell() {
    const totalW = GRID_SIZE_X * BLOCK_SIZE;
    const totalH = GRID_SIZE_Y * BLOCK_SIZE;
    const totalD = GRID_SIZE_Z * BLOCK_SIZE;

    // Floor Base Mesh (Obsidian Black)
    const floorGeo = new THREE.BoxGeometry(totalW + 0.4, 0.4, totalD + 0.4);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090b14,
      roughness: 0.1,
      metalness: 0.8
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -0.2, 0);
    floorMesh.receiveShadow = true;
    this.wellGroup.add(floorMesh);

    // Floor Grid Wireframe (Electric Cyan)
    const floorGrid = new THREE.GridHelper(totalW, GRID_SIZE_X, 0x00f0ff, 0x162c4c);
    floorGrid.position.set(0, 0.01, 0);
    this.wellGroup.add(floorGrid);

    // Glass Bounding Box Walls
    const glassGeo = new THREE.BoxGeometry(totalW, totalH, totalD);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      side: THREE.BackSide
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.set(0, totalH / 2, 0);
    this.wellGroup.add(glassMesh);

    // Bounding Box Edges
    const edgesGeo = new THREE.EdgesGeometry(glassGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2, transparent: true, opacity: 0.4 });
    const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
    wireframe.position.set(0, totalH / 2, 0);
    this.wellGroup.add(wireframe);

    // Layer Horizontal Grid Lines
    for (let y = 1; y < GRID_SIZE_Y; y++) {
      const lineGeo = new THREE.BufferGeometry();
      const points = [
        new THREE.Vector3(-totalW / 2, y * BLOCK_SIZE, -totalD / 2),
        new THREE.Vector3(totalW / 2, y * BLOCK_SIZE, -totalD / 2),
        new THREE.Vector3(totalW / 2, y * BLOCK_SIZE, totalD / 2),
        new THREE.Vector3(-totalW / 2, y * BLOCK_SIZE, totalD / 2),
        new THREE.Vector3(-totalW / 2, y * BLOCK_SIZE, -totalD / 2)
      ];
      lineGeo.setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x162c4c, transparent: true, opacity: 0.2 });
      const layerLine = new THREE.Line(lineGeo, lineMat);
      this.wellGroup.add(layerLine);
    }
  }

  // Convert Grid [x, y, z] to World [X, Y, Z]
  gridToWorld(gx, gy, gz) {
    const wx = (gx - (GRID_SIZE_X - 1) / 2) * BLOCK_SIZE;
    const wy = (gy + 0.5) * BLOCK_SIZE;
    const wz = (gz - (GRID_SIZE_Z - 1) / 2) * BLOCK_SIZE;
    return new THREE.Vector3(wx, wy, wz);
  }

  // Get or Create Cached Block Material
  getBlockMaterial(colorHex, emissiveHex = 0x000000) {
    const key = `${colorHex}_${emissiveHex}_${this.wireframeMode}`;
    if (this.materialCache.has(key)) {
      return this.materialCache.get(key);
    }

    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: emissiveHex,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.7,
      wireframe: this.wireframeMode
    });
    this.materialCache.set(key, mat);
    return mat;
  }

  // Get or Create Ghost Wireframe Material
  getGhostMaterial(colorHex) {
    if (this.ghostMaterialCache.has(colorHex)) {
      return this.ghostMaterialCache.get(colorHex);
    }

    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.ghostMaterialCache.set(colorHex, mat);
    return mat;
  }

  // Create Cel-Shaded Toon Block Mesh with Shared Master Geometry
  createBlockMesh(colorHex, emissiveHex, isGhost = false) {
    const group = new THREE.Group();

    if (isGhost) {
      const mat = this.getGhostMaterial(colorHex);
      const mesh = new THREE.Mesh(this.blockGeo, mat);
      group.add(mesh);
    } else {
      // Main Toon Gloss Mesh using shared geometry & cached material
      const mat = this.getBlockMaterial(colorHex, emissiveHex);
      const mesh = new THREE.Mesh(this.blockGeo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Cel-Shading Black Outlines using shared edges geometry
      const outline = new THREE.LineSegments(this.blockEdgesGeo, this.outlineMaterial);
      group.add(outline);
    }

    return group;
  }

  toggleWireframe() {
    this.wireframeMode = !this.wireframeMode;
    this.materialCache.clear();
    return this.wireframeMode;
  }

  // Render Active Piece
  renderActivePiece(piece) {
    this.clearGroup(this.pieceGroup);
    if (!piece) return;

    const blockPositions = piece.getAbsoluteBlocks();
    blockPositions.forEach(([gx, gy, gz]) => {
      const meshGroup = this.createBlockMesh(piece.color, piece.emissive);
      const worldPos = this.gridToWorld(gx, gy, gz);
      meshGroup.position.copy(worldPos);
      this.pieceGroup.add(meshGroup);
    });
  }

  // Render Ghost Piece at Exact 3D Collision Location ghostY
  renderGhostPiece(piece, ghostY) {
    this.clearGroup(this.ghostGroup);
    if (!piece || ghostY === null) return;

    const ghostBlocks = piece.getAbsoluteBlocksAtY(ghostY);
    ghostBlocks.forEach(([gx, gy, gz]) => {
      const meshGroup = this.createBlockMesh(piece.color, piece.emissive, true);
      const worldPos = this.gridToWorld(gx, gy, gz);
      meshGroup.position.copy(worldPos);
      this.ghostGroup.add(meshGroup);
    });
  }

  // Update Locked Grid Meshes
  updateLockedGrid(grid) {
    this.clearGroup(this.gridMeshGroup);

    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let y = 0; y < GRID_SIZE_Y; y++) {
        for (let z = 0; z < GRID_SIZE_Z; z++) {
          const cell = grid[x][y][z];
          if (cell) {
            const meshGroup = this.createBlockMesh(cell.color, cell.emissive);
            const worldPos = this.gridToWorld(x, y, z);
            meshGroup.position.copy(worldPos);
            this.gridMeshGroup.add(meshGroup);
          }
        }
      }
    }
  }

  // Trigger Downward Speed Lines & Camera Shake on Hard Drop
  triggerHardDropFX() {
    this.shakeIntensity = 0.3;

    const lineCount = 8;
    for (let i = 0; i < lineCount; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const wx = (Math.random() - 0.5) * GRID_SIZE_X * BLOCK_SIZE;
      const wz = (Math.random() - 0.5) * GRID_SIZE_Z * BLOCK_SIZE;
      const topY = (GRID_SIZE_Y + 2) * BLOCK_SIZE;
      const botY = 0;

      lineGeo.setFromPoints([
        new THREE.Vector3(wx, topY, wz),
        new THREE.Vector3(wx, botY, wz)
      ]);

      const lineMat = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? 0x00f0ff : 0xff2a5f,
        transparent: true,
        opacity: 0.8,
        linewidth: 2
      });

      const lineMesh = new THREE.Line(lineGeo, lineMat);
      this.speedLineGroup.add(lineMesh);

      this.speedLines.push({
        mesh: lineMesh,
        life: 0.2
      });
    }
  }

  // Trigger Particle Explosion on Cleared Layer
  spawnLayerParticles(layerY, colorHex = 0x00f0ff) {
    this.shakeIntensity = 0.45;
    const particleCount = 40;
    const pGeo = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      const wx = (Math.random() - 0.5) * GRID_SIZE_X * BLOCK_SIZE;
      const wy = (layerY + 0.5) * BLOCK_SIZE;
      const wz = (Math.random() - 0.5) * GRID_SIZE_Z * BLOCK_SIZE;

      positions.push(wx, wy, wz);
      velocities.push(
        (Math.random() - 0.5) * 0.35,
        Math.random() * 0.35 + 0.12,
        (Math.random() - 0.5) * 0.35
      );
    }

    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: colorHex,
      size: 0.3,
      transparent: true,
      opacity: 1
    });

    const pSystem = new THREE.Points(pGeo, pMat);
    this.particleGroup.add(pSystem);

    this.particles.push({
      system: pSystem,
      velocities: velocities,
      life: 1.0
    });
  }

  updateParticles(delta) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= delta * 2.0;

      if (p.life <= 0) {
        this.particleGroup.remove(p.system);
        p.system.geometry.dispose();
        p.system.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }

      p.system.material.opacity = p.life;
      const posAttr = p.system.geometry.attributes.position;
      const posArray = posAttr.array;

      for (let j = 0; j < p.velocities.length / 3; j++) {
        posArray[j * 3] += p.velocities[j * 3];
        posArray[j * 3 + 1] += p.velocities[j * 3 + 1];
        posArray[j * 3 + 2] += p.velocities[j * 3 + 2];
      }
      posAttr.needsUpdate = true;
    }

    for (let i = this.speedLines.length - 1; i >= 0; i--) {
      const sl = this.speedLines[i];
      sl.life -= delta * 5.0;

      if (sl.life <= 0) {
        this.speedLineGroup.remove(sl.mesh);
        sl.mesh.geometry.dispose();
        sl.mesh.material.dispose();
        this.speedLines.splice(i, 1);
        continue;
      }

      sl.mesh.material.opacity = sl.life * 5.0;
    }
  }

  updateScreenShake(delta) {
    if (this.shakeIntensity > 0) {
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity;
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity;
      const shakeZ = (Math.random() - 0.5) * this.shakeIntensity;

      this.camera.position.x += shakeX;
      this.camera.position.y += shakeY;
      this.camera.position.z += shakeZ;

      this.shakeIntensity -= delta * this.shakeDecay;
      if (this.shakeIntensity < 0) this.shakeIntensity = 0;
    }
  }

  clearGroup(group) {
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
    }
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  render(delta) {
    this.controls.update();
    this.updateParticles(delta);
    this.updateScreenShake(delta);
    this.renderer.render(this.scene, this.camera);
  }
}
