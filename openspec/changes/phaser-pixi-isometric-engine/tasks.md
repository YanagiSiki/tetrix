## 1. PixiJS Dependency & 2.5D Isometric Setup

- [x] 1.1 Update `package.json` to install `pixi.js` as the WebGL rendering engine.
- [x] 1.2 Implement `src/renderer2d5.js` with 2.5D Isometric projection math, cel-shaded texture generator, and PixiJS WebGL viewport setup.

## 2. Sprite Batching, Depth Sorting & Particles

- [x] 2.1 Implement depth-sorting (`depth = x + z + y * 100`) and sprite pooling in `src/renderer2d5.js` for zero garbage collection.
- [x] 2.2 Implement 2.5D particle explosion FX and screen shake in PixiJS.

## 3. Main Loop Connection & Build Verification

- [x] 3.1 Update `src/main.js` to connect `GameEngine3D` logic with PixiJS `Renderer2D5`.
- [x] 3.2 Verify build (`npm run build`) and confirm 60–120 FPS performance.
