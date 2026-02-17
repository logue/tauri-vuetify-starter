# Tauri v2 + Vue 3 デスクトップアプリケーション テンプレート作成ガイド

このガイドは、Drop Compress Imageプロジェクトから画像変換ビジネスロジックを除去し、汎用的なTauri v2 + Vue 3デスクトップアプリケーションテンプレートを作成するための手順書です。

## 🎯 テンプレートの特徴

作成されるテンプレートは以下の技術スタックを持つ、モダンなデスクトップアプリケーションの基盤となります：

### フロントエンド

- **Vue 3** (Composition API)
- **TypeScript** (型安全な開発)
- **Vuetify 3** (Material Design コンポーネント)
- **Pinia** (状態管理、永続化サポート付き)
- **Vue I18n** (多言語対応)
- **Vite** (高速ビルドツール)

### バックエンド

- **Tauri v2** (Rustベース)
- **Essential Tauri Plugins**:
  - dialog (ファイル/フォルダ選択)
  - fs (ファイルシステム操作)
  - notification (通知)
  - opener (外部リンク・ファイル)
  - os (OS情報取得)

### ビルド環境

- **pnpm monorepo** (app/ と docs/パッケージ)
- **ESLint + Prettier + Stylelint** (コード品質管理)
- **Husky** (Git hooks)
- **Docker build scripts** (クロスプラットフォームビルド)

## 📂 ディレクトリ構造

```
your-app-name/
├── app/                          # メインアプリケーション
│   ├── src/                      # Vue 3 フロントエンド
│   │   ├── components/          # Vue コンポーネント
│   │   │   ├── AppBarMenuComponent.vue     # アプリバーメニュー（汎用）
│   │   │   ├── LocaleSelector.vue          # 言語切り替え
│   │   │   ├── MainContent.vue             # メインコンテンツ（要カスタマイズ）
│   │   │   └── modals/                     # モーダルコンポーネント
│   │   ├── composables/         # Vue Composables
│   │   │   ├── useLogger.ts                # ログ管理
│   │   │   ├── useNotification.ts          # 通知管理
│   │   │   └── useFileSystem.ts            # ファイルシステム操作
│   │   ├── interfaces/          # TypeScript 型定義
│   │   │   └── MetaInterface.ts
│   │   ├── locales/             # i18n 翻訳ファイル（YAML）
│   │   │   └── *.yml
│   │   ├── plugins/             # Vue プラグイン
│   │   │   ├── i18n.ts                     # Vue I18n 設定
│   │   │   └── vuetify.ts                  # Vuetify 設定
│   │   ├── store/               # Pinia ストア
│   │   │   ├── ConfigStore.ts              # テーマ・言語設定
│   │   │   ├── GlobalStore.ts              # グローバル状態
│   │   │   └── index.ts
│   │   ├── styles/              # スタイルシート
│   │   │   └── settings.scss               # Vuetify カスタマイズ
│   │   ├── App.vue              # ルートコンポーネント
│   │   └── main.ts              # エントリポイント
│   ├── src-tauri/               # Rust バックエンド
│   │   ├── src/
│   │   │   ├── lib.rs                      # パブリックAPI
│   │   │   ├── command.rs                  # Tauri コマンド
│   │   │   ├── error.rs                    # エラー型
│   │   │   └── logging.rs                  # ロギングシステム
│   │   ├── Cargo.toml           # Rust 依存関係
│   │   ├── tauri.conf.json      # Tauri 設定
│   │   └── build.rs             # ビルドスクリプト
│   ├── package.json
│   └── vite.config.ts           # Vite 設定
├── docs/                         # ドキュメントサイト（Nuxt 3）
│   ├── content/                 # Nuxt Content（マークダウン）
│   ├── package.json
│   └── nuxt.config.ts
├── scripts/                      # ビルドスクリプト
│   ├── build-homebrew.sh
│   ├── build-chocolatey.ps1
│   └── docker/                  # Docker ビルド
├── .env                         # バージョン管理
├── package.json                 # ルートパッケージ
└── pnpm-workspace.yaml          # pnpm ワークスペース設定
```

## 🗑️ 削除すべきビジネスロジック（画像変換固有）

### Rustバックエンド（`app/src-tauri/`）

#### 完全削除するファイル

```
src-tauri/src/
├── decoder.rs                   # 画像デコーダー
├── encoder.rs                   # 画像エンコーダー
├── encoder/                     # エンコーダー実装
│   ├── avif.rs
│   ├── jxl.rs
│   ├── webp.rs
│   ├── png.rs
│   ├── jpeg.rs
│   └── progress.rs
├── options.rs                   # エンコードオプション
└── decoder/                     # デコーダー実装（もし存在する場合）
```

#### 削除する依存関係（`Cargo.toml`）

```toml
# 画像処理関連のクレート
image = "0.25.9"
imgref = "1.12.0"
jpeg2k = "0.10.1"
jpegli_rs = { ... }
jxl-sys = "0.1.5"
libavif-sys = { ... }
libwebp-sys = "0.14.2"
openjpeg-sys = "1.0.12"
oxipng = "10.1.0"
png = "0.18.1"
rgb = "0.8.52"
lcms2 = "6.1.1"
kamadak-exif = "0.6.1"
bytemuck = "1.25.0"
flate2 = "1.1.9"
```

#### 保持する依存関係

```toml
# コア機能
serde = "1.0.228"
serde_json = "1.0.149"
thiserror = "2.0.18"
jiff = { version = "0.2.20", features = ["serde"] }
tempfile = "3.25.0"

# Tauri本体とプラグイン
tauri = { version = "2.10.2", features = [] }
tauri-plugin-dialog = "2.6.0"
tauri-plugin-fs = "2.4.5"
tauri-plugin-log = "2.8.0"
tauri-plugin-notification = "2.3.3"
tauri-plugin-opener = "2.5.3"
tauri-plugin-os = "2.3.2"

# ビルド依存関係
[build-dependencies]
tauri-build = { version = "2.5.3", features = [] }
```

#### 修正が必要なファイル

**`src-tauri/src/lib.rs`**

```rust
// 画像処理関連のモジュールとエクスポートを削除
// mod decoder;
// mod encoder;
// mod options;
// pub use decoder::*;
// pub use encoder::*;
// pub use options::*;

mod error;
mod logging;

pub use error::AppError;
pub use logging::{LogLevel, ResultExt, init_logging, send_log};
```

**`src-tauri/src/command.rs`**

```rust
// convert(), convert_with_progress() などの画像変換コマンドを削除
// 代わりに、サンプルの汎用コマンドを追加

use crate::error::AppError;
use crate::logging::{LogLevel, send_log_with_handle};
use tauri::AppHandle;

/// サンプル: 文字列を処理して返すコマンド
#[tauri::command]
pub async fn process_data(
    input: String,
    app: AppHandle,
) -> Result<String, String> {
    send_log_with_handle(&app, LogLevel::Info, "Processing data...");

    // ここにビジネスロジックを追加
    let result = format!("Processed: {}", input);

    send_log_with_handle(&app, LogLevel::Info, "Processing complete");
    Ok(result)
}
```

**`src-tauri/src/main.rs` または `lib.rs` の `run()` 関数**

```rust
// 画像変換コマンドの登録を削除し、新しいコマンドに置き換え
tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_notification::init())
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_log::Builder::new().build())
    .invoke_handler(tauri::generate_handler![
        command::process_data  // 新しいコマンド
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

### Vue フロントエンド（`app/src/`）

#### 完全削除するファイル

```
src/
├── composables/
│   ├── useImageConverter.ts              # 画像変換処理
│   ├── useImageConversionController.ts   # 変換コントローラー
│   ├── useConversionState.ts             # 変換状態管理
│   ├── useDragAndDrop.ts                 # ドラッグ&ドロップ（画像特化）
│   └── usePaste.ts                       # ペースト処理（画像特化）
├── interfaces/
│   ├── AvifOptions.ts
│   ├── JpegOptions.ts
│   ├── JxlOptions.ts
│   ├── PngOptions.ts
│   ├── WebpOptions.ts
│   ├── CommonOptions.ts
│   ├── EncodeOptions.ts
│   └── PathInfo.ts
├── types/
│   ├── AvifTypes.ts
│   ├── JxlTypes.ts
│   ├── ProgressEvent.ts
│   └── SettingsTypes.ts
├── store/
│   └── SettingsStore.ts                  # 画像変換設定
└── assets/
    └── sounds/                            # 通知音（オプション）
```

#### 保持するファイル

```
src/
├── components/
│   ├── AppBarMenuComponent.vue           # 汎用アプリバーメニュー
│   ├── LocaleSelector.vue                # 言語切り替え
│   └── MainContent.vue                   # メインコンテンツ（要カスタマイズ）
├── composables/
│   ├── useFileSystem.ts                  # ファイルシステム操作（汎用）
│   ├── useLogger.ts                      # ロギング（汎用）
│   ├── useNotification.ts                # 通知（汎用）
│   └── useFormatConfig.ts                # 削除または汎用化
├── interfaces/
│   └── MetaInterface.ts                  # メタ情報（汎用）
├── locales/
│   └── *.yml                             # i18n 翻訳ファイル（内容修正必要）
├── plugins/
│   ├── i18n.ts                           # Vue I18n 設定
│   └── vuetify.ts                        # Vuetify 設定
├── store/
│   ├── ConfigStore.ts                    # テーマ・言語設定（汎用）
│   ├── GlobalStore.ts                    # グローバル状態（汎用）
│   └── index.ts
├── styles/
│   └── settings.scss
├── App.vue
└── main.ts
```

#### 修正が必要なファイル

**`src/components/MainContent.vue`**

```vue
<script setup lang="ts">
// 画像変換関連のcomposablesを削除し、汎用的な実装に変更

// 例: シンプルなファイルドロップ領域
import { ref } from 'vue';
import { useFileSystem } from '@/composables/useFileSystem';
import { useNotification } from '@/composables/useNotification';

const fileSystem = useFileSystem();
const notification = useNotification();

const droppedFiles = ref<string[]>([]);

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  // ここにファイル処理ロジックを追加
};

const handleClick = async () => {
  const files = await fileSystem.selectFiles();
  if (files) {
    droppedFiles.value = files;
    notification.success('Files selected');
  }
};
</script>

<template>
  <v-container>
    <v-card class="drop-area" @drop="handleDrop" @dragover.prevent @click="handleClick">
      <v-card-text class="text-center">
        <v-icon size="64" color="primary">mdi-cloud-upload</v-icon>
        <p>Drop files here or click to select</p>
      </v-card-text>
    </v-card>

    <v-list v-if="droppedFiles.length">
      <v-list-item v-for="file in droppedFiles" :key="file">
        {{ file }}
      </v-list-item>
    </v-list>
  </v-container>
</template>
```

**`src/locales/*.yml`**

```yaml
# 画像変換固有のメッセージを削除し、汎用的なメッセージに置き換え

# en.yml 例
app:
  title: 'My Desktop App'
  description: 'A modern desktop application'

menu:
  file: 'File'
  edit: 'Edit'
  help: 'Help'

message:
  success: 'Operation successful'
  error: 'An error occurred'
  processing: 'Processing...'

# 以下、各言語で同様の構造
```

**`src/composables/useFileSystem.ts`**

```typescript
// 画像特化の処理を削除し、汎用的なファイル操作のみ残す

import { open, save } from '@tauri-apps/plugin-dialog';
import { readFile, writeFile, exists } from '@tauri-apps/plugin-fs';

export function useFileSystem() {
  /**
   * ファイル選択ダイアログを開く
   */
  const selectFiles = async (options?: {
    multiple?: boolean;
    filters?: Array<{ name: string; extensions: string[] }>;
  }) => {
    return await open({
      multiple: options?.multiple ?? false,
      filters: options?.filters
    });
  };

  /**
   * フォルダ選択ダイアログを開く
   */
  const selectFolder = async () => {
    return await open({
      directory: true
    });
  };

  /**
   * ファイル保存ダイアログを開く
   */
  const saveFile = async (options?: {
    defaultPath?: string;
    filters?: Array<{ name: string; extensions: string[] }>;
  }) => {
    return await save({
      defaultPath: options?.defaultPath,
      filters: options?.filters
    });
  };

  /**
   * ファイル読み込み
   */
  const readFileContents = async (path: string) => {
    return await readFile(path);
  };

  /**
   * ファイル書き込み
   */
  const writeFileContents = async (path: string, data: Uint8Array | string) => {
    return await writeFile(path, data);
  };

  /**
   * ファイル存在チェック
   */
  const fileExists = async (path: string) => {
    return await exists(path);
  };

  return {
    selectFiles,
    selectFolder,
    saveFile,
    readFileContents,
    writeFileContents,
    fileExists
  };
}
```

**`package.json` の修正**

```json
{
  "name": "@your-org/app-name",
  "version": "1.0.0",
  "description": "A modern desktop application built with Tauri v2 and Vue 3",
  // ... 依存関係から画像処理関連を削除
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "@tauri-apps/api": "^2.10.1",
    "@tauri-apps/plugin-dialog": "^2.6.0",
    "@tauri-apps/plugin-fs": "^2.4.5",
    "@tauri-apps/plugin-notification": "^2.3.3",
    "@tauri-apps/plugin-opener": "^2.5.3",
    "@tauri-apps/plugin-os": "^2.3.2",
    "pinia": "^3.0.4",
    "pinia-plugin-persistedstate": "^4.7.1",
    "vue": "^3.5.28",
    "vue-i18n": "^11.2.8",
    "vuetify": "^3.11.8"
    // 削除: @vueuse/sound, unified-network（画像変換特化）
  }
}
```

### ドキュメント（`docs/`）

#### コンテンツの置き換え

```
docs/content/
├── en/
│   ├── index.md                          # プロジェクト概要（書き換え）
│   ├── installation.md                   # インストール手順（書き換え）
│   ├── usage.md                          # 使用方法（書き換え）
│   └── development.md                    # 開発ガイド（保持・修正）
└── （他の言語も同様）
```

画像変換に関する説明を削除し、テンプレートとしての使い方を記載します。

## 📋 詳細な削除・修正手順

### ステップ1: プロジェクトのクローン

```bash
# 元のプロジェクトをクローン
git clone https://github.com/logue/DropWebP.git your-app-name
cd your-app-name

# 新しいGitリポジトリを初期化
rm -rf .git
git init
```

### ステップ2: Rustバックエンドの整理

```bash
cd app/src-tauri

# 画像処理関連ファイルを削除
rm src/decoder.rs
rm src/encoder.rs
rm src/options.rs
rm -rf src/encoder/
rm -rf src/decoder/

# Cargo.tomlを編集
# - 画像処理クレートを削除
# - keywords, categories, descriptionを更新
```

**`Cargo.toml`の最小構成例:**

```toml
[package]
name = "your-app-name"
version = "1.0.0"
authors = ["Your Name"]
edition = "2024"
rust-version = "1.93.1"
description = "A modern desktop application"
repository = "https://github.com/yourname/your-app-name"
license = "MIT"
keywords = ["application", "desktop", "tauri"]
categories = ["gui"]

[lib]
name = "your_app_name_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2.5.3", features = [] }

[dependencies]
serde = "1.0.228"
serde_json = "1.0.149"
thiserror = "2.0.18"
jiff = { version = "0.2.20", features = ["serde"] }

tauri = { version = "2.10.2", features = [] }
tauri-plugin-dialog = "2.6.0"
tauri-plugin-fs = "2.4.5"
tauri-plugin-log = "2.8.0"
tauri-plugin-notification = "2.3.3"
tauri-plugin-opener = "2.5.3"
tauri-plugin-os = "2.3.2"

[profile.release]
lto = "thin"
codegen-units = 16
panic = "abort"
strip = true
opt-level = 3
```

**`src/lib.rs`の最小構成:**

```rust
mod error;
mod logging;

pub use error::AppError;
pub use logging::{LogLevel, ResultExt, init_logging, send_log};

// コマンドモジュールがある場合
// mod command;
```

**`src/command.rs`のサンプル:**

```rust
use crate::error::AppError;
use crate::logging::{LogLevel, send_log_with_handle};
use tauri::AppHandle;

/// Example command: Echo back the input
#[tauri::command]
pub async fn echo_message(
    message: String,
    app: AppHandle,
) -> Result<String, String> {
    send_log_with_handle(&app, LogLevel::Info, &format!("Received: {}", message));
    Ok(format!("Echo: {}", message))
}

/// Example command: Get app version
#[tauri::command]
pub async fn get_app_version() -> Result<String, String> {
    Ok(env!("CARGO_PKG_VERSION").to_string())
}
```

**`src/main.rs`の更新:**

```rust
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;

use your_app_name_lib::{init_logging, LogLevel};

fn main() {
    init_logging();

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            command::echo_message,
            command::get_app_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### ステップ3: Vue フロントエンドの整理

```bash
cd ../../src

# 画像変換関連ファイルを削除
rm composables/useImageConverter.ts
rm composables/useImageConversionController.ts
rm composables/useConversionState.ts
rm composables/useDragAndDrop.ts
rm composables/usePaste.ts
rm composables/useFormatConfig.ts

rm -rf interfaces/AvifOptions.ts
rm -rf interfaces/JpegOptions.ts
rm -rf interfaces/JxlOptions.ts
rm -rf interfaces/PngOptions.ts
rm -rf interfaces/WebpOptions.ts
rm -rf interfaces/CommonOptions.ts
rm -rf interfaces/EncodeOptions.ts
rm -rf interfaces/PathInfo.ts

rm -rf types/AvifTypes.ts
rm -rf types/JxlTypes.ts
rm -rf types/ProgressEvent.ts
rm -rf types/SettingsTypes.ts

rm -rf store/SettingsStore.ts

rm -rf assets/sounds/
```

**`src/components/MainContent.vue`を汎用化:**

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { useGlobalStore } from '@/store';
import { useNotification } from '@/composables/useNotification';

const globalStore = useGlobalStore();
const notification = useNotification();

const inputText = ref('');
const outputText = ref('');

const handleProcess = async () => {
  if (!inputText.value) {
    notification.error('Please enter text');
    return;
  }

  globalStore.setLoading(true);

  try {
    const result = await invoke<string>('echo_message', {
      message: inputText.value
    });
    outputText.value = result;
    notification.success('Processed successfully');
  } catch (error) {
    notification.error(`Error: ${error}`);
  } finally {
    globalStore.setLoading(false);
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Sample Application</v-card-title>
          <v-card-text>
            <v-textarea v-model="inputText" label="Input Text" rows="3" />
            <v-btn color="primary" @click="handleProcess">Process</v-btn>
            <v-textarea v-model="outputText" label="Output" rows="3" readonly class="mt-4" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
```

**`src/locales/en.yml`の汎用化:**

```yaml
app:
  title: 'Your App Name'
  description: 'A modern desktop application'

menu:
  file: 'File'
  open: 'Open'
  save: 'Save'
  quit: 'Quit'
  edit: 'Edit'
  preferences: 'Preferences'
  view: 'View'
  help: 'Help'
  about: 'About'
  documentation: 'Documentation'

message:
  success: 'Operation successful'
  error: 'An error occurred'
  processing: 'Processing...'
  loading: 'Loading...'
  saved: 'Saved successfully'
  cancelled: 'Operation cancelled'

button:
  ok: 'OK'
  cancel: 'Cancel'
  save: 'Save'
  close: 'Close'
  apply: 'Apply'

label:
  input: 'Input'
  output: 'Output'
  settings: 'Settings'
  language: 'Language'
  theme: 'Theme'

theme:
  light: 'Light'
  dark: 'Dark'
  auto: 'Auto'
```

### ステップ4: 依存関係のクリーンアップ

**ルート`package.json`の更新:**

```json
{
  "name": "your-app-name",
  "description": "A modern desktop application built with Tauri v2 and Vue 3",
  "license": "MIT",
  "type": "module",
  "private": true,
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "homepage": "https://yourdomain.com/your-app-name",
  "repository": {
    "type": "git",
    "url": "git@github.com:yourname/your-app-name.git"
  },
  "engines": {
    "node": ">=24",
    "pnpm": ">=10"
  },
  "packageManager": "pnpm@10.29.3",
  "scripts": {
    "dev": "pnpm --filter app dev",
    "dev:tauri": "pnpm --filter app dev:tauri",
    "build": "pnpm --filter app build",
    "build:tauri": "pnpm --filter app build:tauri",
    "lint": "pnpm --filter app lint",
    "type-check": "pnpm --recursive exec vue-tsc --build --force",
    "prepare": "husky"
  }
}
```

**`app/package.json`の更新:**

```json
{
  "name": "@your-org/app",
  "version": "1.0.0",
  "description": "Your app description",
  "license": "MIT",
  "type": "module",
  "private": true,
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "@tauri-apps/api": "^2.10.1",
    "@tauri-apps/plugin-dialog": "^2.6.0",
    "@tauri-apps/plugin-fs": "^2.4.5",
    "@tauri-apps/plugin-notification": "^2.3.3",
    "@tauri-apps/plugin-opener": "^2.5.3",
    "@tauri-apps/plugin-os": "^2.3.2",
    "pinia": "^3.0.4",
    "pinia-plugin-persistedstate": "^4.7.1",
    "vue": "^3.5.28",
    "vue-i18n": "^11.2.8",
    "vuetify": "^3.11.8"
  }
}
```

### ステップ5: 設定ファイルの更新

**`app/src-tauri/tauri.conf.json`:**

```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "your-app-name",
  "mainBinaryName": "Your App Name",
  "version": "1.0.0",
  "identifier": "com.yourdomain.your-app-name",
  "build": {
    "beforeDevCommand": "pnpm dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "pnpm build-only",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "Your App Name",
        "width": 1000,
        "height": 700,
        "minWidth": 800,
        "minHeight": 600,
        "resizable": true,
        "fullscreen": false,
        "transparent": false
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "publisher": "Your Name",
    "category": "Utility",
    "shortDescription": "A modern desktop application",
    "longDescription": "Your app full description",
    "targets": ["dmg", "msi", "deb", "rpm", "appimage"],
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```

**`.env`ファイル:**

```
VERSION=1.0.0
```

### ステップ6: ドキュメントの更新

```bash
cd docs/content

# すべての言語フォルダ内のマークダウンを更新
# 画像変換に関する内容を削除し、テンプレートの使い方を記載
```

**`docs/content/en/index.md`の例:**

```markdown
# Your App Name

A modern desktop application template built with Tauri v2 and Vue 3.

## Features

- Modern UI with Vuetify 3 Material Design
- Multi-language support (i18n)
- Dark/Light theme support
- State management with Pinia
- File system operations
- Notifications
- Cross-platform (Windows, macOS, Linux)

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vuetify 3, Pinia
- **Backend**: Rust, Tauri v2
- **Build**: Vite, pnpm monorepo

## Getting Started

See [Installation](./installation.md) and [Usage](./usage.md).
```

### ステップ7: 不要なドキュメント・ファイルの削除

```bash
cd ../..  # プロジェクトルートへ

# 画像変換固有のドキュメント削除
rm ARM64_SIGNING_ISSUE.md
rm HDR_SUPPORT_STATUS.md
rm DEV_AUTORELOAD_FIX.md
rm app/src-tauri/ENCODER_PROGRESS.md

# Docker関連（必要に応じて保持）
# rm -rf docker/

# パッケージマネージャービルドスクリプト（必要に応じて保持）
# rm scripts/build-chocolatey.ps1
# rm scripts/build-homebrew.sh
```

### ステップ8: ReadMe.mdの書き換え

**新しい`ReadMe.md`の例:**

```markdown
# Your App Name

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

\`\`\`bash

# Install dependencies

pnpm install

# Run development server

pnpm run dev:tauri
\`\`\`

### Build

\`\`\`bash

# Build for production

pnpm run build:tauri
\`\`\`

## Project Structure

See [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) for detailed project structure.

## License

MIT
```

### ステップ9: テストとクリーンアップ

```bash
# 依存関係の再インストール
pnpm install

# ビルドテスト
cd app/src-tauri
cargo build

# 開発サーバー起動
cd ../..
pnpm run dev:tauri

# 型チェック
pnpm run type-check

# Lint
pnpm run lint
```

### ステップ10: 最終チェックリスト

- [ ] すべての画像変換関連ファイルが削除されている
- [ ] Cargo.tomlから画像処理クレートが削除されている
- [ ] package.jsonから画像処理関連パッケージが削除されている
- [ ] `src-tauri/src/command.rs`に新しいサンプルコマンドがある
- [ ] `src/components/MainContent.vue`が汎用的な内容になっている
- [ ] i18n翻訳ファイルが汎用的な内容になっている
- [ ] ReadMe.mdが更新されている
- [ ] .envファイルのバージョンが1.0.0になっている
- [ ] tauri.conf.jsonの設定が更新されている
- [ ] ドキュメントが更新されている
- [ ] 開発サーバーが正常に起動する
- [ ] ビルドが成功する
- [ ] 型チェックが通る
- [ ] Lintが通る

## 🎨 カスタマイズ方法

### 1. アプリ名とメタデータの変更

- `app/src-tauri/Cargo.toml` の `name`, `description`, `authors` を変更
- `app/src-tauri/tauri.conf.json` の `productName`, `identifier` を変更
- `package.json` の `name`, `description`, `author` を変更
- `.env` のバージョンを設定
- `app/src/App.vue` の `title` を変更

### 2. アイコンの変更

```bash
cd app/src-tauri/icons

# 以下のファイルを置き換え:
# - 32x32.png
# - 128x128.png
# - 128x128@2x.png
# - icon.icns (macOS)
# - icon.ico (Windows)
# - icon.png (Linux)
```

### 3. 新しいTauriコマンドの追加

**Rust側（`app/src-tauri/src/command.rs`）:**

```rust
#[tauri::command]
pub async fn your_new_command(
    param: String,
    app: AppHandle,
) -> Result<String, String> {
    // ロジック実装
    Ok("result".to_string())
}
```

**`src/main.rs`に登録:**

```rust
.invoke_handler(tauri::generate_handler![
    command::your_new_command  // 追加
])
```

**Vue側での呼び出し:**

```typescript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke<string>('your_new_command', {
  param: 'value'
});
```

### 4. 新しいStoreの追加

```typescript
// src/store/YourStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore(
  'yourStore',
  () => {
    const data = ref('');

    const updateData = (newData: string) => {
      data.value = newData;
    };

    return { data, updateData };
  },
  {
    persist: true // ローカルストレージに永続化
  }
);
```

### 5. 新しいComposableの追加

```typescript
// src/composables/useYourFeature.ts
export function useYourFeature() {
  const doSomething = () => {
    // ロジック
  };

  return { doSomething };
}
```

### 6. 言語の追加

```bash
# 新しい言語ファイルを作成
cp src/locales/en.yml src/locales/de.yml

# plugins/i18n.ts に登録
import de from '@/locales/de.yml';

messages: {
  en,
  de  // 追加
}
```

## 🚀 本番デプロイ

### Windows

```bash
pnpm run build:tauri
# 生成物: app/src-tauri/target/release/bundle/msi/

# Chocolatey パッケージ作成（オプション）
pnpm run package:chocolatey
```

### macOS

```bash
# Universal binary (Apple Silicon + Intel)
pnpm --filter app build:tauri:mac
# 生成物: app/src-tauri/target/universal-apple-darwin/release/bundle/dmg/

# Homebrew パッケージ作成（オプション）
pnpm run package:homebrew
```

### Linux

```bash
# Docker経由（推奨）
pnpm run build:tauri:linux-x64
pnpm run build:tauri:linux-arm64
# 生成物: app/src-tauri/target/release/bundle/

# または直接
pnpm --filter app build:tauri:linux-x64
```

## 📚 参考資料

- [Tauri v2 Documentation](https://v2.tauri.app/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue I18n Documentation](https://vue-i18n.intlify.dev/)

## 💡 ヒント

### パフォーマンス最適化

1. **Vuetify Treeshaking**: プロダクションビルドでは自動的に有効
2. **Rust Release Profile**: `Cargo.toml`の`[profile.release]`を調整
3. **ICONの最適化**: 不要なサイズを削除

### デバッグ

```bash
# Rust側のログ
cd app/src-tauri
RUST_LOG=debug cargo tauri dev

# Vue側のログ
# ブラウザDevToolsを使用（Tauri開発モード）
```

### クロスコンパイル

- **macOS**: Universal binary で両アーキテクチャをサポート
- **Windows**: x64 と ARM64 を別々にビルド
- **Linux**: Docker を使用してクリーンな環境でビルド

## 🛠️ トラブルシューティング

### ビルドエラー

1. `cargo clean` で Rust のビルドキャッシュをクリア
2. `pnpm clean` で Vite のキャッシュをクリア
3. `pnpm install` で依存関係を再インストール

### 開発サーバーが起動しない

- ポート1420が使用されていないか確認
- `vite.config.ts`のポート設定を確認

### Tauri コマンドが呼べない

- `src/main.rs`の`invoke_handler`に登録されているか確認
- コマンド名とパラメータ名が一致しているか確認

## 📄 ライセンス

MIT License - このテンプレートは自由に使用・改変・配布できます。

---

**Happy Coding! 🎉**
