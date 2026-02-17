//! Tauri Command Handlers
//!
//! This module contains all Tauri commands that can be invoked from the frontend.

use tauri::AppHandle;
use tauri_vue3_app_lib::{send_log_with_handle, LogLevel};

/// Example command: Echo back the input message
///
/// # Arguments
/// * `message` - The message to echo
/// * `app` - Tauri application handle
///
/// # Returns
/// * `Ok(String)` - The echoed message
/// * `Err(String)` - Error message if something goes wrong
#[tauri::command]
pub async fn echo_message(message: String, app: AppHandle) -> Result<String, String> {
    send_log_with_handle(&app, LogLevel::Info, &format!("Received message: {}", message));

    let result = format!("Echo: {}", message);
    send_log_with_handle(&app, LogLevel::Info, "Message echoed successfully");

    Ok(result)
}

/// Get the application version
///
/// # Returns
/// * `Ok(String)` - The application version
#[tauri::command]
pub async fn get_app_version() -> Result<String, String> {
    Ok(env!("CARGO_PKG_VERSION").to_string())
}

/// Example command: Process some data
///
/// # Arguments
/// * `data` - Input data to process
/// * `options` - Processing options (example)
/// * `app` - Tauri application handle
///
/// # Returns
/// * `Ok(String)` - Processed result
/// * `Err(String)` - Error message
#[tauri::command]
pub async fn process_data(
    data: String,
    options: Option<serde_json::Value>,
    app: AppHandle,
) -> Result<String, String> {
    send_log_with_handle(&app, LogLevel::Info, "Processing data...");

    // Example processing logic
    let result = if let Some(opts) = options {
        format!("Processed '{}' with options: {}", data, opts)
    } else {
        format!("Processed '{}' with default options", data)
    };

    send_log_with_handle(&app, LogLevel::Info, "Processing complete");
    Ok(result)
}
