<script setup>
import { ref, onMounted } from 'vue'
import defineCustomMode from '@/functions';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css'; // Убедитесь, что ваш файл стилей подключен

const scriptContent = ref('')
const history = ref([])
const redoHistory = ref([])
const scriptName = ref('')
const scriptDescription = ref('')
const darkMode = ref(true);

const emit = defineEmits(['gomain'])

const saveScript = () => {
  console.log('Сценарий сохранен:', scriptName.value, scriptContent.value)
  history.value = []
  redoHistory.value = []
}

const handleKeyDown = (event) => {
  if (event.ctrlKey && event.key === 'z') {
    event.preventDefault()
    undoLastLine()
  } else if (event.ctrlKey && event.key === 'y') {
    event.preventDefault()
    redoLastLine()
  }
}

const undoLastLine = () => {
  const lines = scriptContent.value.split('\n')
  if (lines.length > 0) {
    redoHistory.value.push(lines.pop())
    scriptContent.value = lines.join('\n')
  }
}

const redoLastLine = () => {
  if (redoHistory.value.length > 0) {
    const lastUndoneLine = redoHistory.value.pop()
    scriptContent.value += (scriptContent.value ? '\n' : '') + lastUndoneLine
  }
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
        v-model="scriptContent"
        class="w-full h-64 p-2 border border-gray-300 rounded"
        placeholder="Введите ваш сценарий..."
        @keydown="handleKeyDown"
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
