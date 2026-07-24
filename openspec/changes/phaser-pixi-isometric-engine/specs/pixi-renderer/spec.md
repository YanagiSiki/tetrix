## ADDED Requirements

### Requirement: PixiJS 2.5D Isometric WebGL Renderer
The system SHALL initialize a PixiJS WebGL application and render the 6×6×15 grid container using 2.5D isometric projection math with sprite batching.

#### Scenario: Rendering Isometric Stage
- **WHEN** the application launches
- **THEN** PixiJS SHALL render the isometric grid stage and background using batched GPU sprites operating at 60+ FPS.

### Requirement: Cel-Shaded 2.5D Texture Caching
The system SHALL pre-render 2.5D isometric block textures featuring top, left, and right shaded facets with crisp black toon outlines into GPU texture caches.

#### Scenario: Instantiating Block Sprite
- **WHEN** a block sprite is displayed for an active or locked tetromino
- **THEN** PixiJS SHALL render the sprite using cached cel-shaded isometric textures.
