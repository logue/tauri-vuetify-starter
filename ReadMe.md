# Tauri Vue3 Template

A modern desktop application template built with Tauri v2 and Vue 3.

## Features

- 🎨 Beautiful UI with Vuetify 3 Material Design
- 🌍 Multi-language support (i18n)
- 🌓 Dark/Light theme
- 📦 State management with Pinia
- 🗂️ File system operations with Tauri plugins
- 🔔 System notifications
- 🚀 Fast and lightweight Rust backend
- 📱 Cross-platform (Windows, macOS, Linux)

## Tech Stack

### Frontend

- Vue 3 (Composition API)
- TypeScript
- Vuetify 3
- Pinia
- Vue I18n
- Vite

### Backend

- Rust
- Tauri v2
- Tauri Plugins (dialog, fs, notification, opener, os)

## Development

### Prerequisites

- Node.js >= 24
- pnpm >= 10
- Rust >= 1.93.1
- Tauri CLI

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev:tauri
```

### Build

```bash
# Build for production
pnpm run build:tauri
```

## Project Structure

See [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) for detailed project structure.

## Customization

1. Update app name in `app/src-tauri/Cargo.toml` and `app/src-tauri/tauri.conf.json`
2. Update package metadata in `package.json`
3. Replace icons in `app/src-tauri/icons/`
4. Customize `app/src/components/MainContent.vue` with your own logic
5. Add your own Tauri commands in `app/src-tauri/src/command.rs`
6. Update localization files in `app/src/locales/`

## License

MIT
