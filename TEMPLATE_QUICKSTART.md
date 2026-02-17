# テンプレートプロジェクト作成 - クイックスタート

このドキュメントは、Drop Compress Imageプロジェクトから汎用的なTauri v2 + Vue 3テンプレートを作成する簡易ガイドです。

## 🚀 自動テンプレート生成（推奨）

最も簡単な方法は、提供されているスクリプトを使用することです：

```bash
# テンプレートを生成
./scripts/create-template.sh ../my-tauri-app

# 新しいテンプレートディレクトリに移動
cd ../my-tauri-app

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm run dev:tauri
```

これで完了です！

## 📋 生成されるテンプレートの内容

### 含まれるもの ✅

- **フロントエンド基盤**
  - Vue 3 (Composition API)
  - TypeScript
  - Vuetify 3 (Material Design)
  - Pinia (状態管理、永続化対応)
  - Vue I18n (5言語サポート: en, fr, ja, ko, zh)
  - Vite (高速ビルド)

- **バックエンド基盤**
  - Rust
  - Tauri v2
  - プラグイン: dialog, fs, notification, opener, os
  - ロギングシステム
  - エラーハンドリング

- **開発ツール**
  - ESLint + Prettier
  - Stylelint
  - Husky (Git hooks)
  - pnpm monorepo

- **サンプルコード**
  - Tauri コマンド例 (`echo_message`, `get_app_version`, `process_data`)
  - Vue コンポーネント例 (`MainContent.vue`)
  - ファイルシステム操作 composable
  - 通知 composable
  - ロガー composable

### 削除されるもの ❌

- 画像デコーダー・エンコーダー (Rust)
- 画像変換関連の依存関係 (image, libavif-sys, libwebp-sys, jxl-sys など)
- 画像変換UI コンポーネント
- ドラッグ&ドロップ・ペースト処理 (画像特化)
- 変換設定ストア
- 画像変換関連の型定義

## 🎯 次のステップ

### 1. アプリケーション情報の更新

#### Rustメタデータ (`app/src-tauri/Cargo.toml`)

```toml
[package]
name = "your-app-name"
version = "1.0.0"
authors = ["Your Name <your@email.com>"]
description = "Your app description"
```

#### Tauri設定 (`app/src-tauri/tauri.conf.json`)

```json
{
  "productName": "your-app-name",
  "identifier": "com.yourdomain.your-app-name",
  "app": {
    "windows": [
      {
        "title": "Your App Name"
      }
    ]
  }
}
```

#### Node.jsメタデータ (ルート `package.json`)

```json
{
  "name": "your-app-name",
  "description": "Your app description",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  }
}
```

### 2. UIのカスタマイズ

`app/src/components/MainContent.vue` を編集して、独自のUIを作成します：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';

const message = ref('');

const handleClick = async () => {
  const result = await invoke<string>('your_command', {
    data: message.value
  });
  console.log(result);
};
</script>

<template>
  <v-container>
    <!-- ここにあなたのUIを追加 -->
  </v-container>
</template>
```

### 3. Tauriコマンドの追加

#### Rust側 (`app/src-tauri/src/command.rs`)

```rust
#[tauri::command]
pub async fn your_command(data: String, app: AppHandle) -> Result<String, String> {
    // ビジネスロジックをここに実装
    Ok(format!("Processed: {}", data))
}
```

#### 登録 (`app/src-tauri/src/main.rs`)

```rust
.invoke_handler(tauri::generate_handler![
    command::echo_message,
    command::get_app_version,
    command::process_data,
    command::your_command  // 追加
])
```

### 4. ストアの追加

```typescript
// app/src/store/YourStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore(
  'yourStore',
  () => {
    const data = ref('');

    const setData = (newData: string) => {
      data.value = newData;
    };

    return { data, setData };
  },
  {
    persist: true // localStorageに永続化
  }
);
```

### 5. Composableの追加

```typescript
// app/src/composables/useYourFeature.ts
import { ref } from 'vue';

export function useYourFeature() {
  const state = ref('');

  const doSomething = () => {
    // ロジック実装
  };

  return { state, doSomething };
}
```

### 6. 翻訳の更新

`app/src/locales/*.yml` ファイルを編集して、アプリ固有のメッセージを追加：

```yaml
# app/src/locales/en.yml
app:
  title: 'Your App Name'
  description: 'Your description'

feature:
  button: 'Click Me'
  message: 'Hello World'
```

## 🏗️ ビルド

### 開発ビルド

```bash
pnpm run dev:tauri
```

### プロダクションビルド

**現在のプラットフォーム:**

```bash
pnpm run build:tauri
```

**特定のプラットフォーム:**

```bash
# macOS Universal (Apple Silicon + Intel)
pnpm --filter app build:tauri:mac

# Windows x64
pnpm --filter app build:tauri:windows-x64

# Linux x64
pnpm --filter app build:tauri:linux-x64
```

ビルド成果物は `app/src-tauri/target/release/bundle/` に生成されます。

## 📦 含まれるTauriプラグイン

テンプレートには以下のTauriプラグインがプリインストールされています：

| プラグイン     | 用途                            | 使用例                 |
| -------------- | ------------------------------- | ---------------------- |
| `dialog`       | ファイル/フォルダ選択ダイアログ | ファイルの開く/保存    |
| `fs`           | ファイルシステム操作            | ファイル読み書き       |
| `notification` | システム通知                    | 完了通知の表示         |
| `opener`       | 外部アプリ/URL起動              | ブラウザでリンクを開く |
| `os`           | OS情報取得                      | プラットフォーム判定   |
| `log`          | ロギング                        | アプリケーションログ   |

### 使用例

```typescript
// ファイル選択
import { open } from '@tauri-apps/plugin-dialog';
const file = await open({ multiple: false });

// ファイル読み込み
import { readTextFile } from '@tauri-apps/plugin-fs';
const content = await readTextFile('path/to/file.txt');

// 通知
import { sendNotification } from '@tauri-apps/plugin-notification';
await sendNotification({ title: 'Success', body: 'Operation complete' });

// URLを開く
import { open as openUrl } from '@tauri-apps/plugin-opener';
await openUrl('https://example.com');

// OS情報
import { platform } from '@tauri-apps/plugin-os';
const os = platform();
```

## 🎨 テーマとスタイル

テンプレートはVuetify 3を使用しており、Material Designコンポーネントが利用可能です。

### カスタムテーマの設定

`app/src/styles/settings.scss` でVuetifyのテーマをカスタマイズ：

```scss
@use 'vuetify' with (
  $color-pack: false,
  $utilities: false
);

// カスタムカラーを定義
$primary-color: #1976d2;
```

### ダーク/ライトモード

テンプレートは自動的にシステムのテーマ設定を検出します。
ユーザーは `ConfigStore` から手動で切り替えることもできます：

```typescript
import { useConfigStore } from '@/store';
const configStore = useConfigStore();

// テーマ切り替え
configStore.toggleTheme();
```

## 🌍 多言語対応

デフォルトで5つの言語をサポート：

- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)
- 🇨🇳 中文 (zhHans, zhHant)

### 言語の追加

1. 新しい翻訳ファイルを作成：

   ```bash
   cp app/src/locales/en.yml app/src/locales/de.yml
   ```

2. `app/src/plugins/i18n.ts` に登録：

   ```typescript
   import de from '@/locales/de.yml';

   const messages = {
     en,
     de // 追加
   };
   ```

## 🔍 プロジェクト構造の詳細

```
your-app/
├── app/                              # メインアプリケーション
│   ├── src/                          # Vue 3 フロントエンド
│   │   ├── components/              # UIコンポーネント
│   │   │   ├── AppBarMenuComponent.vue    # アプリバーメニュー
│   │   │   ├── LocaleSelector.vue         # 言語セレクター
│   │   │   └── MainContent.vue            # メインコンテンツ
│   │   ├── composables/             # 再利用可能なロジック
│   │   │   ├── useFileSystem.ts           # ファイル操作
│   │   │   ├── useLogger.ts               # ロギング
│   │   │   └── useNotification.ts         # 通知
│   │   ├── interfaces/              # TypeScript型定義
│   │   ├── locales/                 # i18n翻訳ファイル
│   │   ├── plugins/                 # Vueプラグイン
│   │   │   ├── i18n.ts                    # Vue I18n設定
│   │   │   └── vuetify.ts                 # Vuetify設定
│   │   ├── store/                   # Piniaストア
│   │   │   ├── ConfigStore.ts             # 設定（テーマ、言語）
│   │   │   ├── GlobalStore.ts             # グローバル状態
│   │   │   └── index.ts
│   │   ├── styles/                  # グローバルスタイル
│   │   ├── App.vue                  # ルートコンポーネント
│   │   └── main.ts                  # エントリポイント
│   ├── src-tauri/                   # Rustバックエンド
│   │   ├── src/
│   │   │   ├── command.rs                 # Tauriコマンド
│   │   │   ├── error.rs                   # エラー型
│   │   │   ├── logging.rs                 # ロギングシステム
│   │   │   ├── lib.rs                     # ライブラリエクスポート
│   │   │   └── main.rs                    # メイン関数
│   │   ├── Cargo.toml               # Rust依存関係
│   │   ├── tauri.conf.json          # Tauri設定
│   │   └── build.rs                 # ビルドスクリプト
│   ├── package.json
│   └── vite.config.ts               # Vite設定
├── docs/                             # ドキュメントサイト (Nuxt 3)
├── scripts/                          # ビルドスクリプト
│   └── create-template.sh           # テンプレート作成スクリプト
├── .env                             # 環境変数
├── .gitignore
├── package.json                     # ルートパッケージ
├── pnpm-workspace.yaml              # pnpmワークスペース
├── TEMPLATE_GUIDE.md                # 詳細ガイド
└── ReadMe.md
```

## 🐛 トラブルシューティング

### ビルドエラー

```bash
# Rustキャッシュをクリア
cd app/src-tauri
cargo clean

# Viteキャッシュをクリア
cd ../..
pnpm run clean

# node_modulesを再インストール
rm -rf node_modules
pnpm install
```

### 開発サーバーが起動しない

1. ポート1420が使用されていないか確認
2. Tauri CLIがインストールされているか確認: `pnpm tauri --version`
3. Rustがインストールされているか確認: `rustc --version`

### Tauriコマンドが呼べない

1. コマンドが `src/main.rs` の `invoke_handler` に登録されているか確認
2. コマンド名とパラメータ名が完全一致しているか確認
3. Rustコンパイルエラーがないか確認

## 📚 参考資料

- [詳細なテンプレートガイド](./TEMPLATE_GUIDE.md) - 完全な削除・修正手順
- [Tauri v2 Documentation](https://v2.tauri.app/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)

## 💡 ヒント

### パフォーマンス最適化

1. **Vuetify Treeshaking**: プロダクションビルドでは自動的にtreeshakingが有効
2. **Lazy Loading**: 大きなコンポーネントは遅延読み込み
3. **Rust Release Profile**: `Cargo.toml`の`[profile.release]`を調整

### デバッグ

```bash
# Rustログを有効化
RUST_LOG=debug pnpm run dev:tauri

# Vue DevTools
# Tauri開発モードでブラウザのDevToolsが使用可能
```

### コードジェネレーター

便利なスニペット：

```bash
# 新しいストアを作成
cat > app/src/store/NewStore.ts << 'EOF'
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('newStore', () => {
  const data = ref('');
  return { data };
});
EOF

# 新しいcomposableを作成
cat > app/src/composables/useNewFeature.ts << 'EOF'
export function useNewFeature() {
  const doSomething = () => {
    console.log('New feature');
  };
  return { doSomething };
}
EOF
```

## 🎉 完成！

これで、Tauri v2 + Vue 3の汎用デスクトップアプリケーションテンプレートの準備が完了しました。

あとは独自のビジネスロジックを追加するだけです！

---

**質問がある場合は、[TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) を参照してください。**
