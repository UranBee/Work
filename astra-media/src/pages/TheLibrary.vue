<script setup>
import { ref } from 'vue'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, PlayIcon } from '@heroicons/vue/24/outline'

const scripts = ref([
  { id: 1, name: 'Сценарий 1', description: 'Краткое описание сценария 1.' },
  { id: 2, name: 'Сценарий 2', description: 'Краткое описание сценария 2.' },
  { id: 3, name: 'Сценарий 3', description: 'Краткое описание сценария 3.' },
  { id: 4, name: 'Сценарий 4', description: 'Краткое описание сценария 4.' },
  { id: 5, name: 'Сценарий 5', description: 'Краткое описание сценария 5.' },
  { id: 6, name: 'Сценарий 6', description: 'Краткое описание сценария 6.' },
  { id: 7, name: 'Сценарий 7', description: 'Краткое описание сценария 7.' },
  { id: 8, name: 'Сценарий 8', description: 'Краткое описание сценария 8.' },
  { id: 9, name: 'Сценарий 9', description: 'Краткое описание сценария 9.' },
  { id: 10, name: 'Сценарий 10', description: 'Краткое описание сценария 10.' }
])

const editScript = (scriptId) => {
  console.log('Редактировать сценарий:', scriptId)
  // Реализуйте логику редактирования сценария
}

const cloneScript = (scriptId) => {
  console.log('Клонировать сценарий:', scriptId)
  const script = scripts.value.find((s) => s.id === scriptId)
  if (script) {
    const newId = scripts.value.length + 1 // Простейшая генерация нового ID
    scripts.value.push({
      id: newId,
      name: `${script.name} (Копия)`,
      description: script.description
    })
  }
}

const deleteScript = (scriptId) => {
  console.log('Удалить сценарий:', scriptId)
  scripts.value = scripts.value.filter((s) => s.id !== scriptId)
}

const runScript = (scriptId) => {
  console.log('Запустить сценарий:', scriptId)
  // Реализуйте логику запуска сценария
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Библиотека Сценариев</h1>

    <div class="flex flex-col space-y-4">
      <div
        v-for="script in scripts"
        :key="script.id"
        class="bg-white border border-gray-300 rounded p-4 shadow"
      >
        <h2 class="text-xl font-semibold mb-2">{{ script.name }}</h2>
        <p class="text-gray-700 mb-4">{{ script.description }}</p>
        <div class="flex items-center space-x-4">
          <div class="flex-grow flex space-x-4">
            <button
              @click="editScript(script.id)"
              class="bg-blue-500 text-white flex items-center px-4 py-2 rounded"
            >
              <PencilIcon class="h-5 w-5 mr-2" />
              Редактировать
            </button>
            <button
              @click="cloneScript(script.id)"
              class="bg-green-500 text-white flex items-center px-4 py-2 rounded"
            >
              <DocumentDuplicateIcon class="h-5 w-5 mr-2" />
              Клонировать
            </button>
            <button
              @click="deleteScript(script.id)"
              class="bg-red-500 text-white flex items-center px-4 py-2 rounded"
            >
              <TrashIcon class="h-5 w-5 mr-2" />
              Удалить
            </button>
          </div>
          <button
            @click="runScript(script.id)"
            class="bg-yellow-500 text-white flex items-center px-4 py-2 rounded ml-auto"
          >
            <PlayIcon class="h-5 w-5 mr-2" />
            Запустить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
