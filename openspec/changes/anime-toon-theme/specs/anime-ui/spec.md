## ADDED Requirements

### Requirement: Clean Glassmorphic HUD with Dual Japanese Labels
The system SHALL present an uncluttered dark glassmorphic UI overlay with refined typography (`Outfit`, `JetBrains Mono`, `M PLUS 1p`) and dual Japanese/English stat labels (`SCORE // スコア`, `HIGH SCORE // ハイスコア`, `LEVEL // レベル`, `LINES // ライン`).

#### Scenario: Displaying HUD Overlay
- **WHEN** the player views the game interface
- **THEN** the system SHALL display score, level, lines, next piece preview, and hold piece preview inside clean glassmorphic panels without gimmicky banners.

### Requirement: Crisp Web Audio Synthesizer
The system SHALL generate clean sound effects via the Web Audio API for piece movements, rotations, hard drops, and layer clearings.

#### Scenario: Layer Clear Audio Chime
- **WHEN** 1 or more layers are cleared from the 3D grid
- **THEN** the system SHALL play an upbeat, clean audio chime arpeggio.
