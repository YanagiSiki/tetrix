## ADDED Requirements

### Requirement: Cel-Shaded Toon Block Rendering
The system SHALL render all 3D tetrominoes with cel-shaded materials, sharp black toon outlines, high-gloss specular reflections, and transparent glass well boundaries.

#### Scenario: Rendering Toon Block
- **WHEN** a 3D tetromino is active or locked in the 3D grid
- **THEN** the system SHALL draw the block using cel-shaded materials with sharp black outlines and balanced anime colors.

### Requirement: Subtle Speed Line and Particle FX
The system SHALL spawn downward speed-line particle streaks on hard drops and colorful 3D particle explosions on layer clears.

#### Scenario: Hard Drop Speed Lines
- **WHEN** the player triggers a hard drop
- **THEN** the system SHALL emit downward speed-line particles and execute a brief camera impact offset.
