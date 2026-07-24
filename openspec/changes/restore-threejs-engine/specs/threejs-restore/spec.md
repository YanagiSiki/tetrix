## ADDED Requirements

### Requirement: Three.js 3D WebGL Engine and OrbitControls Restoration
The system SHALL restore the Three.js 3D WebGL stage with perspective camera projection, 360-degree OrbitControls navigation, ambient/spotlight lighting, and transparent glass well container.

#### Scenario: 3D Scene Initialization
- **WHEN** the player launches the game
- **THEN** the Three.js 3D viewport SHALL render the 3D grid container with OrbitControls camera rotation and real-time shadow casting.

### Requirement: Accurate 3D Ghost Piece Wireframe Projection
The system SHALL calculate the active piece's lowest collision Y coordinate (`ghostY`) and render semi-transparent 3D wireframe blocks at `(gx, ghostY, gz)`.

#### Scenario: Real-time 3D Ghost Projection
- **WHEN** the active piece translates or rotates in 3D space
- **THEN** the system SHALL project wireframe ghost blocks directly below the active piece at the exact drop landing position.
