## Context

This design specification establishes a clean, high-end **Japanese Anime Toon Theme (日系二次元 Toon 風格)** for the 3D Tetris game. It eliminates gimmicky titles and tacky pop banners, replacing them with a crisp, elegant dark glassmorphic HUD, refined typography, dual Japanese/English labels, cel-shaded 3D blocks, subtle anime particle effects, and polished sound synthesis.

## Goals / Non-Goals

**Goals:**
- Implement high-quality Cel-Shaded 3D block geometry with sharp black toon outlines and smooth specular highlights.
- Establish a refined dark palette: Deep Midnight (`#090b14`), Neon Crimson (`#ff2a5f`), Electric Cyan (`#00f0ff`), Cyber Gold (`#ffd000`), and Violet (`#9d00ff`).
- Create an elegant glassmorphic HUD with subtle borders, refined fonts (`Outfit`, `JetBrains Mono`, `M PLUS 1p`), and dual-language labels (`SCORE // スコア`, `HIGH SCORE // ハイスコア`, `LEVEL // レベル`, `LINES // ライン`).
- Remove tacky text popups (`CRITICAL HIT!!`, `SHOWTIME!!`) for a clean, focused playing experience.
- Retain subtle 3D particle explosions on layer clears and downward speed-line particle streaks on hard drops.
- Synthesize crisp, pleasant Web Audio API sound effects.

**Non-Goals:**
- Altering core 3D Tetris game mechanics, grid dimensions (6×6×15), or keyboard/touch controls.

## Decisions

### 1. Cel-Shaded 3D Block Material & Toon Outline
- **Decision**: Combine `MeshStandardMaterial` (emissive intensity `0.4`, metalness `0.7`, roughness `0.2`) with `THREE.EdgesGeometry` black line segments.
- **Rationale**: Delivers crisp二次元 cel-shaded anime block aesthetics while preserving high performance and 3D depth perception.

### 2. Clean Glassmorphic HUD Layout
- **Decision**: Use un-skewed rectangular glass cards (`background: rgba(15, 20, 38, 0.75)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(0, 240, 255, 0.2)`).
- **Rationale**: Ensures maximum readability, clean visual hierarchy, and an uncluttered screen.

### 3. Subtle Anime Particle & Camera Shake Effects
- **Decision**: Trigger downward speed-line particle streaks and minor camera shake on hard drop without blocking the well with 2D banners.
- **Rationale**: Provides impactful feedback for player actions while keeping the 3D playfield completely visible.

## Risks / Trade-offs

- None identified. Clean, uncluttered UI enhances readability across desktop and mobile devices.

## Migration Plan

1. Update `style.css` with clean glassmorphic design system and dark midnight palette.
2. Update `src/renderer.js` to render cel-shaded toon blocks, clean grid lines, speed-line particles, and subtle camera shake.
3. Update `index.html` and `src/ui.js` to restore clean headers and dual Japanese/English labels without gimmicky text popups.
4. Update `src/audio.js` with crisp, pleasant sound synthesis.
5. Verify build and confirm zero regressions.
