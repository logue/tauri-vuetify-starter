/**
 * YAML module declarations for vue-i18n locale files
 */
declare module '*.yml' {
  import { LocaleMessages } from 'vue-i18n';
  const content: LocaleMessages<any>;
  export default content;
}

declare module '*.yaml' {
  import { LocaleMessages } from 'vue-i18n';
  const content: LocaleMessages<any>;
  export default content;
}
