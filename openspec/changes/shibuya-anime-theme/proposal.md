## Why

The current generic dark-mode interface lacks visual character and artistic flair. Replacing it with a **Shibuya Neo-Tokyo Cyberpunk Anime (潮流二次元 / Persona 5) Theme** transforms the 3D Tetris game into an ultra-stylish, high-energy arcade experience featuring bold diagonal graphic UI elements, cel-shaded 3D block materials, dynamic speed-line VFX, and punchy audio synthesis.

## What Changes

- **Shibuya Neo-Tokyo 3D Visual Engine**: Overhaul the 3D scene palette to high-contrast deep black (`#0a0a0c`), crimson red (`#ff003c`), cyber gold (`#ffe600`), and stark white. Apply cel-shaded black outlines (Cel-Shading) to all 3D tetrominoes with high-gloss lacquer finishes and sharp edge highlights.
- **Dynamic Speed Lines & Impact VFX**: Add anime speed-line particle bursts and camera shake on hard drops and multi-layer clears.
- **Angled Pop Graphic UI System**: Redesign the HUD into sharp, skewed diagonal panels (`transform: skewX(-8deg)`), featuring halftone dot patterns, bold italicized manga typography, and high-impact text banners (`CRITICAL HIT!!`, `SHOWTIME!!`, `PERFECT!!`).
- **High-Energy Arcade Chiptune SFX**: Upgrade the Web Audio API sound synthesizer to produce punchy bass drops, synth-slap rotations, and energetic combo chiptunes.

## Capabilities

### New Capabilities
- `shibuya-3d-visuals`: Cel-shaded 3D block geometry, crimson/black stage grid, anime speed line particle effects, and screen shake on hard drops.
- `shibuya-pop-ui`: Skewed diagonal glassmorphism UI, halftone dot textures, manga impact typography, combo hit banners, and punchy arcade audio synthesis.

### Modified Capabilities
*(None - introducing theme overlay specs)*

## Impact

- CSS design system update in `style.css` (new skew variables, halftone background, crimson/gold palette).
- 3D Material & Renderer update in `src/renderer.js` (cel-shading mesh outlines, speed line particle system, camera impact shake).
- Audio synthesizer update in `src/audio.js` (punchy synth slap & bass drop audio curves).
- HUD overlay update in `index.html` and `src/ui.js` (angled containers & impact text popups).
