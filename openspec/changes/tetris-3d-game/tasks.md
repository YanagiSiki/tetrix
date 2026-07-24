## 1. Project Setup & Base Architecture

- [x] 1.1 Create project structure (`index.html`, `style.css`, `src/`, `package.json`, `vercel.json`).
- [x] 1.2 Import Three.js, OrbitControls, and set up modern glassmorphic CSS theme.

## 2. 3D Scene & Stage Renderer

- [x] 2.1 Set up Three.js WebGL Renderer, PerspectiveCamera, OrbitControls, ambient, spotlight shadows, and glass bounding well.
- [x] 2.2 Create block geometry and glossy/neon material generators for tetromino blocks.
- [x] 2.3 Implement Ghost Piece translucent projection and 3D plane grid guide lines.

## 3. Core 3D Tetris Game Logic

- [x] 3.1 Implement 3D spatial grid data structure, 7 standard tetromino 3D shapes, and piece spawner logic.
- [x] 3.2 Implement piece translation (X, Z axes), 3D rotation (X, Y, Z axes), collision boundary checks, and wall-kicks.
- [x] 3.3 Implement gravity drop timer, soft drop acceleration, and instant hard drop locking.
- [x] 3.4 Implement 3D layer clearance detection, line/plane removal, score calculation, level progression, and block gravity shift.

## 4. Visual FX & Web Audio API Engine

- [x] 4.1 Implement Web Audio API sound synthesizer for move, rotate, drop, clear, and game over effects.
- [x] 4.2 Build 3D particle explosion system triggered on layer clearance.

## 5. UI HUD, Debugging & Documentation

- [x] 5.1 Build responsive HTML overlay featuring score, high score, level, lines, next piece preview canvas, hold piece canvas, and pause menu.
- [x] 5.2 Add touch controls for mobile browsers and keyboard control guide.
- [x] 5.3 Implement developer debug tools (`D` key wireframe mode, console `TETRIS_DEBUG` helper, and FPS counter).
- [x] 5.4 Write comprehensive `README.md` covering tech stack, launch scripts (`npm run dev`), debugging procedures, and Vercel deployment guide.

## 6. Vercel Deployment

- [x] 6.1 Configure Vercel static routing (`vercel.json`) and verify local production build preview.
