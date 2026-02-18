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

## Customization

### 1. Configure Application Settings

Edit `.env` file to customize your application:

```bash
# Application Information
APP_NAME=Your App Name
APP_NAME_KEBAB=your-app-name
APP_DESCRIPTION=Your app description
APP_SUMMARY=Short summary

# Author Information
AUTHOR_NAME=Your Name
AUTHOR_EMAIL=your@email.com

# GitHub Repository
GITHUB_USER=username
GITHUB_REPO=repository-name

# URLs
PROJECT_URL=https://github.com/username/repository
HOMEPAGE_URL=https://yourdomain.com
DOCS_URL=https://yourdomain.com/docs
```

### 2. Update Package Metadata

The build scripts automatically generate package files from `.env`:

- Chocolatey: `.choco/app.nuspec.template` → `.choco/{APP_NAME_KEBAB}.nuspec`
- Homebrew: `.homebrew/app.rb.template` → `.homebrew/{APP_NAME_KEBAB}.rb`

### 3. Synchronize Version Numbers

After changing `VERSION` in `.env`, run the version sync script to update all configuration files:

**Windows (PowerShell):**

```powershell
.\scripts\update-version.ps1
```

**macOS/Linux (Bash):**

```bash
./scripts/update-version.sh
```

This will automatically update:

- `app/package.json`
- `app/src-tauri/tauri.conf.json`
- `app/src-tauri/Cargo.toml`

### 4. Other Customizations

1. Replace icons in `app/src-tauri/icons/`
2. Customize `app/src/components/MainContent.vue` with your own logic
3. Add your own Tauri commands in `app/src-tauri/src/command.rs`
4. Update localization files in `app/src/locales/`

## Project Structure

See [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) for detailed project structure.

## License

MIT
