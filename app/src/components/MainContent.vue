<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { useGlobalStore } from '@/store';
import { useNotification } from '@/composables/useNotification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const globalStore = useGlobalStore();
const notification = useNotification(t);

const inputText = ref('');
const outputText = ref('');
const appVersion = ref('');

const handleProcess = async () => {
  if (!inputText.value) {
    notification.error('Please enter some text');
    return;
  }

  globalStore.setLoading(true);

  try {
    const result = await invoke<string>('echo_message', {
      message: inputText.value
    });
    outputText.value = result;
    notification.success('Processed successfully');
  } catch (error) {
    notification.error(`Error: ${error}`);
  } finally {
    globalStore.setLoading(false);
  }
};

const getVersion = async () => {
  try {
    appVersion.value = await invoke<string>('get_app_version');
  } catch (error) {
    console.error('Failed to get version:', error);
  }
};

// Get version on mount
getVersion();
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            <v-icon icon="mdi-application" class="mr-2" />
            Sample Application
          </v-card-title>

          <v-card-subtitle v-if="appVersion">Version: {{ appVersion }}</v-card-subtitle>

          <v-card-text>
            <p class="text-body-1 mb-4">
              This is a template application built with Tauri v2 and Vue 3. Replace this content
              with your own application logic.
            </p>

            <v-divider class="mb-4" />

            <v-textarea
              v-model="inputText"
              label="Input Text"
              placeholder="Enter some text to echo..."
              rows="4"
              variant="outlined"
              class="mb-4"
            />

            <v-btn color="primary" size="large" prepend-icon="mdi-send" @click="handleProcess">
              Process
            </v-btn>

            <v-textarea
              v-model="outputText"
              label="Output"
              rows="4"
              readonly
              variant="outlined"
              class="mt-4"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon icon="mdi-information" class="mr-2" />
            Features
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item prepend-icon="mdi-vuejs">
                <v-list-item-title>Vue 3 Composition API</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-language-typescript">
                <v-list-item-title>TypeScript Support</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-material-design">
                <v-list-item-title>Vuetify 3 Material Design</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-database">
                <v-list-item-title>Pinia State Management</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-translate">
                <v-list-item-title>Vue I18n Multi-language</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-lightning-bolt">
                <v-list-item-title>Vite Fast Build</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon icon="mdi-cog" class="mr-2" />
            Quick Start
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  1. Customize
                  <code>MainContent.vue</code>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  2. Add Tauri commands in
                  <code>command.rs</code>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  3. Create composables for your logic
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  4. Add stores for state management
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  5. Update i18n translations
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}
</style>
