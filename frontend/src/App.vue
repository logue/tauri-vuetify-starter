<script setup lang="ts">
import { useConfigStore, useGlobalStore } from '@/store';
import { computed, nextTick, onMounted, ref, watch, type ComputedRef } from 'vue';

// Components
import { useTheme } from 'vuetify';

import AppBarMenuComponent from '@/components/AppBarMenuComponent.vue';
import MainContent from '@/components/MainContent.vue';

/** Vuetify Theme */
const theme = useTheme();

/** Global Store */
const globalStore = useGlobalStore();

/** Config Store */
const configStore = useConfigStore();

/** Title - Get from vite.config.ts define */
const title = __APP_NAME__;

/** loading overlay visibility */
const loading = computed({
  get: () => globalStore.loading,
  set: (v: boolean) => globalStore.setLoading(v)
});

/** Appbar progressbar value */
const progress = computed({
  get: () => globalStore.progress,
  set: (v: number | null) => globalStore.setProgress(v)
});

/** Snackbar visibility */
const snackbarVisibility = ref(false);

/** Snackbar text */
const snackbarText = computed(() => globalStore.message);

/** Toggle Dark mode */
const isDark: ComputedRef<string> = computed(() => (configStore.theme ? 'dark' : 'light'));

/** Fallback color for browser theme-color meta tag. */
const DEFAULT_THEME_COLOR = '#1976D2';

/**
 * Convert arbitrary Vuetify color values into a valid CSS color string for theme-color.
 * Prefers rgba() output when channels are available, otherwise keeps HEX when valid.
 */
const normalizeThemeColor = (value: unknown): string => {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (/^rgba?\(/i.test(trimmed)) {
      return trimmed;
    }

    if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmed)) {
      return trimmed;
    }

    const channels = trimmed.split(',').map(part => part.trim());
    if (channels.length === 3 || channels.length === 4) {
      const r = Number.parseInt(channels[0] ?? '', 10);
      const g = Number.parseInt(channels[1] ?? '', 10);
      const b = Number.parseInt(channels[2] ?? '', 10);
      const a = channels.length === 4 ? Number.parseFloat(channels[3] ?? '') : 1;

      if (
        [r, g, b].every(channel => Number.isFinite(channel) && channel >= 0 && channel <= 255) &&
        Number.isFinite(a) &&
        a >= 0 &&
        a <= 1
      ) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }
    }
  }

  if (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 0xffffff) {
    const hex = Math.round(value).toString(16).padStart(6, '0').toUpperCase();
    return `#${hex}`;
  }

  return DEFAULT_THEME_COLOR;
};

/** Resolved meta theme-color value for the current active theme. */
const themeColor: ComputedRef<string> = computed(() => {
  const currentPrimary = theme.computedThemes.value?.[isDark.value]?.colors?.primary;
  return normalizeThemeColor(currentPrimary);
});

// When snackbar text has been set, show snackbar.
watch(
  () => globalStore.message,
  message => (snackbarVisibility.value = message !== '')
);

/** Clear store when snackbar hide */
const onSnackbarChanged = async () => {
  globalStore.setMessage();
  await nextTick();
};

onMounted(() => {
  document.title = title;
  loading.value = false;
});
</script>

<template>
  <v-app :theme="isDark" data-tauri-drag-region="true">
    <v-app-bar color="primary">
      <v-app-bar-title tag="h1">{{ title }}</v-app-bar-title>
      <v-spacer />
      <app-bar-menu-component />
      <v-progress-linear
        v-show="loading"
        :active="loading"
        :indeterminate="progress === null"
        :model-value="progress !== null ? progress : 0"
        color="blue-accent-3"
      />
    </v-app-bar>

    <v-main>
      <main-content />
    </v-main>

    <v-overlay v-model="loading" class="justify-center align-center" app persistent>
      <v-progress-circular size="64" indeterminate />
    </v-overlay>

    <v-snackbar
      v-model="snackbarVisibility"
      :color="globalStore.snackbarColor"
      @update:model-value="onSnackbarChanged"
    >
      {{ snackbarText }}
      <template #actions>
        <v-btn icon="mdi-close" @click="onSnackbarChanged" />
      </template>
    </v-snackbar>
  </v-app>
  <teleport to="head">
    <meta :content="themeColor" name="theme-color" />
  </teleport>
</template>

<style lang="scss">
/* stylelint-disable-next-line scss/load-no-partial-leading-underscore */
@use 'vuetify/_settings';
@use 'sass:map';

body {
  // Modern scrollbar style
  scrollbar-width: thin;
  scrollbar-color: map.get(settings.$grey, 'lighten-2') map.get(settings.$grey, 'base');
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background-color: map.get(settings.$grey, 'lighten-2');
}

::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: map.get(settings.$grey, 'base');
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

// Fix app-bar's progress-bar
.v-app-bar .v-progress-linear {
  position: absolute;
  bottom: 0;
}
</style>
