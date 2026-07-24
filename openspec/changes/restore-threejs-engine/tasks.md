## 1. Three.js 3D Engine Restoration & Optimization

- [x] 1.1 Update `src/renderer.js` to share a single master `BoxGeometry` and cache `MeshStandardMaterial` instances by color.
- [x] 1.2 Refine 3D ghost piece projection (`renderGhostPiece`) with translucent wireframe block rendering aligned at `(gx, ghostY, gz)`.
- [x] 1.3 Update `src/main.js` to import `Renderer3D` from `./renderer.js` and restore full 3D game loop execution.
- [x] 1.4 Verify build (`npm run build`) and confirm 3D camera controls and host binding (`http://yanagi-arm-jp:3000`).
