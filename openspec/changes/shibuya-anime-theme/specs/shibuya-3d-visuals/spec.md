## ADDED Requirements

### Requirement: Cel-Shaded 3D Block Rendering
The system SHALL render all 3D tetrominoes with cel-shaded black outlines, high-contrast lacquer materials, and bright emissive edge highlights matching the Shibuya Neo-Tokyo color palette.

#### Scenario: Rendering Toon-Shaded Block
- **WHEN** a 3D tetromino is spawned or locked in the grid
- **THEN** the system SHALL draw the block using cel-shaded materials with sharp black outlines and high-contrast specular reflections.

### Requirement: Anime Speed Line Effects and Screen Shake
The system SHALL spawn vertical anime speed line particles and execute camera impact shake when a hard drop or multi-layer clearance occurs.

#### Scenario: Hard Drop Screen Shake and Speed Lines
- **WHEN** the player executes a hard drop command
- **THEN** the system SHALL emit downward speed-line particles and apply a brief camera offset shake to emphasize the impact.
