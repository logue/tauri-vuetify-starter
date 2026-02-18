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
    notification.error(t('main.error.empty_input'));
    return;
  }

  globalStore.setLoading(true);

  try {
    const result = await invoke<string>('echo_message', {
      message: inputText.value
    });
    outputText.value = result;
    notification.success(t('main.message.success'));
  } catch (error) {
    notification.error(`${t('main.error.prefix')}: ${error}`);
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
            {{ t('main.title') }}
          </v-card-title>

          <v-card-subtitle v-if="appVersion">
            {{ t('main.version') }}: {{ appVersion }}
          </v-card-subtitle>

          <v-card-text>
            <p class="text-body-1 mb-4">
              {{ t('main.description') }}
            </p>

            <v-divider class="mb-4" />

            <v-textarea
              v-model="inputText"
              :label="t('main.input.label')"
              :placeholder="t('main.input.placeholder')"
              rows="4"
              variant="outlined"
              class="mb-4"
            />

            <v-btn color="primary" size="large" prepend-icon="mdi-send" @click="handleProcess">
              {{ t('main.button.process') }}
            </v-btn>

            <v-textarea
              v-model="outputText"
              :label="t('main.output.label')"
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
            {{ t('main.features.title') }}
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item prepend-icon="mdi-vuejs">
                <v-list-item-title>{{ t('main.features.vue3') }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-language-typescript">
                <v-list-item-title>{{ t('main.features.typescript') }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-material-design">
                <v-list-item-title>{{ t('main.features.vuetify') }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-database">
                <v-list-item-title>{{ t('main.features.pinia') }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-translate">
                <v-list-item-title>{{ t('main.features.i18n') }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-lightning-bolt">
                <v-list-item-title>{{ t('main.features.vite') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon icon="mdi-cog" class="mr-2" />
            {{ t('main.quickstart.title') }}
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  {{ t('main.quickstart.step1') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  {{ t('main.quickstart.step2') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  {{ t('main.quickstart.step3') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  {{ t('main.quickstart.step4') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-body-2">
                  {{ t('main.quickstart.step5') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n lang="yaml">
en:
  main:
    title: 'Sample Application'
    version: 'Version'
    description: 'This is a template application built with Tauri v2 and Vue 3. Replace this content with your own application logic.'
    input:
      label: 'Input Text'
      placeholder: 'Enter some text to echo...'
    output:
      label: 'Output'
    button:
      process: 'Process'
    message:
      success: 'Processed successfully'
    error:
      prefix: 'Error'
      empty_input: 'Please enter some text'
    features:
      title: 'Features'
      vue3: 'Vue 3 Composition API'
      typescript: 'TypeScript Support'
      vuetify: 'Vuetify 3 Material Design'
      pinia: 'Pinia State Management'
      i18n: 'Vue I18n Multi-language'
      vite: 'Vite Fast Build'
    quickstart:
      title: 'Quick Start'
      step1: '1. Customize MainContent.vue'
      step2: '2. Add Tauri commands in command.rs'
      step3: '3. Create composables for your logic'
      step4: '4. Add stores for state management'
      step5: '5. Update i18n translations'

ja:
  main:
    title: 'サンプルアプリケーション'
    version: 'バージョン'
    description: 'これはTauri v2とVue 3で構築されたテンプレートアプリケーションです。このコンテンツを独自のアプリケーションロジックに置き換えてください。'
    input:
      label: '入力テキスト'
      placeholder: 'エコーするテキストを入力してください...'
    output:
      label: '出力'
    button:
      process: '処理'
    message:
      success: '正常に処理されました'
    error:
      prefix: 'エラー'
      empty_input: 'テキストを入力してください'
    features:
      title: '機能'
      vue3: 'Vue 3 Composition API'
      typescript: 'TypeScript サポート'
      vuetify: 'Vuetify 3 マテリアルデザイン'
      pinia: 'Pinia 状態管理'
      i18n: 'Vue I18n 多言語対応'
      vite: 'Vite 高速ビルド'
    quickstart:
      title: 'クイックスタート'
      step1: '1. MainContent.vue をカスタマイズ'
      step2: '2. command.rs に Tauri コマンドを追加'
      step3: '3. ロジック用の composables を作成'
      step4: '4. 状態管理用の store を追加'
      step5: '5. i18n 翻訳を更新'

fr:
  main:
    title: 'Application Exemple'
    version: 'Version'
    description: "Ceci est une application modèle construite avec Tauri v2 et Vue 3. Remplacez ce contenu par votre propre logique d'application."
    input:
      label: "Texte d'entrée"
      placeholder: 'Entrez du texte à répéter...'
    output:
      label: 'Sortie'
    button:
      process: 'Traiter'
    message:
      success: 'Traité avec succès'
    error:
      prefix: 'Erreur'
      empty_input: 'Veuillez entrer du texte'
    features:
      title: 'Fonctionnalités'
      vue3: 'API de composition Vue 3'
      typescript: 'Support TypeScript'
      vuetify: 'Design matériel Vuetify 3'
      pinia: "Gestion d'état Pinia"
      i18n: 'Multi-langue Vue I18n'
      vite: 'Construction rapide Vite'
    quickstart:
      title: 'Démarrage rapide'
      step1: '1. Personnaliser MainContent.vue'
      step2: '2. Ajouter des commandes Tauri dans command.rs'
      step3: '3. Créer des composables pour votre logique'
      step4: "4. Ajouter des stores pour la gestion d'état"
      step5: '5. Mettre à jour les traductions i18n'

ko:
  main:
    title: '샘플 애플리케이션'
    version: '버전'
    description: 'Tauri v2와 Vue 3으로 구축된 템플릿 애플리케이션입니다. 이 콘텐츠를 자신의 애플리케이션 로직으로 교체하세요.'
    input:
      label: '입력 텍스트'
      placeholder: '에코할 텍스트를 입력하세요...'
    output:
      label: '출력'
    button:
      process: '처리'
    message:
      success: '성공적으로 처리되었습니다'
    error:
      prefix: '오류'
      empty_input: '텍스트를 입력하세요'
    features:
      title: '기능'
      vue3: 'Vue 3 Composition API'
      typescript: 'TypeScript 지원'
      vuetify: 'Vuetify 3 머티리얼 디자인'
      pinia: 'Pinia 상태 관리'
      i18n: 'Vue I18n 다국어'
      vite: 'Vite 빠른 빌드'
    quickstart:
      title: '빠른 시작'
      step1: '1. MainContent.vue 커스터마이징'
      step2: '2. command.rs에 Tauri 명령 추가'
      step3: '3. 로직용 composables 생성'
      step4: '4. 상태 관리용 stores 추가'
      step5: '5. i18n 번역 업데이트'

zhHans:
  main:
    title: '示例应用程序'
    version: '版本'
    description: '这是使用 Tauri v2 和 Vue 3 构建的模板应用程序。请将此内容替换为您自己的应用程序逻辑。'
    input:
      label: '输入文本'
      placeholder: '输入要回显的文本...'
    output:
      label: '输出'
    button:
      process: '处理'
    message:
      success: '处理成功'
    error:
      prefix: '错误'
      empty_input: '请输入文本'
    features:
      title: '功能'
      vue3: 'Vue 3 组合式 API'
      typescript: 'TypeScript 支持'
      vuetify: 'Vuetify 3 Material Design'
      pinia: 'Pinia 状态管理'
      i18n: 'Vue I18n 多语言'
      vite: 'Vite 快速构建'
    quickstart:
      title: '快速开始'
      step1: '1. 自定义 MainContent.vue'
      step2: '2. 在 command.rs 中添加 Tauri 命令'
      step3: '3. 为您的逻辑创建 composables'
      step4: '4. 添加用于状态管理的 stores'
      step5: '5. 更新 i18n 翻译'

zhHant:
  main:
    title: '範例應用程式'
    version: '版本'
    description: '這是使用 Tauri v2 和 Vue 3 構建的模板應用程式。請將此內容替換為您自己的應用程式邏輯。'
    input:
      label: '輸入文字'
      placeholder: '輸入要回顯的文字...'
    output:
      label: '輸出'
    button:
      process: '處理'
    message:
      success: '處理成功'
    error:
      prefix: '錯誤'
      empty_input: '請輸入文字'
    features:
      title: '功能'
      vue3: 'Vue 3 組合式 API'
      typescript: 'TypeScript 支援'
      vuetify: 'Vuetify 3 Material Design'
      pinia: 'Pinia 狀態管理'
      i18n: 'Vue I18n 多語言'
      vite: 'Vite 快速構建'
    quickstart:
      title: '快速開始'
      step1: '1. 自訂 MainContent.vue'
      step2: '2. 在 command.rs 中新增 Tauri 命令'
      step3: '3. 為您的邏輯建立 composables'
      step4: '4. 新增用於狀態管理的 stores'
      step5: '5. 更新 i18n 翻譯'
</i18n>

<style scoped>
code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}
</style>
