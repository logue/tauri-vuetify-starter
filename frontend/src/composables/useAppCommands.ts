import { invoke } from '@tauri-apps/api/core';

/**
 * Provides typed wrappers around Tauri application commands.
 *
 * @returns Command wrapper functions for app-level Tauri commands.
 */
export function useAppCommands() {
  /**
   * Sends a message to the backend echo command.
   *
   * @param message Message text to echo.
   * @returns Echoed message returned from the backend.
   */
  const echoMessage = async (message: string): Promise<string> => {
    return await invoke<string>('echo_message', { message });
  };

  /**
   * Fetches the current application version from the backend.
   *
   * @returns Application version string.
   */
  const getAppVersion = async (): Promise<string> => {
    return await invoke<string>('get_app_version');
  };

  return {
    echoMessage,
    getAppVersion
  };
}
