use crate::error::AppError;
use std::sync::OnceLock;
use tauri::{AppHandle, Emitter};

// Stores a global AppHandle used for log event emission.
static APP_HANDLE: OnceLock<AppHandle> = OnceLock::new();

/// Represents supported log levels emitted to the frontend.
#[derive(Debug, Clone, Copy)]
#[allow(dead_code)]
pub enum LogLevel {
    Debug,
    Info,
    Warn,
    Error,
}

impl LogLevel {
    /// Returns the lowercase string value for the log level.
    ///
    /// # Returns
    ///
    /// Lowercase log level string.
    pub fn as_str(&self) -> &'static str {
        match self {
            LogLevel::Debug => "debug",
            LogLevel::Info => "info",
            LogLevel::Warn => "warn",
            LogLevel::Error => "error",
        }
    }
}

/// Initialize the logging system with AppHandle
///
/// # Arguments
///
/// * `app_handle` - Application handle used to emit log events.
pub fn init_logging(app_handle: AppHandle) {
    if APP_HANDLE.set(app_handle).is_err() {
        eprintln!("Warning: Logging system already initialized");
    }
}

/// Send log message to frontend
///
/// # Arguments
///
/// * `level` - Log level metadata.
/// * `message` - Log message text.
pub fn send_log(level: LogLevel, message: &str) {
    if let Some(app_handle) = APP_HANDLE.get() {
        let log_data = serde_json::json!({
            "level": level.as_str(),
            "message": message,
            "timestamp": jiff::Zoned::now().to_string()
        });

        if let Err(e) = app_handle.emit("log-message", &log_data) {
            eprintln!("Failed to send log message: {}", e);
        }
    } else {
        // Fallback to console if logging not initialized
        eprintln!("[{}] {}", level.as_str().to_uppercase(), message);
    }
}

/// Send log message with AppHandle (for use in async contexts)
///
/// # Arguments
///
/// * `app_handle` - Explicit application handle.
/// * `level` - Log level metadata.
/// * `message` - Log message text.
#[allow(dead_code)]
pub fn send_log_with_handle(app_handle: &AppHandle, level: LogLevel, message: &str) {
    let log_data = serde_json::json!({
        "level": level.as_str(),
        "message": message,
        "timestamp": jiff::Zoned::now().to_string()
    });

    if let Err(e) = app_handle.emit("log-message", &log_data) {
        eprintln!("Failed to send log message: {}", e);
    }
}

/// Log AppError with automatic error-level logging
///
/// # Arguments
///
/// * `error` - Application error to log.
/// * `context` - Optional operation context.
pub fn log_app_error(error: &AppError, context: Option<&str>) {
    let message = match context {
        Some(ctx) => format!("{}: {}", ctx, error),
        None => error.to_string(),
    };

    send_log(LogLevel::Error, &message);

    // Also log to console for debugging
    eprintln!("AppError: {}", message);
}

/// Convenience macros for logging
#[macro_export]
macro_rules! log_debug {
    ($($arg:tt)*) => {
        $crate::logging::send_log($crate::logging::LogLevel::Debug, &format!($($arg)*))
    };
}

#[macro_export]
macro_rules! log_info {
    ($($arg:tt)*) => {
        $crate::logging::send_log($crate::logging::LogLevel::Info, &format!($($arg)*))
    };
}

#[macro_export]
macro_rules! log_warn {
    ($($arg:tt)*) => {
        $crate::logging::send_log($crate::logging::LogLevel::Warn, &format!($($arg)*))
    };
}

#[macro_export]
macro_rules! log_error {
    ($($arg:tt)*) => {
        $crate::logging::send_log($crate::logging::LogLevel::Error, &format!($($arg)*))
    };
}

/// Result extension for convenient error logging
pub trait ResultExt<T, E> {
    /// Logs an `AppError` when the result is `Err` and returns the original result.
    ///
    /// # Arguments
    ///
    /// * `context` - Optional operation context.
    ///
    /// # Returns
    ///
    /// The original `Result` value.
    fn log_error(self, context: Option<&str>) -> Self;
}

impl<T> ResultExt<T, AppError> for Result<T, AppError> {
    fn log_error(self, context: Option<&str>) -> Self {
        if let Err(ref error) = self {
            log_app_error(error, context);
        }
        self
    }
}
