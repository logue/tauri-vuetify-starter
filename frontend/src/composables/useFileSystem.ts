import { open, save } from '@tauri-apps/plugin-dialog';
import { exists, readFile, writeFile } from '@tauri-apps/plugin-fs';

/**
 * Provides filesystem and dialog helper functions backed by Tauri plugins.
 *
 * @returns File and directory helper functions.
 */
export function useFileSystem() {
  /**
   * Opens a file selection dialog.
   *
   * @param options Selection options such as multi-select and extension filters.
   * @returns Selected file path(s), or null when canceled.
   */
  const selectFiles = async (options?: {
    multiple?: boolean;
    filters?: { name: string; extensions: string[] }[];
  }) => {
    return await open({
      multiple: options?.multiple ?? false,
      filters: options?.filters
    });
  };

  /**
   * Opens a folder selection dialog.
   *
   * @returns Selected directory path(s), or null when canceled.
   */
  const selectFolder = async () => {
    return await open({
      directory: true
    });
  };

  /**
   * Opens a save file dialog.
   *
   * @param options Save dialog options such as default path and extension filters.
   * @returns File path to save, or null when canceled.
   */
  const saveFile = async (options?: {
    defaultPath?: string;
    filters?: { name: string; extensions: string[] }[];
  }) => {
    return await save({
      defaultPath: options?.defaultPath,
      filters: options?.filters
    });
  };

  /**
   * Reads file contents from a path.
   *
   * @param path Absolute or sandboxed file path.
   * @returns File bytes as Uint8Array.
   */
  const readFileContents = async (path: string) => {
    return await readFile(path);
  };

  /**
   * Writes binary contents to a file path.
   *
   * @param path Absolute or sandboxed file path.
   * @param data Binary data to write.
   * @returns A promise that resolves when writing completes.
   */
  const writeFileContents = async (path: string, data: Uint8Array) => {
    return await writeFile(path, data);
  };

  /**
   * Checks whether a file exists at a given path.
   *
   * @param path Absolute or sandboxed file path.
   * @returns True when the path exists.
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
