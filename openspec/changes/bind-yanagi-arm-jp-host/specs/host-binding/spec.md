## ADDED Requirements

### Requirement: Network Interface and Custom Host Header Authorization
The system SHALL configure the Vite dev and preview servers to listen on network interfaces (`0.0.0.0`) and authorize requests with host headers matching `yanagi-arm-jp`, `localhost`, and `127.0.0.1`.

#### Scenario: Accessing Dev Server via Custom Host Domain
- **WHEN** a developer launches `npm run dev` and navigates to `http://yanagi-arm-jp:3000`
- **THEN** the Vite development server SHALL accept the HTTP connection and serve the 3D Tetris web application without host header restriction errors.
