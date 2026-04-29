import type { ComposerTranslation } from 'vue-i18n';

import {
  isPermissionGranted,
  requestPermission,
  sendNotification
} from '@tauri-apps/plugin-notification';

/**
 * Provides desktop notification helpers backed by Tauri notification plugin.
 *
 * @param t vue-i18n translation function.
 * @returns Notification helper functions.
 */
export const useNotification = (t: ComposerTranslation) => {
  /**
   * Requests notification permission when needed and sends a notification.
   *
   * @param title Notification title.
   * @param body Optional notification body.
   * @param icon Optional notification icon path.
   * @returns A promise resolved after notification handling completes.
   */
  const notify = async (title: string, body?: string, icon?: string) => {
    try {
      // Check current notification permission.
      let permissionGranted = await isPermissionGranted();

      // Request permission when it has not been granted yet.
      if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
      }

      if (permissionGranted) {
        // Send the desktop notification.
        await sendNotification({ title, body, icon });
      }
    } catch (error) {
      console.error(t('notification.error.title'), error);
    }
  };

  /**
   * Sends a localized success notification.
   *
   * @param message Success message body.
   * @returns A promise resolved after notification handling completes.
   */
  const success = async (message: string) => {
    await notify(t('notification.success.title'), message);
  };

  /**
   * Sends a localized error notification.
   *
   * @param message Error message body.
   * @returns A promise resolved after notification handling completes.
   */
  const error = async (message: string) => {
    await notify(t('notification.error.title'), message);
  };

  return {
    notify,
    success,
    error
  };
};
