<script setup>
import TheHeader from './components/TheHeader.vue'
import { ref } from 'vue'
import { PAGE_CREATE, PAGE_LIBRARY, PAGE_LOGIN, PAGE_MAIN, PAGE_REDACT } from './constants'
import {normalizePageHash} from './functions'
import TheCreate from './pages/TheCreate.vue'
import TheLibrary from './pages/TheLibrary.vue'
import TheMain from './pages/TheMain.vue'
import TheRedact from './pages/TheRedact.vue'
import TheLogin from './pages/TheLogin.vue'

const currentPage = ref(normalizePageHash())

function goTo(params){
  currentPage.value = params
}
</script>

<template>
  <header>
    <TheHeader
      :currentPage="currentPage"
      @navigate="goTo($event)"
      @go-to-main="goTo(PAGE_MAIN)"
    />
  </header>
  <main flex flex-grow flex-col>
    <TheMain v-show="currentPage === PAGE_MAIN" />
    <TheRedact v-show="currentPage === PAGE_REDACT"  @goToMain="goTo(PAGE_MAIN)"/>
    <TheLibrary v-show="currentPage === PAGE_LIBRARY" />
    <TheCreate v-show="currentPage === PAGE_CREATE" />
    <TheLogin v-show="currentPage === PAGE_LOGIN" />
  </main>
</template>

<style scoped></style>
