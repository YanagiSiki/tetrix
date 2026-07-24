## Context

This design specification upgrades the visual, architectural, and audio layers of the 3D Tetris game to a **Shibuya Neo-Tokyo Cyberpunk Anime (Persona 5 / Neo-Tokyo Pop Art)** aesthetic. It replaces traditional dark glassmorphism with high-contrast skewed graphic panels, halftone dot textures, cel-shaded 3D geometry, anime speed lines, and punchy arcade audio synthesis.

## Goals / Non-Goals

**Goals:**
- Implement Cel-Shaded (二次元卡通描邊) 3D block geometry with high-contrast toon shading, sharp edges, and glossy lacquer surfaces.
- Apply Shibuya Crimson Red (`#ff003c`), Cyber Gold (`#ffe600`), Abyssal Black (`#0a0a0c`), and Stark White color scheme.
- Build skewed graphic HUD panels (`transform: skewX(-8deg)`), halftone dot overlay patterns, and bold manga typography (`Impact` / `M PLUS 1p`).
- Implement anime speed-line particle bursts and subtle camera impact shake during hard drops and layer clears.
- Display high-impact anime popup banners (`CRITICAL HIT!!`, `SHOWTIME!!`, `PERFECT!!`) on combos and multi-layer clears.
- Synthesize punchy, high-energy arcade chiptune sound effects (bass drops, synth slaps, victory arpeggios).

**Non-Goals:**
- Altering core 3D Tetris puzzle rules, grid dimensions (6×6×15), or controls.
- Loading heavy 2D video files or external 3D model assets (all assets synthesized via CSS, Three.js math, and Web Audio API).

## Decisions

### 1. Cel-Shaded 3D Block Material & Outline Pipeline
- **Decision**: Render 3D blocks using `MeshStandardMaterial` with emissive highlights paired with an inverted `BackSide` outer mesh or sharp `EdgesGeometry` line segments with black/gold outlines.
- **Rationale**: Delivers true anime toon/cel-shaded aesthetics while retaining Three.js shadow casting and WebGL performance.

### 2. Skewed Pop Graphic UI Layout
- **Decision**: Wrap HUD containers in CSS containers styled with `transform: skewX(-8deg)`, halftone dot background gradients, bold borders, and stark white text shadows.
- **Rationale**: Captures the iconographic, stylized visual energy of Persona 5 and Neo-Tokyo anime interfaces.

### 3. Anime Speed Line & Screen Shake VFX
- **Decision**: Trigger vertical speed line particle emissions and temporary camera position offset noise (`Math.sin(t) * intensity`) during hard drops and multi-layer clears.
- **Rationale**: Enhances game feel and player satisfaction on impactful gameplay events.

### 4. High-Impact Text Banners & Audio Curves
- **Decision**: Render dynamic HTML text popups with CSS keyframe pop-in animations (`transform: scale(0.2) -> scale(1.3) -> scale(1)`) while triggering low-frequency sine/sawtooth bass drop synthesis.
- **Rationale**: Provides immediate, highly rewarding feedback without blocking 3D viewports.

## Risks / Trade-offs

- **[Visual Noise Risk]** High-contrast red/black tones and speed lines could distract from block placement → **Mitigation**: Keep center 3D well clean with semi-transparent black glass walls and subtle red grid highlights.
- **[CSS Skew Alignment Risk]** Skewed UI containers might truncate inner text → **Mitigation**: Apply inverse skew `transform: skewX(8deg)` to child text and canvas elements.

## Migration Plan

1. Update `style.css` design system with Shibuya Crimson/Gold palette, halftone dot patterns, and skewed panel styles.
2. Update `src/renderer.js` to render cel-shaded outlines, anime speed lines, and camera shake physics.
3. Update `src/ui.js` and `index.html` to add impact popups and angled HUD containers.
4. Update `src/audio.js` with punchy arcade synth curves.
5. Verify build and confirm zero regressions.
