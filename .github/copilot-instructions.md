# Tauri Vue3 Template — AI Agent Instructions

## Architecture

**Tauri v2 desktop app** — Vue 3 (TypeScript) frontend + Rust backend, pnpm monorepo.

| Layer     | Location        | Key Tech                             |
| --------- | --------------- | ------------------------------------ |
| Frontend  | `frontend/src/` | Vue 3, Vuetify 4, Pinia, vue-i18n 11 |
| Backend   | `backend/src/`  | Rust (edition 2024), Tauri v2        |
| Docs site | `docs/`         | Nuxt 3 Content (separate workspace)  |

**Prerequisites**: Node.js ≥ 24, pnpm ≥ 10, Rust ≥ 1.94, Tauri CLI

> **Template note**: This is a base template project. Downstream projects fork this repo and customize `.env`. Keep the template generic — no project-specific logic should be added here.

## Build & Test Commands

```bash
# Install (repo root)
pnpm install

# Development — hot reload for frontend + Rust
pnpm run dev:tauri

# Frontend only
pnpm run dev

# Type-check / lint
pnpm run type-check
pnpm run lint && pnpm run lint:style

# Tauri builds
pnpm run build:tauri                     # current platform
pnpm --filter frontend build:tauri:mac   # macOS Universal binary (Apple Silicon + Intel)
./scripts/docker/docker-build.sh x64    # Linux via Docker (see docs/content/en/build-linux-docker.md)
pnpm run package:chocolatey              # Windows .nuspec
pnpm run package:homebrew               # macOS .rb formula

# Rust only
cd backend && cargo test
cd backend && cargo build --release
```

## Critical Conventions

### Version & Config — `.env` is the Source of Truth

All app metadata (name, version, URLs, author) lives in [.env](.env). When changing the version, run `scripts/sync-version.sh` (or `scripts/update-version.ps1`) — this syncs to `Cargo.toml`, `package.json`, and `tauri.conf.json`. **Never edit those files directly.**

### Rust Backend

**Adding a new command** — add to [backend/src/command.rs](backend/src/command.rs), then register in [backend/src/main.rs](backend/src/main.rs):

```rust
#[tauri::command]
async fn my_command(app: AppHandle, param: String) -> Result<String, String> {
    send_log_with_handle(&app, LogLevel::Info, "Starting my_command");
    // ...
    Ok(result)
}
```

- **Logging**: Use `send_log_with_handle(&app, LogLevel::Info, "…")` from [backend/src/lib.rs](backend/src/lib.rs). Never use `println!`.
- **Date/time**: Use `jiff` crate (not `chrono`).
- **Errors**: Add variants to `AppError` in [backend/src/error.rs](backend/src/error.rs) (thiserror-based). Tauri commands must return `Result<T, String>`.
- **Module privacy**: Keep modules private; re-export only public API via `lib.rs`.

### Frontend

**UI strings** — must be added to **all 6 locale files**: `frontend/src/locales/{en,ja,fr,ko,zhHans,zhHant}.yaml`. Never hard-code display text.

**Calling Tauri commands**:

```typescript
import { invoke } from "@tauri-apps/api/core";
const result = await invoke<string>("my_command", { param: "value" });
```

**HTTP requests** — use `unified-network` (already configured), not native `fetch`.

**State management**:

- `ConfigStore` — theme + locale (persisted via `pinia-plugin-persistedstate`)
- `GlobalStore` — transient UI state (loading, progress, messages)

**pnpm scoping**: Always `pnpm --filter frontend <cmd>` for frontend-only operations.

## Key Files

| File                                                                               | Purpose                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| [backend/src/command.rs](backend/src/command.rs)                                   | Tauri commands — add new commands here         |
| [backend/src/main.rs](backend/src/main.rs)                                         | App entry — register commands + plugins        |
| [backend/src/error.rs](backend/src/error.rs)                                       | `AppError` variants                            |
| [backend/src/lib.rs](backend/src/lib.rs)                                           | Public API: `send_log_with_handle`, `LogLevel` |
| [frontend/src/components/MainContent.vue](frontend/src/components/MainContent.vue) | Main UI component                              |
| [.env](.env)                                                                       | App metadata & version (source of truth)       |

## Platform Build Docs

See `docs/content/en/` for detailed platform guides:

- [build-linux.md](docs/content/en/build-linux.md) / [build-linux-docker.md](docs/content/en/build-linux-docker.md)
- [build-macos.md](docs/content/en/build-macos.md)
- [build-windows.md](docs/content/en/build-windows.md)
- [publishing.md](docs/content/en/publishing.md) — Chocolatey & Homebrew packaging

## Notes

- `AI_INSTRUCTIONS.md` in the repo root is a legacy migration guide for converting the original image app to this template — it can be ignored for regular development.
- Platform-specific Rust code: `#[cfg(target_os = "macos")]` / `#[cfg(windows)]`.
