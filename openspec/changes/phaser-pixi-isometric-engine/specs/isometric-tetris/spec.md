## ADDED Requirements

### Requirement: Depth-Sorted Isometric Block Rendering
The system SHALL sort all active, ghost, and locked block sprites by isometric depth (`depth = x + z + y * 100`) to enforce correct visual layering.

#### Scenario: Visual Occlusion Test
- **WHEN** a higher block is placed in front of lower grid cells
- **THEN** the PixiJS container SHALL render the foreground block in front of background blocks without visual artifacts.

### Requirement: Ultra-Fast Sprite Pooling and Particles
The system SHALL reuse sprite objects from an object pool and emit 2.5D particle bursts on layer clearance.

#### Scenario: Clearing Isometric Layer
- **WHEN** a horizontal layer is cleared
- **THEN** PixiJS SHALL animate 2.5D particle bursts and recycle cleared block sprites back into the pool.
