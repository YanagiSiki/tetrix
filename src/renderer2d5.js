import * as PIXI from 'pixi.js';
import { GRID_SIZE_X, GRID_SIZE_Y, GRID_SIZE_Z } from './constants.js';

export class Renderer2D5 {
  constructor(containerEl) {
    this.container = containerEl;
    this.app = null;
    this.stageContainer = null;
    this.particleContainer = null;

    // Isometric dimensions
    this.tileWidth = 44;
    this.tileHeight = 22;
    this.blockHeight = 26;

    // Center offset
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight * 0.58;

    // Texture Cache map: colorHex -> PIXI.Texture
    this.textureCache = new Map();

    // Sprite Object Pool & Active Collection
    this.spritePool = [];
    this.activeSprites = [];

    // Particles & Screen Shake
    this.particles = [];
    this.shakeIntensity = 0;
    this.shakeDecay = 12.0;

    this.wireframeMode = false;

    this.init();
  }

  init() {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x090b14,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, 2),
      autoDensity: true
    });

    this.container.appendChild(this.app.view);

    // Main Stage Container
    this.stageContainer = new PIXI.Container();
    this.stageContainer.sortableChildren = true;
    this.app.stage.addChild(this.stageContainer);

    // Particle Container
    this.particleContainer = new PIXI.Container();
    this.app.stage.addChild(this.particleContainer);

    // Draw Base Grid Well Floor Wireframe
    this.drawIsometricWellFloor();

    // Window Resize Event
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight * 0.58;
    this.drawIsometricWellFloor();
  }

  // Draw Isometric Well Floor Grid & Boundaries
  drawIsometricWellFloor() {
    if (this.floorGraphics) {
      this.stageContainer.removeChild(this.floorGraphics);
      this.floorGraphics.destroy();
    }

    this.floorGraphics = new PIXI.Graphics();
    const g = this.floorGraphics;
    g.zIndex = -1000;

    // Draw Floor Grid Cells
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let z = 0; z < GRID_SIZE_Z; z++) {
        const iso = this.gridToIso(x, -0.1, z);
        const px = this.centerX + iso.x;
        const py = this.centerY + iso.y;

        g.lineStyle(1.5, 0x00f0ff, 0.4);
        g.beginFill(0x0e1424, 0.6);

        // Isometric Diamond Top Face
        g.moveTo(px, py - this.tileHeight / 2);
        g.lineTo(px + this.tileWidth / 2, py);
        g.lineTo(px, py + this.tileHeight / 2);
        g.lineTo(px - this.tileWidth / 2, py);
        g.closePath();
        g.endFill();
      }
    }

    // Draw Well Vertical Guide Corner Lines
    const cornerCoords = [
      [0, 0], [GRID_SIZE_X, 0], [GRID_SIZE_X, GRID_SIZE_Z], [0, GRID_SIZE_Z]
    ];
    cornerCoords.forEach(([gx, gz]) => {
      const botIso = this.gridToIso(gx - 0.5, 0, gz - 0.5);
      const topIso = this.gridToIso(gx - 0.5, GRID_SIZE_Y, gz - 0.5);

      g.lineStyle(1.5, 0x00f0ff, 0.3);
      g.moveTo(this.centerX + botIso.x, this.centerY + botIso.y);
      g.lineTo(this.centerX + topIso.x, this.centerY + topIso.y);
    });

    this.stageContainer.addChild(this.floorGraphics);
  }

  // 3D Grid (gx, gy, gz) to 2D Isometric Screen Coordinates
  gridToIso(gx, gy, gz) {
    const cx = gx - (GRID_SIZE_X - 1) / 2;
    const cz = gz - (GRID_SIZE_Z - 1) / 2;

    const screenX = (cx - cz) * (this.tileWidth / 2);
    const screenY = (cx + cz) * (this.tileHeight / 2) - (gy * this.blockHeight);

    return { x: screenX, y: screenY };
  }

  // Generate or Retrieve Cached 2.5D Cel-Shaded Block Texture
  getOrCreateBlockTexture(colorHex, isWireframe = false) {
    const cacheKey = `${colorHex}_${isWireframe ? 'wire' : 'solid'}`;
    if (this.textureCache.has(cacheKey)) {
      return this.textureCache.get(cacheKey);
    }

    const g = new PIXI.Graphics();
    const w = this.tileWidth;
    const h = this.tileHeight;
    const bh = this.blockHeight;

    const halfW = w / 2;
    const halfH = h / 2;

    const baseColor = colorHex;
    const leftShadeColor = this.multiplyColor(colorHex, 0.75);
    const rightShadeColor = this.multiplyColor(colorHex, 0.55);

    g.lineStyle(2, 0x050508, 1);

    if (isWireframe) {
      g.lineStyle(2, colorHex, 0.9);
      g.drawRect(0, 0, w, h + bh);
    } else {
      // 1. Top Diamond Face
      g.beginFill(baseColor);
      g.moveTo(halfW, 0);
      g.lineTo(w, halfH);
      g.lineTo(halfW, h);
      g.lineTo(0, halfH);
      g.closePath();
      g.endFill();

      // 2. Left Facet
      g.beginFill(leftShadeColor);
      g.moveTo(0, halfH);
      g.lineTo(halfW, h);
      g.lineTo(halfW, h + bh);
      g.lineTo(0, halfH + bh);
      g.closePath();
      g.endFill();

      // 3. Right Facet
      g.beginFill(rightShadeColor);
      g.moveTo(halfW, h);
      g.lineTo(w, halfH);
      g.lineTo(w, halfH + bh);
      g.lineTo(halfW, h + bh);
      g.closePath();
      g.endFill();

      // Inner Edge Highlights for Cel-Shaded Glow
      g.lineStyle(1, 0xffffff, 0.35);
      g.moveTo(halfW, 0);
      g.lineTo(w, halfH);
    }

    const texture = this.app.renderer.generateTexture(g);
    g.destroy();
    this.textureCache.set(cacheKey, texture);
    return texture;
  }

  multiplyColor(hex, factor) {
    const r = Math.floor(((hex >> 16) & 0xff) * factor);
    const g = Math.floor(((hex >> 8) & 0xff) * factor);
    const b = Math.floor((hex & 0xff) * factor);
    return (r << 16) | (g << 8) | b;
  }

  // Get Sprite from Pool
  getSpriteFromPool() {
    let sprite = this.spritePool.pop();
    if (!sprite) {
      sprite = new PIXI.Sprite();
      sprite.anchor.set(0.5, 0);
    }
    sprite.visible = true;
    sprite.alpha = 1.0;
    sprite.tint = 0xffffff;
    return sprite;
  }

  // Call once per frame before adding active sprites
  beginFrame() {
    while (this.activeSprites.length > 0) {
      const sprite = this.activeSprites.pop();
      sprite.visible = false;
      this.stageContainer.removeChild(sprite);
      this.spritePool.push(sprite);
    }
  }

  toggleWireframe() {
    this.wireframeMode = !this.wireframeMode;
    this.textureCache.clear();
    return this.wireframeMode;
  }

  resetCameraPosition() {
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight * 0.58;
    this.app.stage.position.set(0, 0);
    this.drawIsometricWellFloor();
  }

  // Render Active Piece
  renderActivePiece(piece) {
    if (!piece) return;
    const blocks = piece.getAbsoluteBlocks();
    const texture = this.getOrCreateBlockTexture(piece.color, this.wireframeMode);

    blocks.forEach(([gx, gy, gz]) => {
      const iso = this.gridToIso(gx, gy, gz);
      const sprite = this.getSpriteFromPool();
      sprite.texture = texture;
      sprite.position.set(this.centerX + iso.x, this.centerY + iso.y - this.tileHeight / 2);
      // Depth sorting: higher (gx + gz) is in front, higher gy is in front
      sprite.zIndex = (gx + gz) * 100 + gy;

      this.stageContainer.addChild(sprite);
      this.activeSprites.push(sprite);
    });
  }

  // Render Ghost Piece
  renderGhostPiece(piece, ghostY) {
    if (!piece || ghostY === null) return;
    const ghostBlocks = piece.getAbsoluteBlocksAtY(ghostY);
    const texture = this.getOrCreateBlockTexture(piece.color, true);

    ghostBlocks.forEach(([gx, gy, gz]) => {
      const iso = this.gridToIso(gx, gy, gz);
      const sprite = this.getSpriteFromPool();
      sprite.texture = texture;
      sprite.position.set(this.centerX + iso.x, this.centerY + iso.y - this.tileHeight / 2);
      sprite.alpha = 0.45;
      sprite.zIndex = (gx + gz) * 100 + gy - 1;

      this.stageContainer.addChild(sprite);
      this.activeSprites.push(sprite);
    });
  }

  // Update Locked Grid Meshes
  updateLockedGrid(grid) {
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let y = 0; y < GRID_SIZE_Y; y++) {
        for (let z = 0; z < GRID_SIZE_Z; z++) {
          const cell = grid[x][y][z];
          if (cell) {
            const texture = this.getOrCreateBlockTexture(cell.color, this.wireframeMode);
            const iso = this.gridToIso(x, y, z);
            const sprite = this.getSpriteFromPool();
            sprite.texture = texture;
            sprite.position.set(this.centerX + iso.x, this.centerY + iso.y - this.tileHeight / 2);
            sprite.zIndex = (x + z) * 100 + y;

            this.stageContainer.addChild(sprite);
            this.activeSprites.push(sprite);
          }
        }
      }
    }
  }

  // Hard Drop FX
  triggerHardDropFX() {
    this.shakeIntensity = 0.35;
  }

  // 2.5D Particle Explosions on Cleared Layer
  spawnLayerParticles(layerY, colorHex = 0x00f0ff) {
    this.shakeIntensity = 0.5;
    const count = 35;

    for (let i = 0; i < count; i++) {
      const g = new PIXI.Graphics();
      g.beginFill(colorHex);
      g.drawCircle(0, 0, Math.random() * 4 + 2);
      g.endFill();

      const iso = this.gridToIso(
        Math.random() * GRID_SIZE_X,
        layerY,
        Math.random() * GRID_SIZE_Z
      );

      g.position.set(this.centerX + iso.x, this.centerY + iso.y);
      this.particleContainer.addChild(g);

      this.particles.push({
        graphic: g,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        life: 1.0
      });
    }
  }

  updateParticles(deltaSec) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= deltaSec * 2.5;

      if (p.life <= 0) {
        this.particleContainer.removeChild(p.graphic);
        p.graphic.destroy();
        this.particles.splice(i, 1);
        continue;
      }

      p.graphic.x += p.vx;
      p.graphic.y += p.vy;
      p.graphic.alpha = p.life;
    }
  }

  updateScreenShake(deltaSec) {
    if (this.shakeIntensity > 0) {
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity * 16;
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity * 16;

      this.app.stage.position.set(shakeX, shakeY);

      this.shakeIntensity -= deltaSec * this.shakeDecay;
      if (this.shakeIntensity <= 0) {
        this.shakeIntensity = 0;
        this.app.stage.position.set(0, 0);
      }
    }
  }

  render(deltaSec) {
    this.stageContainer.sortChildren();
    this.updateParticles(deltaSec);
    this.updateScreenShake(deltaSec);
  }
}
