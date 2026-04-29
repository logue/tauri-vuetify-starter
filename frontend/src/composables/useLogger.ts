import { useGlobalStore } from '@/store';
import { onMounted } from 'vue';

import { listen } from '@tauri-apps/api/event';

/**
 * Subscribes to backend log events and forwards relevant messages to UI state.
 *
 * @returns Void.
 */
export function useLogger() {
  const globalStore = useGlobalStore();

  onMounted(async () => {
    // Receive log messages emitted by the backend.
    await listen('log-message', event => {
      const logData = event.payload as { level: string; message: string; timestamp: string };
      console.log(`[${logData.level.toUpperCase()}] ${logData.message} (${logData.timestamp})`);

      // Surface selected log levels to UI via snackbar state.
      if (logData.level === 'info') {
        globalStore.setMessage(logData.message);
      } else if (logData.level === 'error') {
        globalStore.setMessage(logData.message, 'red');
      }
    });
  });
}
