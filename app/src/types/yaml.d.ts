/**
 * YAML module declarations for vue-i18n locale files
 * These types are used by @intlify/unplugin-vue-i18n to process YAML files
 */
declare module '*.yml' {
  const content: Record<string, any>;
  export default content;
}

declare module '*.yaml' {
  const content: Record<string, any>;
  export default content;
}
