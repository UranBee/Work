<script setup>
import { ref, onMounted } from 'vue'
import defineCustomMode from '@/functions';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css'; // Убедитесь, что ваш файл стилей подключен
import '../higlightStyle.css'

const scriptContent = ref('')
const scriptName = ref('')
const scriptDescription = ref('')
const darkMode = ref(true);

const emit = defineEmits(['gomain'])

const saveScript = () => {
  scriptContent.value = window.myCodeMirror.getValue();
  console.log('Сценарий сохранен:', scriptName.value, scriptContent.value)
}

const toggleTheme = () => {
  darkMode.value = !darkMode.value;
  const theme = darkMode.value ? 'dracula' : 'eclipse';
  if (window.myCodeMirror) {
    window.myCodeMirror.setOption('theme', theme);
  }
}

onMounted(() => {
  defineCustomMode(CodeMirror);

  // Инициализируем CodeMirror с пользовательским режимом и темой Dracula
  window.myCodeMirror = CodeMirror.fromTextArea(document.getElementById('scriptContentInput'), {
    lineNumbers: true,
    mode: "customDoc",
    theme: "dracula" // Начальная тема
  });
  window.myCodeMirror.refresh();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Редактирование Сценария</h1>

    <div class="mb-4">
      <label for="scriptNameInput" class="block text-lg font-medium text-gray-700">Имя сценария:</label>
      <input
        id="scriptNameInput"
        v-model="scriptName"
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Введите имя сценария..."
        @keydown="handleKeyDown"
      />
    </div>
    <div class="mb-4">
      <label for="scriptDescriptionInput" class="block text-lg font-medium text-gray-700">Описание сценария:</label>
      <textarea
        id="scriptDescriptionInput"
        v-model="scriptDescription"
        class="w-full h-20 p-2 border border-gray-300 rounded"
        placeholder="Введите описание сценария..."
        @keydown="handleKeyDown"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="scriptContentInput" class="block text-lg font-medium text-gray-700">Сценарий:</label>
      <textarea
        id="scriptContentInput"
      ></textarea>
    </div>
    <div class="flex justify-between mt-4">
      <button @click="saveScript" class="bg-blue-500 text-white px-4 py-2 rounded">
        Сохранить
      </button>

      <button @click="toggleTheme" class="bg-gray-300 text-gray-700 px-4 py-2 rounded">
        Переключить тему
      </button>

      <button @click="$emit('goToMain')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded">Назад</button>
    </div>
  </div>
</template>
