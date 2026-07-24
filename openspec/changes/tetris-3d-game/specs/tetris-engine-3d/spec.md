## ADDED Requirements

### Requirement: 3D Piece Translation and Spatial Rotation
The system SHALL process player input to move active tetrominoes along X and Z grid axes and rotate active tetrominoes around X, Y, and Z spatial axes while preventing out-of-bounds movement and block collisions.

#### Scenario: Translating Active Piece
- **WHEN** the player inputs horizontal or depth move commands
- **THEN** the system SHALL shift the active piece by 1 grid cell along the requested axis if the destination coordinates are empty and within container bounds.

#### Scenario: 3D Piece Rotation
- **WHEN** the player inputs rotation commands along X, Y, or Z axis
- **THEN** the system SHALL compute the target 3D matrix transformation and rotate the piece if spatial bounds allow, using wall-kicks if required.

### Requirement: Automatic Falling, Soft Drop, and Hard Drop
The system SHALL lower the active piece at regular intervals based on current game level, and allow instantaneous drop via hard drop or accelerated drop via soft drop.

#### Scenario: Hard Drop Command
- **WHEN** the player triggers the hard drop command
- **THEN** the system SHALL immediately transfer the active piece to its lowest collision position, lock it into the grid, and spawn the next piece.

### Requirement: 3D Layer Clear and Gravity Shift
The system SHALL detect when a full 2D layer across the horizontal grid area is occupied by blocks, clear those blocks, award points, and shift all higher layers down by 1 unit.

#### Scenario: Clearing a Completed Layer
- **WHEN** every cell in a horizontal level `y` becomes filled by locked blocks
- **THEN** the system SHALL remove all blocks in level `y`, increment player score and cleared lines counter, and shift blocks at `y+1` and above down.
