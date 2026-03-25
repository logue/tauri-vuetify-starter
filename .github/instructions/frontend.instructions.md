---
description: "Use when writing Vue 3 components, composables, stores, or TypeScript code in the frontend. Covers Vuetify 4 patterns, Pinia state management, vue-i18n, Tauri API calls, and project-specific conventions."
applyTo: "frontend/src/**"
---

# Frontend Conventions

## Component Patterns (Vue 3 + Vuetify 4)

- Use **Composition API with `<script setup lang="ts">`** — no Options API.
- Vuetify components are globally registered; no per-file imports needed.
- Use `@mdi/font` icon names (e.g. `icon="mdi-application"`).

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <v-card>
    <v-card-title>{{ t("section.title") }}</v-card-title>
  </v-card>
</template>
```

## i18n — All 6 Locales Required

Every UI string must exist in **all 6 locale files** (`frontend/src/locales/{en,ja,fr,ko,zhHans,zhHant}.yaml`). Never hard-code display text.

```typescript
// In component
const { t } = useI18n();
t("mySection.myKey");
```

Add corresponding keys to all 6 YAML files before committing.

## Tauri API Calls

```typescript
import { invoke } from "@tauri-apps/api/core";

// Always type the return value
const result = await invoke<string>("command_name", { param: "value" });
```

Listen for backend events via `useLogger` composable (already set up in `frontend/src/composables/useLogger.ts`). Avoid calling `listen()` directly in components.

## HTTP Requests

Use `unified-network`, **not** native `fetch` or `axios`:

```typescript
import { createNetwork } from "unified-network";
```

## State Management (Pinia)

| Store         | Location                            | Usage                                            |
| ------------- | ----------------------------------- | ------------------------------------------------ |
| `ConfigStore` | `frontend/src/store/ConfigStore.ts` | Theme, locale — **persisted** to localStorage    |
| `GlobalStore` | `frontend/src/store/GlobalStore.ts` | Loading, progress, snackbar messages — transient |

```typescript
import { useGlobalStore } from "@/store";
const globalStore = useGlobalStore();
globalStore.setLoading(true);
globalStore.setMessage("Done", "green"); // optional color
```

## Composables

Add new composables to `frontend/src/composables/` following the `use*` naming convention. Each composable should isolate a single concern.

Existing composables:

- `useFileSystem.ts` — open/save dialogs via Tauri fs plugin
- `useLogger.ts` — subscribes to backend log events
- `useNotification.ts` — system notifications

## Notifications

```typescript
import { useNotification } from "@/composables/useNotification";
const notification = useNotification(t);
notification.success(t("message.done"));
notification.error(t("message.failed"));
```

## pnpm Scoping

Run frontend-only commands with `pnpm --filter frontend <cmd>`. Never run `pnpm` at repo root for frontend-specific tasks.

## Path Aliases

Use `@/` for `frontend/src/` in all imports:

```typescript
import { useGlobalStore } from "@/store";
import MyComponent from "@/components/MyComponent.vue";
```
