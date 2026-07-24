## ADDED Requirements

### Requirement: Angled Pop HUD and Halftone Textures
The system SHALL display the HUD using skewed diagonal graphic panels (`skewX(-8deg)`), halftone dot overlay patterns, crimson red accents (`#ff003c`), cyber gold accents (`#ffe600`), and bold manga typography.

#### Scenario: Displaying Skewed HUD
- **WHEN** the player views the game interface
- **THEN** the system SHALL render scoreboards, preview panels, and control guides inside angled pop graphic containers with halftone dot textures.

### Requirement: High-Impact Combo Hit Banners
The system SHALL trigger animated pop-in text banners (`CRITICAL HIT!!`, `SHOWTIME!!`, `PERFECT!!`) upon achieving layer clears or combos.

#### Scenario: Layer Clear Combo Banner Trigger
- **WHEN** 1 or more horizontal layers are cleared from the 3D well
- **THEN** the system SHALL animate an impact text banner across the screen with scaling and rotation animations.

### Requirement: Punchy Arcade Synth Audio Effects
The system SHALL generate high-energy arcade chiptune sound synthesis with bass drop impacts for hard drops and synth slaps for piece rotations.

#### Scenario: Playing Hard Drop Bass Sound
- **WHEN** a hard drop occurs
- **THEN** the system SHALL synthesize a low-frequency bass drop tone via the Web Audio API.
