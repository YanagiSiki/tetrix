## ADDED Requirements

### Requirement: Glassmorphic HUD and Scoreboard
The system SHALL display a responsive dark glassmorphic user interface containing current score, highest score, level, lines cleared, next piece preview canvas, and hold piece canvas.

#### Scenario: HUD Score Update
- **WHEN** points are earned through piece drops or layer clearings
- **THEN** the system SHALL update the displayed score and level in real time with subtle glow animations.

### Requirement: Synthesized Web Audio Sound Effects
The system SHALL generate retro/futuristic sound effects using Web Audio API synthesized tones for block movements, rotations, drop landings, layer clears, and game over sequences.

#### Scenario: Playing Move Sound Effect
- **WHEN** the player successfully moves or rotates a piece
- **THEN** the system SHALL generate a short audio pitch burst via the browser Web Audio API `AudioContext`.

### Requirement: Deployment Readiness for Vercel
The system SHALL provide a clean static project bundle with valid configuration (`vercel.json`) allowing single-click or CLI deployment on Vercel.

#### Scenario: Static Build and Vercel Hosting
- **WHEN** deployed to Vercel
- **THEN** the static server SHALL serve `index.html` with all 3D canvas elements, ES modules, styles, and controls fully operational.
