use thiserror::Error;

/// Represents application-level errors shared across backend commands.
#[derive(Error, Debug)]
pub enum AppError {
    #[error("Processing failed: {0}")]
    Process(String),

    #[error("Filesystem error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Command execution failed: {0}")]
    CommandFailed(String),

    #[error("Path conversion error")]
    PathConversion,

    #[error("General error: {0}")]
    General(String),
}

/// Converts `AppError` into `String` for Tauri command boundaries.
impl From<AppError> for String {
    fn from(error: AppError) -> Self {
        error.to_string()
    }
}
