import { createI18n } from 'vue-i18n';

import { en, fr, ja, ko, zhHans, zhHant } from 'vuetify/locale';

// Import locale messages
// @intlify/unplugin-vue-i18n automatically transforms YAML files.
import enMessages from '@/locales/en.yaml';
import frMessages from '@/locales/fr.yaml';
import jaMessages from '@/locales/ja.yaml';
import koMessages from '@/locales/ko.yaml';
import zhHansMessages from '@/locales/zhHans.yaml';
import zhHantMessages from '@/locales/zhHant.yaml';

// Get browser/OS language.
let locale = navigator.language.slice(0, 2) || 'en'; // Fallback to 'en'.

if (locale === 'zh') {
  // Resolve detailed Chinese locale.
  const fullLocale = navigator.language.toLowerCase();
  if (fullLocale === 'zh-cn' || fullLocale === 'zh-sg') {
    locale = 'zhHans'; // Simplified Chinese
  } else {
    locale = 'zhHant'; // Traditional Chinese
  }
}

const i18n = createI18n({
  locale, // Example: 'en-US' -> 'en'
  fallbackLocale: 'en',
  messages: {
    // @ts-ignore English
    en: { ...enMessages, $vuetify: { ...en } },
    // @ts-ignore French
    fr: { ...frMessages, $vuetify: { ...fr } },
    // @ts-ignore Japanese
    ja: { ...jaMessages, $vuetify: { ...ja } },
    // @ts-ignore Korean
    ko: { ...koMessages, $vuetify: { ...ko } },
    // @ts-ignore Traditional Chinese
    zhHant: { ...zhHantMessages, $vuetify: { ...zhHant } },
    // @ts-ignore Simplified Chinese
    zhHans: { ...zhHansMessages, $vuetify: { ...zhHans } }
  },
  legacy: false,
  globalInjection: true
});

document.documentElement.lang = locale;

export { i18n };
