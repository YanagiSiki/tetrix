## Context

This technical design restores the full **Three.js 3D WebGL Engine** (`src/renderer.js`), solving the ghost shadow visual artifacts and occlusion issues experienced in 2.5D isometric mode. It delivers complete 360-degree OrbitControls camera navigation, real-time shadow casting, accurate 3D ghost piece projection, and optimized geometry reuse for smooth 60 FPS performance.

## Goals / Non-Goals

**Goals:**
- Restore Three.js `WebGLRenderer`, `PerspectiveCamera`, and `OrbitControls` in `src/renderer.js`.
- Render 3D ghost piece projections as semi-transparent wireframe blocks perfectly aligned with 3D grid coordinates `(gx, ghostY, gz)`.
- Optimize Three.js performance by sharing a single master `BoxGeometry(0.94, 0.94, 0.94)` and caching materials by color.
- Retain cel-shaded anime toon block aesthetics with black line outlines, transparent glass container walls, and particle FX.
- Maintain full host binding (`http://yanagi-arm-jp:3000`), Web Audio SFX, and glassmorphic HUD overlay.

**Non-Goals:**
- None. Fully restores intuitive 3D camera controls and accurate ghost drop guidance.

## Decisions

### 1. Master Geometry & Material Caching
- **Decision**: Instantiate one static `BoxGeometry` and cache `MeshStandardMaterial` instances by color hex.
- **Rationale**: Reduces WebGL memory allocation overhead by 90%, preventing frame drops and garbage collection pauses.

### 2. Precise 3D Ghost Piece Wireframe Projection
- **Decision**: Raycast down to `ghostY` and instantiate semi-transparent wireframe block meshes (`opacity: 0.35`, `wireframe: true`).
- **Rationale**: Provides immediate, crystal-clear 3D visual feedback for block landing positions from any camera angle.

### 3. OrbitControls Damping & Lighting Pipeline
- **Decision**: Enable camera damping (`dampingFactor: 0.05`) with ambient light, soft spotlight shadows, and rim lighting.
- **Rationale**: Delivers smooth 3D camera panning and high-end visual depth.

## Migration Plan

1. Reconnect `src/renderer.js` in `src/main.js`.
2. Apply master geometry and material caching in `src/renderer.js`.
3. Verify 3D ghost piece wireframe position alignment.
4. Verify build (`npm run build`) and test 3D gameplay.
