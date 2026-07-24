## Context

By default, Vite's development and preview servers only listen on `127.0.0.1` (`localhost`). If a user attempts to access the server via a custom hostname like `yanagi-arm-jp` or across a local network, Vite returns a 403 / Host Header validation error or refuses connection.

This design updates Vite's configuration to bind to `0.0.0.0` and explicitly register `yanagi-arm-jp` in `allowedHosts`.

## Goals / Non-Goals

**Goals:**
- Configure `vite.config.js` to listen on all network interfaces (`host: '0.0.0.0'`).
- Explicitly authorize `yanagi-arm-jp`, `localhost`, and `127.0.0.1` in `server.allowedHosts` and `preview.allowedHosts`.
- Update `package.json` scripts with `--host 0.0.0.0` flags.
- Update `README.md` to document local URL access via `http://yanagi-arm-jp:3000`.

**Non-Goals:**
- Setting up external HTTPS reverse proxy certificates (server operates on standard HTTP port 3000).

## Decisions

### 1. Network Interface Binding (`0.0.0.0`)
- **Decision**: Configure `server.host: '0.0.0.0'` and `preview.host: '0.0.0.0'`.
- **Rationale**: Binds the node HTTP listener to all IPv4 interfaces, allowing LAN devices and hostname mapping (`yanagi-arm-jp`) to establish TCP connections.

### 2. Host Header Validation (`allowedHosts`)
- **Decision**: Set `allowedHosts: ['yanagi-arm-jp', 'localhost', '127.0.0.1']` (or `true`).
- **Rationale**: Prevents Vite's security middleware from blocking requests with `Host: yanagi-arm-jp:3000`.

## Risks / Trade-offs

- **[LAN Exposure Risk]** Server becomes accessible to other devices on the same local network → **Mitigation**: Standard for local dev servers; restricted to trusted local network.

## Migration Plan

1. Edit `vite.config.js` to set `server.host`, `server.allowedHosts`, `preview.host`, and `preview.allowedHosts`.
2. Edit `package.json` to update script flags.
3. Update `README.md` with updated launch commands and access links (`http://yanagi-arm-jp:3000`).
4. Test starting `npm run dev` and verify host binding.
