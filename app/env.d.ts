/// <reference types="vite/client" />
/// <reference types="@tauri-apps/api" />

/**
 * Vite environment variables available via import.meta.env.
 */
interface ImportMetaEnv {
  /**
   * Optional app title for legacy usage.
   */
  readonly VITE_APP_TITLE?: string;

  /**
   * Vite runtime flags.
   */
  readonly DEV: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

/**
 * ImportMeta typing for Vite.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
