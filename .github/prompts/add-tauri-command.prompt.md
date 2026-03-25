---
description: "Add a new Tauri command end-to-end: Rust implementation, main.rs registration, TypeScript invocation, and i18n strings for all 6 locales."
argument-hint: "Command name and what it should do (e.g. 'read_config — read a JSON config file and return its contents')"
agent: "agent"
---

Add a new Tauri command end-to-end. The command name and purpose are provided in my message.

Follow these steps in order:

## Step 1 — Rust: Implement the command

Add the command function to [backend/src/command.rs](../../backend/src/command.rs).

Rules:

- Function must be `pub async` with `#[tauri::command]`
- Accept `app: AppHandle` as the last parameter (import `use tauri::AppHandle`)
- Log start and completion with `send_log_with_handle(&app, LogLevel::Info, "…")`
- Return `Result<T, String>` — never panic
- For new error cases, add a variant to `AppError` in [backend/src/error.rs](../../backend/src/error.rs)
- Use `jiff` for any date/time operations (never `chrono`)

## Step 2 — Rust: Register the command

Add the new function to `tauri::generate_handler![]` in [backend/src/main.rs](../../backend/src/main.rs).

## Step 3 — TypeScript: Add type definitions (if needed)

If the command returns a structured object, add an interface to the appropriate file in `frontend/src/interfaces/` or `frontend/src/types/`.

## Step 4 — TypeScript: Call the command

Show how to invoke the command from the frontend:

```typescript
import { invoke } from "@tauri-apps/api/core";
const result = await invoke<ReturnType>("command_name", { param: value });
```

If appropriate, add a composable in `frontend/src/composables/` to encapsulate the call.

## Step 5 — i18n: Add UI strings

Add all new UI strings (labels, messages, errors) to **all 6 locale files**:

- `frontend/src/locales/en.yaml`
- `frontend/src/locales/ja.yaml`
- `frontend/src/locales/fr.yaml`
- `frontend/src/locales/ko.yaml`
- `frontend/src/locales/zhHans.yaml`
- `frontend/src/locales/zhHant.yaml`

## Step 6 — Verify

Run the following to confirm no type or lint errors:

```bash
cd backend && cargo check
pnpm run type-check
pnpm run lint
```
