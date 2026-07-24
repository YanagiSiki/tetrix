import { GRID_SIZE_X, GRID_SIZE_Y, GRID_SIZE_Z, TETROMINOES, SCORE_TABLE } from './constants.js';

export class Tetromino3D {
  constructor(typeKey) {
    this.typeKey = typeKey;
    const def = TETROMINOES[typeKey];
    this.color = def.color;
    this.emissive = def.emissive;
    // Copy relative block coordinates [x, y, z]
    this.blocks = def.blocks.map(b => [...b]);
    // Center spawn position
    this.x = Math.floor(GRID_SIZE_X / 2);
    this.y = GRID_SIZE_Y - 2;
    this.z = Math.floor(GRID_SIZE_Z / 2);
  }

  getAbsoluteBlocks() {
    return this.blocks.map(([bx, by, bz]) => [
      this.x + bx,
      this.y + by,
      this.z + bz
    ]);
  }

  getAbsoluteBlocksAtY(targetY) {
    return this.blocks.map(([bx, by, bz]) => [
      this.x + bx,
      targetY + by,
      this.z + bz
    ]);
  }

  // 3D Matrix Rotations around X, Y, Z axes
  rotateX(dir = 1) {
    // Y' = -Z * dir, Z' = Y * dir
    this.blocks = this.blocks.map(([x, y, z]) => [
      x,
      -z * dir,
      y * dir
    ]);
  }

  rotateY(dir = 1) {
    // X' = Z * dir, Z' = -X * dir
    this.blocks = this.blocks.map(([x, y, z]) => [
      z * dir,
      y,
      -x * dir
    ]);
  }

  rotateZ(dir = 1) {
    // X' = -Y * dir, Y' = X * dir
    this.blocks = this.blocks.map(([x, y, z]) => [
      -y * dir,
      x * dir,
      z
    ]);
  }
}

export class GameEngine3D {
  constructor() {
    this.grid = this.createEmptyGrid();
    this.activePiece = null;
    this.nextPiece = null;
    this.holdPiece = null;
    this.canHold = true;

    this.score = 0;
    this.highScore = this.loadHighScore();
    this.level = 1;
    this.linesCleared = 0;

    this.isGameOver = false;
    this.isPaused = false;

    this.dropTimer = 0;
    this.dropInterval = 1000; // ms

    this.bag = [];
    this.onLayerClearCallback = null;
  }

  createEmptyGrid() {
    const grid = [];
    for (let x = 0; x < GRID_SIZE_X; x++) {
      grid[x] = [];
      for (let y = 0; y < GRID_SIZE_Y; y++) {
        grid[x][y] = [];
        for (let z = 0; z < GRID_SIZE_Z; z++) {
          grid[x][y][z] = null;
        }
      }
    }
    return grid;
  }

  loadHighScore() {
    try {
      return parseInt(localStorage.getItem('TETRIX_3D_HIGH_SCORE') || '0', 10);
    } catch (e) {
      return 0;
    }
  }

  saveHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      try {
        localStorage.setItem('TETRIX_3D_HIGH_SCORE', this.highScore.toString());
      } catch (e) {}
    }
  }

  reset() {
    this.grid = this.createEmptyGrid();
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.holdPiece = null;
    this.canHold = true;
    this.bag = [];
    this.dropInterval = 1000;

    this.nextPiece = this.generatePiece();
    this.spawnNextPiece();
  }

  generatePiece() {
    if (this.bag.length === 0) {
      this.bag = Object.keys(TETROMINOES).sort(() => Math.random() - 0.5);
    }
    const typeKey = this.bag.pop();
    return new Tetromino3D(typeKey);
  }

  spawnNextPiece() {
    this.activePiece = this.nextPiece || this.generatePiece();
    this.nextPiece = this.generatePiece();
    this.canHold = true;

    // Check game over on spawn
    if (this.checkCollision(this.activePiece)) {
      this.isGameOver = true;
      this.saveHighScore();
    }
  }

  doHold() {
    if (!this.canHold || this.isGameOver || this.isPaused) return false;

    const currentType = this.activePiece.typeKey;
    if (this.holdPiece) {
      const tempType = this.holdPiece.typeKey;
      this.holdPiece = new Tetromino3D(currentType);
      this.activePiece = new Tetromino3D(tempType);
    } else {
      this.holdPiece = new Tetromino3D(currentType);
      this.spawnNextPiece();
    }
    this.canHold = false;
    return true;
  }

  checkCollision(piece, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const blocks = piece.getAbsoluteBlocks();
    for (const [x, y, z] of blocks) {
      const tx = x + offsetX;
      const ty = y + offsetY;
      const tz = z + offsetZ;

      // Container boundary check
      if (tx < 0 || tx >= GRID_SIZE_X || tz < 0 || tz >= GRID_SIZE_Z || ty < 0) {
        return true;
      }
      // Top boundary (allow spawning above grid)
      if (ty >= GRID_SIZE_Y) continue;

      // Occupied cell check
      if (this.grid[tx][ty][tz] !== null) {
        return true;
      }
    }
    return false;
  }

  move(dx, dz) {
    if (this.isGameOver || this.isPaused || !this.activePiece) return false;
    if (!this.checkCollision(this.activePiece, dx, 0, dz)) {
      this.activePiece.x += dx;
      this.activePiece.z += dz;
      return true;
    }
    return false;
  }

  rotate(axis, dir = 1) {
    if (this.isGameOver || this.isPaused || !this.activePiece) return false;

    const piece = this.activePiece;
    // Perform rotation
    if (axis === 'x') piece.rotateX(dir);
    else if (axis === 'y') piece.rotateY(dir);
    else if (axis === 'z') piece.rotateZ(dir);

    // Wall-kick offsets: test center, ±1 X, ±1 Z
    const kickOffsets = [
      [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1]
    ];

    for (const [kx, kz] of kickOffsets) {
      if (!this.checkCollision(piece, kx, 0, kz)) {
        piece.x += kx;
        piece.z += kz;
        return true;
      }
    }

    // Revert rotation if no valid kick found
    if (axis === 'x') piece.rotateX(-dir);
    else if (axis === 'y') piece.rotateY(-dir);
    else if (axis === 'z') piece.rotateZ(-dir);
    return false;
  }

  getGhostY() {
    if (!this.activePiece) return null;
    let testY = 0;
    while (!this.checkCollision(this.activePiece, 0, testY - 1, 0)) {
      testY--;
    }
    return this.activePiece.y + testY;
  }

  softDrop() {
    if (this.isGameOver || this.isPaused || !this.activePiece) return false;
    if (!this.checkCollision(this.activePiece, 0, -1, 0)) {
      this.activePiece.y -= 1;
      this.score += SCORE_TABLE.SOFT_DROP;
      this.dropTimer = 0;
      return true;
    } else {
      this.lockPiece();
      return false;
    }
  }

  hardDrop() {
    if (this.isGameOver || this.isPaused || !this.activePiece) return 0;
    let dropCount = 0;
    while (!this.checkCollision(this.activePiece, 0, -1, 0)) {
      this.activePiece.y -= 1;
      dropCount++;
    }
    this.score += dropCount * SCORE_TABLE.HARD_DROP;
    this.lockPiece();
    return dropCount;
  }

  lockPiece() {
    const blocks = this.activePiece.getAbsoluteBlocks();
    blocks.forEach(([x, y, z]) => {
      if (x >= 0 && x < GRID_SIZE_X && z >= 0 && z < GRID_SIZE_Z && y >= 0 && y < GRID_SIZE_Y) {
        this.grid[x][y][z] = {
          color: this.activePiece.color,
          emissive: this.activePiece.emissive
        };
      }
    });

    this.checkLayerClears();
    this.spawnNextPiece();
  }

  checkLayerClears() {
    const clearedLayers = [];

    for (let y = 0; y < GRID_SIZE_Y; y++) {
      let isLayerFull = true;
      for (let x = 0; x < GRID_SIZE_X; x++) {
        for (let z = 0; z < GRID_SIZE_Z; z++) {
          if (this.grid[x][y][z] === null) {
            isLayerFull = false;
            break;
          }
        }
        if (!isLayerFull) break;
      }

      if (isLayerFull) {
        clearedLayers.push(y);
      }
    }

    if (clearedLayers.length > 0) {
      // Clear layers & shift down
      clearedLayers.forEach(layerY => {
        this.clearAndShiftLayer(layerY);
        if (this.onLayerClearCallback) {
          this.onLayerClearCallback(layerY);
        }
      });

      // Calculate score
      const count = clearedLayers.length;
      let points = 0;
      if (count === 1) points = SCORE_TABLE.SINGLE_LAYER;
      else if (count === 2) points = SCORE_TABLE.DOUBLE_LAYER;
      else if (count === 3) points = SCORE_TABLE.TRIPLE_LAYER;
      else if (count >= 4) points = SCORE_TABLE.QUAD_LAYER;

      this.score += points * this.level;
      this.linesCleared += count;
      this.saveHighScore();

      // Level Progression
      const newLevel = Math.floor(this.linesCleared / 10) + 1;
      if (newLevel > this.level) {
        this.level = newLevel;
        this.dropInterval = Math.max(150, 1000 - (this.level - 1) * 85);
      }
    }
  }

  clearAndShiftLayer(clearedY) {
    // Clear targeted level
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let z = 0; z < GRID_SIZE_Z; z++) {
        this.grid[x][clearedY][z] = null;
      }
    }

    // Shift upper levels down by 1
    for (let y = clearedY; y < GRID_SIZE_Y - 1; y++) {
      for (let x = 0; x < GRID_SIZE_X; x++) {
        for (let z = 0; z < GRID_SIZE_Z; z++) {
          this.grid[x][y][z] = this.grid[x][y + 1][z];
        }
      }
    }

    // Clear top level
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let z = 0; z < GRID_SIZE_Z; z++) {
        this.grid[x][GRID_SIZE_Y - 1][z] = null;
      }
    }
  }

  update(deltaMs) {
    if (this.isGameOver || this.isPaused) return;

    this.dropTimer += deltaMs;
    if (this.dropTimer >= this.dropInterval) {
      this.dropTimer = 0;
      this.softDrop();
    }
  }
}
