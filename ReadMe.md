<figure align="center">

![logo](./backend/icons/Square284x284Logo.png)

</figure>

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

## Use cases

- [vrm2sl](https://github.com/logue/vrm2sl) - VRM (glTF) mesh model to Second Life avatar converter.
- [Drop Compress Image](https://logue.dev/DropWebP) - Next generation image converter. (avif, webp, jpeg-xl, webp, jpeg-li, zopfli png)

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

- `frontend/package.json`
- `backend/tauri.conf.json`
- `backend/Cargo.toml`

### 4. Other Customizations

1. Replace icons in `backend/icons/`
2. Customize `frontend/src/components/MainContent.vue` with your own logic
3. Add your own Tauri commands in `backend/src/command.rs`
4. Update localization files in `frontend/src/locales/`
5. Edit `backend/setup-vcpkg.sh` and `backend/setup-vcpkg.ps1` to statically link any vcpkg libraries your app needs

## Project Structure

```
.
├─ frontend/                # Frontend (Vue 3 + Vite + Vuetify)
│  ├─ src/
│  │  ├─ components/         # UI components
│  │  ├─ composables/        # Reusable logic (hooks)
│  │  ├─ locales/            # i18n YAML files
│  │  ├─ plugins/            # Vuetify, i18n, etc.
│  │  ├─ store/              # Pinia stores
│  │  ├─ styles/             # Global styles
│  │  └─ types/              # Frontend types
├─ backend/                 # Rust backend (Tauri)
│  └─ src/
│     ├─ main.rs            # Tauri entry
│     ├─ command.rs         # Tauri commands
│     ├─ error.rs           # App error types
│     ├─ logging.rs         # Logging helpers
│     └─ lib.rs             # Public exports
├─ docs/                     # Documentation site (Nuxt)
├─ scripts/                  # Utility scripts (version sync, etc.)
├─ .env                      # App configuration
└─ ReadMe.md                 # Project overview
```

- frontend/src is the Vue frontend and UI logic.
- backend/src is the Rust backend for Tauri commands.
- docs is the static documentation site.

## License

©2026 by Logue. Licensed under the [MIT License](LICENSE).

This template is not officially endorsed by tauri.

## 🎨 Crafted for Developers

This template is built with a focus on **UI/UX excellence** and **modern developer experience**. Maintaining it involves constant testing and updates to ensure everything works seamlessly.

If you appreciate the attention to detail in this project, a small sponsorship would go a long way in supporting my work across the Vue.js and Metaverse ecosystems.

[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)
