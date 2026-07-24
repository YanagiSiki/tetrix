## Why

Heavy 3D WebGL scenes can suffer from performance bottlenecks and garbage collection pauses on lower-end devices or integrated GPUs. Migrating the rendering pipeline to **Phaser 3 / PixiJS (2.5D Isometric WebGL Engine)** leverages GPU sprite batching to deliver ultra-fast 60–120 FPS performance, zero-latency frame rates, and lightweight memory usage while preserving stunning 2.5D pseudo-3D anime toon visuals.

## What Changes

- **Phaser 3 / PixiJS WebGL Engine Migration**: Replace Three.js with Phaser 3 / PixiJS (`pixi.js` / `phaser`) for rendering the game well in 2.5D Isometric perspective.
- **2.5D Isometric Projection Math**: Transform 3D grid coordinates `(x, y, z)` into 2D isometric screen space `(screenX, screenY)` with zero 3D matrix overhead:
  - `screenX = originX + (x - z) * (tileWidth / 2)`
  - `screenY = originY + (x + z) * (tileHeight / 4) - (y * blockHeight)`
- **GPU Sprite Batching**: Combine all block renders into 1–2 WebGL draw calls using PixiJS Containers / Sprite Batching, eliminating 3D mesh garbage collection pauses.
- **Cel-Shaded 2.5D Anime Aesthetics**: Draw high-resolution 2.5D isometric blocks with sharp toon outlines, glossy gradients, and vibrant colors.
- **Retain Clean HUD & Web Audio**: Preserve the clean glassmorphic HUD overlay, dual Japanese/English labels, Web Audio API sound synthesis, and multi-device controls.

## Capabilities

### New Capabilities
- `isometric-pixi-renderer`: Phaser 3 / PixiJS 2.5D WebGL stage, GPU sprite batching, isometric coordinate projection, and cel-shaded block textures.
- `isometric-game-loop`: High-performance 2.5D Tetris engine (spatial collision, 2.5D piece rotations, layer clearing, particle FX, HUD integration).

### Modified Capabilities
- Replacing `game-board-3d` and Three.js renderer with Phaser 3 / PixiJS 2.5D isometric renderer.

## Impact

- `package.json`: Replace `three` with `pixi.js` (or `phaser`).
- `src/renderer.js`: Replaced with 2.5D Isometric PixiJS Renderer (`src/renderer2d5.js`).
- `index.html` & `style.css`: Retained with updated 2.5D WebGL Canvas integration.
- `README.md`: Document Phaser 3 / PixiJS 2.5D Isometric architecture and performance benchmark.
