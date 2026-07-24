## Context

This technical design outlines the migration from Three.js to **PixiJS / Phaser 3 (2.5D Isometric WebGL Engine)**. This shift eliminates 3D mesh instancing complexities and garbage collection bottlenecks while delivering ultra-fast 60–120 FPS performance, 1–2 WebGL draw calls, and crisp 2.5D anime toon isometric graphics.

## Goals / Non-Goals

**Goals:**
- Replace Three.js with PixiJS (`pixi.js`), an ultra-lightweight WebGL sprite batching engine.
- Implement 2.5D Isometric projection math to render the 6×6×15 grid well with 3D depth perception.
- Pre-generate 2.5D isometric block textures with cel-shaded black outlines, top/left/right face shading, and vibrant anime colors.
- Implement Depth-Sorting (`depth = x + z + y * 100`) to guarantee correct isometric visual occlusion.
- Reduce WebGL draw calls to 1–2 using sprite container batching and object pooling.
- Maintain full compatibility with Web Audio API, glassmorphic HUD overlay, keyboard/touch controls, and Vercel hosting.

**Non-Goals:**
- Arbitrary 360-degree free camera rotation (fixed 2.5D isometric perspective yields maximum performance and zero camera calculation latency).

## Decisions

### 1. Technology Choice: PixiJS v7/v8 (`pixi.js`)
- **Decision**: Use `pixi.js` as the 2.5D WebGL rendering engine.
- **Rationale**: PixiJS is ultra-lightweight (~100KB vs ~600KB Three.js), offers automatic GPU batching, and provides unparalleled 2.5D rendering speeds.

### 2. 2.5D Isometric Projection Formula
- **Decision**: Transform 3D grid cell `(x, y, z)` to 2D canvas coordinates:
  ```javascript
  const isoX = (x - z) * (TILE_WIDTH / 2);
  const isoY = (x + z) * (TILE_HEIGHT / 2) - y * BLOCK_HEIGHT;
  ```
- **Rationale**: Simple arithmetic projection with zero matrix inversion overhead, running in <0.01ms per frame.

### 3. Dynamic Texture Caching & Cel-Shaded Facets
- **Decision**: Draw top, left, and right isometric facets with black toon outlines onto `PIXI.Graphics` and cache them as reusable textures (`PIXI.Texture`).
- **Rationale**: Eliminates runtime vector drawing and enables 1-call GPU sprite instancing.

### 4. Sprite Pooling & Depth Sorting
- **Decision**: Pre-allocate a pool of `PIXI.Sprite` objects. Sort children in `stage` using `sprite.zIndex = x + z + y * 100`.
- **Rationale**: Guarantees perfect isometric visual stacking while eliminating garbage collection pauses.

## Risks / Trade-offs

- **[Fixed Angle Trade-off]** Camera cannot rotate 360 degrees freely → **Mitigation**: 2.5D isometric angle provides crystal clear visibility across all 6×6 grid columns with zero occlusion confusion.

## Migration Plan

1. Update `package.json` to replace `three` with `pixi.js`.
2. Implement `src/renderer2d5.js` with PixiJS WebGL setup, isometric projection, texture caching, sprite pooling, and particle effects.
3. Update `src/main.js` to connect `GameEngine3D` logic to `Renderer2D5`.
4. Verify build (`npm run build`) and test 60–120 FPS performance.
