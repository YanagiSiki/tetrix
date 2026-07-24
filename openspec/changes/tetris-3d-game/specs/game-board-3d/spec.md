## ADDED Requirements

### Requirement: 3D Stage and Scene Rendering
The system SHALL initialize a Three.js WebGL scene with dynamic camera, lighting, metallic/neon block materials, and a transparent glass bounding grid container representing the play field well.

#### Scenario: Stage Initialization
- **WHEN** the player launches the application in a web browser
- **THEN** the system SHALL construct the Three.js 3D viewport with ambient light, directional shadow-casting lights, grid wireframes, and orbit controls.

### Requirement: Ghost Piece Visual Projection
The system SHALL calculate and render a translucent ghost projection directly beneath the active 3D tetromino to indicate its drop landing position.

#### Scenario: Real-time Ghost Piece Rendering
- **WHEN** the active falling piece translates or rotates in 3D space
- **THEN** the system SHALL project the piece position down to the lowest valid collision coordinate and display a semi-transparent ghost wireframe.

### Requirement: Particle Clear FX
The system SHALL trigger a 3D particle explosion effect whenever one or more horizontal layers of blocks are cleared.

#### Scenario: Layer Explosion Particles
- **WHEN** a full horizontal plane of blocks is cleared from the 3D grid
- **THEN** the system SHALL spawn colorful 3D particles at the cleared block locations that burst outward and fade smoothly.
