// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;

fn main() {
    tauri::Builder::default()
        // Initialize Tauri plugins
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        // Register command handlers
        .invoke_handler(tauri::generate_handler![
            command::echo_message,
            command::get_app_version,
            command::process_data
        ])
        .setup(|app| {
            // Initialize logging system with app handle
            tauri_vue3_app_lib::init_logging(app.handle().clone());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
