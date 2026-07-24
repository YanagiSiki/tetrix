## Why

Gimmicky branding elements (such as "Shibuya" or "Neo-Tokyo") can feel cluttered and tacky. Replacing them with a refined, premium **Japanese Anime Toon Theme (日系二次元 Toon 風格)** establishes a clean, high-end aesthetic featuring crisp cel-shaded 3D block geometry, elegant glassmorphic HUD panels, subtle Japanese dual-language labels, and polished sound synthesis.

## What Changes

- **Clean Anime Toon 3D Visual Engine**: Render 3D blocks with cel-shaded materials, sharp black outlines, and high-gloss lacquer surfaces using a balanced anime color palette (Electric Blue, Crimson, Gold, Emerald, Violet, Orange).
- **Elegant Glassmorphic HUD**: Remove tacky text banners and gimmicky titles. Use clean, sleek glass panels with refined typography (`Outfit`, `JetBrains Mono`, `M PLUS 1p`) and subtle dual-language stat labels (`SCORE // スコア`, `HIGH SCORE // ハイスコア`, `LEVEL // レベル`, `LINES // ライン`).
- **Subtle Anime Particles & Speed Lines**: Maintain clean particle burst FX on layer clears and downward speed-line particle streaks on hard drops without intrusive popup banners.
- **Refined Web Audio SFX**: Audio synthesizer tuned for crisp, pleasing sound feedback (soft synth clicks on move/rotate, deep punch on hard drop, clear chime arpeggio on layer clear).

## Capabilities

### New Capabilities
- `anime-toon-visuals`: Cel-shaded 3D block geometry, clean dark stage, subtle speed lines, and transparent glass well container.
- `anime-toon-ui`: Refined glassmorphic HUD layout, clean typography, dual Japanese/English stat labels, and crisp audio synthesis.

### Modified Capabilities
*(None - introducing clean theme overlay specs)*

## Impact

- Refine CSS styling in `style.css` (clean glassmorphic cards, crisp borders, dark background).
- Refine 3D material and particle rendering in `src/renderer.js` (cel-shaded block outlines, clean grid lines, speed-line particles).
- Refine HUD layout in `index.html` and `src/ui.js` (clean labels, removal of gimmicky banners).
- Refine Web Audio synthesis in `src/audio.js`.
