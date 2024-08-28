<script>
export default {
  inheritAttrs: false
}
</script>

<template>
  <li class="list-none">
    <a v-bind="$attrs" class="flex items-center text-gray-700 mx-4 capitalize">
      <slot></slot>
    </a>
  </li>
</template>
