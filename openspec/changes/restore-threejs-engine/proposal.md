## Why

2.5D Isometric projection lacks 3D camera control and produces awkward ghost piece visual occlusion. Restoring the true **Three.js 3D Engine (`src/renderer.js`)** with 360-degree OrbitControls camera rotation provides intuitive 3D spatial alignment, crystal-clear 3D ghost piece drop projection, and realistic lighting.

## What Changes

- **Restore Three.js 3D Engine**: Connect `src/renderer.js` back to `src/main.js` for true 3D WebGL rendering, perspective projection, camera damping OrbitControls, ambient lighting, and directional shadow-casting spotlights.
- **Accurate 3D Ghost Piece Projection**: Render 3D translucent wireframe ghost blocks accurately positioned at the lowest collision coordinate (`ghostY`), restoring clear spatial drop guidance.
- **Three.js Performance Optimization**: Apply geometry and material caching (`BoxGeometry` & `MeshStandardMaterial` reuse) to maintain ultra-fast, smooth 60 FPS rendering.
- **Clean Anime Toon Aesthetics**: Render cel-shaded 3D blocks with black outlines, transparent glass container walls, clean glassmorphic HUD overlay, and refined Web Audio API sound synthesis.

## Capabilities

### New Capabilities
- `threejs-restoration`: Three.js WebGL 3D stage restoration, OrbitControls camera, 3D ghost piece projection, geometry/material caching, and clean Anime Toon visuals.

### Modified Capabilities
- Replaces PixiJS 2.5D Isometric renderer with Three.js 3D renderer.

## Impact

- `src/main.js`: Import `Renderer3D` from `./renderer.js`.
- `src/renderer.js`: Optimized Three.js 3D stage, OrbitControls, 3D ghost piece, and speed line particle effects.
- `README.md`: Document Three.js 3D engine restoration and host binding (`http://yanagi-arm-jp:3000`).
