import { defineStore } from 'pinia';
import { type Ref, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

/** Config Store */
export default defineStore('config', () => {
  // 1. Get locale from the i18n global instance.
  const { locale } = useI18n({ useScope: 'global' });

  // 2. Define language state in Pinia.
  const currentLocale = ref(locale.value); // Initialize from current i18n locale.

  // 3. Sync i18n locale whenever state changes.
  watch(currentLocale, newLocale => {
    locale.value = newLocale;
    // Add persistence logic here if needed.
    // localStorage.setItem('locale', newLocale)
  });

  /** Dark Theme mode */
  const theme: Ref<boolean> = ref(
    import.meta.client && typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  // Client-side initialization.
  if (import.meta.client && typeof window !== 'undefined') {
    // Evaluate dark mode after hydration.
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    theme.value = darkModeQuery.matches;

    // Watch for system dark mode changes.
    darkModeQuery.addEventListener('change', e => {
      theme.value = e.matches;
    });
  }

  /** Toggle Dark/Light mode */
  const toggleTheme = () => (theme.value = !theme.value);
  /**
   * Set Locale.
   *
   * @param locale - Locale
   */
  const setLocale = (l: string) => (locale.value = l);

  return { theme, locale, toggleTheme, setLocale };
});
