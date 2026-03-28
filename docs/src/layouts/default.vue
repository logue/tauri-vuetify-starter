<script setup lang="ts">
import { useTheme } from 'vuetify';

import { useConfigStore } from '../store';

const title = import.meta.env.VITE_SITE_TITLE || 'Tauri Vuetify Template';

/** Vuetify Theme */
const theme = useTheme();

/** Config Store */
const configStore = useConfigStore();

/** drawer visibility */
const drawer: Ref<boolean> = ref(false);

/** Toggle Dark mode */
const isDark: ComputedRef<string> = computed(() => (configStore.theme ? 'dark' : 'light'));

const color = computed(() => {
  const themeColors = theme.computedThemes.value?.[isDark.value]?.colors;
  return themeColors
    ? `rgb(${String(themeColors.primary.r)}, ${String(themeColors.primary.g)}, ${String(themeColors.primary.b)})`
    : '#1976D2';
});

useHead({
  meta: [{ name: 'theme-color', content: color }]
});
</script>

<template>
  <v-app :theme="isDark">
    <v-navigation-drawer v-model="drawer" permanent>
      <drawer-menu />
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer />
      <ClientOnly>
        <app-bar-menu-component />
      </ClientOnly>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app elevation="3" color="primary">
      <span class="mr-5">2026 &copy; Logue</span>
    </v-footer>
  </v-app>
</template>
