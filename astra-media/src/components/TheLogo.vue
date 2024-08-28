<script setup>
    import { PAGE_MAIN } from '@/constants';
</script>

<template>
  <a :href="`#${PAGE_MAIN}`" class="flex items-center"> 
    <!-- Картинка временная -->
    <img src="../assets/logo.png" alt="Logo" class="h-25" />
  </a>
</template>
