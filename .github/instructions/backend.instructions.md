---
description: "Use when writing Rust code in the backend: adding Tauri commands, error types, logging, date/time handling, or platform-specific code. Covers Tauri v2 patterns, AppError, send_log_with_handle, and module structure."
applyTo: "backend/src/**"
---

# Rust Backend Conventions

## Adding a Tauri Command

1. Add the function to [backend/src/command.rs](../../../backend/src/command.rs).
2. Register it in [backend/src/main.rs](../../../backend/src/main.rs) inside `tauri::generate_handler![]`.

```rust
// command.rs
use tauri::AppHandle;
use tauri_vue3_app_lib::{send_log_with_handle, LogLevel};

#[tauri::command]
pub async fn my_command(app: AppHandle, param: String) -> Result<String, String> {
    send_log_with_handle(&app, LogLevel::Info, &format!("my_command called: {}", param));
    // ... implementation ...
    Ok(result)
}
```

```rust
// main.rs — add to generate_handler!
tauri::generate_handler![echo_message, get_app_version, process_data, my_command]
```

Tauri commands **must** return `Result<T, String>`.

## Logging — Never Use `println!`

Always use `send_log_with_handle` from `lib.rs`:

```rust
use tauri_vue3_app_lib::{send_log_with_handle, LogLevel};

send_log_with_handle(&app, LogLevel::Info, "Processing started");
send_log_with_handle(&app, LogLevel::Warn, "Unexpected state");
send_log_with_handle(&app, LogLevel::Error, &format!("Failed: {}", e));
```

Available levels: `LogLevel::Debug`, `LogLevel::Info`, `LogLevel::Warn`, `LogLevel::Error`.

## Error Handling

Add new variants to `AppError` in [backend/src/error.rs](../../../backend/src/error.rs):

```rust
// error.rs
#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("Processing error: {0}")]
    Process(String),
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
    // Add your variant here
    #[error("My error: {0}")]
    MyError(String),
}
```

Convert to `String` for Tauri commands via the existing `From<AppError> for String` impl:

```rust
some_op().map_err(AppError::MyError)?.map_err(|e| e.to_string())?
```

## Date / Time

Use `jiff`. **Never use `chrono`.**

```rust
use jiff::Zoned;
let now = Zoned::now();
```

## Module Structure

- `lib.rs` — public API only; re-export `send_log_with_handle`, `LogLevel`, `AppError`
- Keep all other modules private; expose only what `lib.rs` explicitly re-exports
- `logging.rs` — logging internals; `ResultExt` trait for chaining log on error

## Platform-Specific Code

```rust
#[cfg(target_os = "macos")]
fn macos_only() { ... }

#[cfg(windows)]
fn windows_only() { ... }
```

macOS-specific crates (`cocoa`, `core-foundation`, etc.) are already in `Cargo.toml` under `[target.'cfg(target_os = "macos")'.dependencies]`.

## Cargo / Version Management

**Never edit `Cargo.toml` version directly.** Version is sourced from `.env` and synced via `scripts/sync-version.sh`.

This is a template project — keep `Cargo.toml` dependencies generic; downstream projects add their own crates.
