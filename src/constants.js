// 3D Spatial Grid Configuration
export const GRID_SIZE_X = 6;
export const GRID_SIZE_Z = 6;
export const GRID_SIZE_Y = 15;

export const BLOCK_SIZE = 1.0;

// Tetromino 3D Shape Definitions [x, y, z]
export const TETROMINOES = {
  I: {
    color: 0x00f0ff, // Cyan
    emissive: 0x005577,
    blocks: [
      [0, 0, -1],
      [0, 0, 0],
      [0, 0, 1],
      [0, 0, 2]
    ]
  },
  J: {
    color: 0x0066ff, // Blue
    emissive: 0x002277,
    blocks: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 0, 2],
      [-1, 0, 2]
    ]
  },
  L: {
    color: 0xff6600, // Orange
    emissive: 0x773300,
    blocks: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 0, 2],
      [1, 0, 2]
    ]
  },
  O: {
    color: 0xffe600, // Yellow
    emissive: 0x665500,
    blocks: [
      [0, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      [1, 0, 1]
    ]
  },
  S: {
    color: 0x00ff88, // Neon Green
    emissive: 0x006633,
    blocks: [
      [0, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      [-1, 0, 1]
    ]
  },
  T: {
    color: 0x9d00ff, // Purple
    emissive: 0x440077,
    blocks: [
      [0, 0, 0],
      [-1, 0, 0],
      [1, 0, 0],
      [0, 0, 1]
    ]
  },
  Z: {
    color: 0xff007f, // Neon Magenta
    emissive: 0x770033,
    blocks: [
      [0, 0, 0],
      [-1, 0, 0],
      [0, 0, 1],
      [1, 0, 1]
    ]
  }
};

export const SCORE_TABLE = {
  SOFT_DROP: 1,
  HARD_DROP: 2,
  SINGLE_LAYER: 100,
  DOUBLE_LAYER: 300,
  TRIPLE_LAYER: 700,
  QUAD_LAYER: 1500
};
