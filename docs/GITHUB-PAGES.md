# GitHub Pages

AI Second Brain uses GitHub Pages as the free browser-based test/demo package.

## Deployment

The dedicated `.github/workflows/pages.yml` workflow builds the Vite application and deploys the generated `dist/` directory to GitHub Pages from `main`. The workflow validates that the version in `package.json` and `VERSION` matches its configured release version before building.

The `.github/workflows/ci.yml` workflow is separate: it installs dependencies, verifies version consistency, builds the app, and runs tests for pushes and pull requests. It does not deploy Pages, so CI and deployment responsibilities remain independent.

In repository settings, configure **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Browser mode

The browser package can run the UI without a local service. Features requiring private machine resources use the configured local API or another explicitly approved backend.

Supported local-service connections include:

- `http://127.0.0.1:8787` for the AI Second Brain API
- `http://127.0.0.1:11434` for Ollama through the local API proxy

No cloud account or paid AI provider is required for the local mode.

## GitHub Pages limitation

GitHub Pages itself cannot execute MySQL, Ollama, compilers, native build workers, or arbitrary local commands. The page therefore acts as the browser frontend while those capabilities remain on the user's machine or an explicitly configured server.
