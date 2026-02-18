import { createI18n } from 'vue-i18n';

import { en, fr, ja, ko, zhHant, zhHans } from 'vuetify/locale';

// Import locale messages
// @intlify/unplugin-vue-i18n がYAMLファイルを自動的に処理します
import enMessages from '@/locales/en.yml';
import frMessages from '@/locales/fr.yml';
import jaMessages from '@/locales/ja.yml';
import koMessages from '@/locales/ko.yml';
import zhHansMessages from '@/locales/zhHans.yml';
import zhHantMessages from '@/locales/zhHant.yml';

// ユーザーのブラウザ/OS言語を取得
let locale = navigator.language.slice(0, 2) || 'en'; // フォールバックとして'en'

if (locale === 'zh') {
  // 中国語の詳細なロケールを確認
  const fullLocale = navigator.language.toLowerCase();
  if (fullLocale === 'zh-cn' || fullLocale === 'zh-sg') {
    locale = 'zhHans'; // 簡体字中国語
  } else {
    locale = 'zhHant'; // 繁体字中国語
  }
}

const i18n = createI18n({
  locale, // 'en-US' -> 'en' など
  fallbackLocale: 'en',
  messages: {
    en: { ...enMessages, $vuetify: { ...en } }, // 英語
    fr: { ...frMessages, $vuetify: { ...fr } }, // フランス語
    ja: { ...jaMessages, $vuetify: { ...ja } }, // 日本語
    ko: { ...koMessages, $vuetify: { ...ko } }, // 韓国語
    zhHant: { ...zhHantMessages, $vuetify: { ...zhHant } }, // 繁体字中国語
    zhHans: { ...zhHansMessages, $vuetify: { ...zhHans } } // 簡体字中国語
  },
  legacy: false,
  globalInjection: true
});

document.documentElement.lang = locale;

export { i18n };
