## Context

This project delivers a web-based 3D Tetris puzzle game built with HTML5, CSS3, Vanilla JavaScript (ES Modules), and Three.js for 3D graphics rendering. The application targets modern desktop and mobile browser environments with high-frame-rate rendering, rich visual effects, Web Audio API sound synthesis, comprehensive documentation, and immediate Vercel deployment capability.

## Goals / Non-Goals

**Goals:**
- Implement a fully functional 3D Tetris game loop operating within a 3D grid container.
- Render high-quality 3D graphics using Three.js, featuring metallic/neon materials, glass container walls, dynamic shadows, ghost piece projections, and particle explosion FX.
- Provide smooth controls for 3D block movement (translation along X/Z axes, rotation around X/Y/Z axes, soft drop, and instant hard drop).
- Support full 3D plane/layer clearing with automated score, level, and line counters.
- Built-in Web Audio API sound generator for sound effects (move, rotate, drop, clear, game over) without external media dependencies.
- Glassmorphic UI overlays for scoreboards, next piece preview, hold piece, control guides, and sound toggles.
- Zero-configuration Vercel deployment structure (`vercel.json`).
- Provide a developer-centric `README.md` covering tech stack, launch instructions, debugging tools, and Vercel deployment commands.

**Non-Goals:**
- Multi-player networked real-time multiplayer over WebSockets (single-player focused).
- Heavy backend database requirements (high scores saved locally in browser `localStorage`).

## Decisions

### 1. Technology Stack Selection
- **Core Engine**: HTML5, CSS3 (Vanilla Glassmorphism styling), Vanilla JavaScript ES6+ Modules.
- **3D Graphics & Rendering**: Three.js (WebGL renderer, OrbitControls, Group transformations, ShadowMap).
- **Audio Engine**: Web Audio API Synthesizer (Oscillators, GainNodes).
- **Build / Dev Tooling**: Vite dev server (`npx vite` / `npm run dev`) for instant HMR and ES module bundling.
- **Hosting & Deployment**: Vercel Static Hosting.

### 2. Local Launch & Execution Strategy
- **Development Launch**: Run `npx vite` or `npm run dev` to start a local development server with Hot Module Replacement (HMR) on `http://localhost:5173`.
- **Static Preview**: Alternatively serve directly via `npx serve .` or any static HTTP server.

### 3. Debugging Architecture & Developer Mode
- **Console Debug Flag**: Expose global `window.TETRIS_DEBUG` object in non-production environments to inspect current piece matrix, 3D spatial grid state, FPS counter, and trigger layer clear events manually.
- **Visual Wireframe Toggle**: Include a toggle key/button (`D` key) to switch between glossy shaded materials and wireframe mode to inspect block alignment.
- **Browser DevTools Support**: Clean component/module structure separating `Renderer`, `Engine`, `Audio`, `UI`, and `Controls` for easy breakpoint debugging in Chrome DevTools / Firefox Developer Edition.

### 4. Vercel Deployment Workflow
- **Zero-Config Static Hosting**: Configure `vercel.json` with static build outputs (`dist` or root directory).
- **Vercel CLI Command**: `vercel --prod` for instant CLI deployment.
- **Git Integration**: Push to GitHub/GitLab connected to Vercel for automated CI/CD previews and production deployments.

## Risks / Trade-offs

- **[Spatial Complexity Risk]** 3D rotation and layer visibility can confuse players → **Mitigation**: Add semi-transparent block ghost projections, directional indicators, and clear layer grid lines.
- **[Performance on Mobile Risk]** Complex 3D shadows and particle counts could degrade mobile FPS → **Mitigation**: Implement dynamic resolution scaling, capped particle limits, and efficient Three.js instanced rendering.

## Migration Plan

1. Scaffold project root files (`index.html`, `style.css`, `src/main.js`, `vercel.json`, `package.json`, `README.md`).
2. Implement Three.js viewport, lighting, materials, stage grid, and OrbitControls.
3. Build 3D Tetris math engine (piece definitions, 3D translation/rotation, collision detection, layer clear).
4. Integrate particle engine and Web Audio API synthesizer.
5. Build UI HUD overlay, developer debug overlay, and control keybindings.
6. Write full `README.md` containing Tech Stack, Launch, Debugging, and Deployment documentation.
7. Verify local server build and validate Vercel deployment configuration.
