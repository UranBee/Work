<script setup>
import { NAV_ITEMS } from '../constants';
// Объявляем пропсы и события
const props = defineProps(['currentPage'])
const emit = defineEmits(['navigate', 'goToMain'])

// Импортируем компоненты
import NavItem from './NavItem.vue'
import TheLogo from './TheLogo.vue'
</script>

<template>
  <header class="sticky top-0 z-20 bg-gray-100 border-b">
    <div class="container mx-auto flex items-center justify-between h-16 p-4">
      <!-- Обработка клика на логотипе -->
      <TheLogo @click="emit('goToMain')" />
      <nav class="flex space-x-4">
        <!-- Генерация навигационных ссылок -->
        <NavItem
          v-for="(icon, page) in NAV_ITEMS"
          :key="page"
          :href="`#${page}`"
          :class="{ 'text-gray-900 underline pointer-events-none': page === props.currentPage }"
          v-on:click="() => emit('navigate', page)"
        >
          <component :is="icon" class="w-6 h-6 mr-2" />{{ page }}
        </NavItem>
      </nav>
    </div>
  </header>
</template>
