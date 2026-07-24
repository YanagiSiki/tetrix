## Why

Currently, running the development or preview server restricts access strictly to `localhost` (`127.0.0.1`), preventing access across the local network and blocking custom domain resolution for `yanagi-arm-jp`. Configuring Vite's server options to bind to network interfaces (`0.0.0.0`) and explicitly permitting the `yanagi-arm-jp` host header ensures seamless multi-device and custom host access.

## What Changes

- **Vite Server Host & Allowed Hosts Binding**: Update `vite.config.js` to set `server.host: '0.0.0.0'` (or `true`) and `server.allowedHosts: ['yanagi-arm-jp', 'localhost', '127.0.0.1']` (or `true`).
- **Preview Server Host Binding**: Update `preview` section in `vite.config.js` to enable external network binding and host permission for `yanagi-arm-jp`.
- **Package Scripts Update**: Update `package.json` scripts (`"dev": "vite --host 0.0.0.0"`, `"preview": "vite preview --host 0.0.0.0"`).
- **Documentation Update**: Update `README.md` with instructions on accessing the application via `http://yanagi-arm-jp:3000`.

## Capabilities

### New Capabilities
- `host-binding-config`: Vite dev and preview server configuration enabling `0.0.0.0` network interface binding and `yanagi-arm-jp` domain header validation.

### Modified Capabilities
*(None - introducing server configuration update)*

## Impact

- `vite.config.js`: Server & preview configuration (`host`, `port: 3000`, `allowedHosts`).
- `package.json`: Updated script parameters.
- `README.md`: Updated local access documentation.
