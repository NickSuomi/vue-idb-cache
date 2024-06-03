<template>
  <div
    v-if="visible"
    class="fixed top-4 right-4 bg-red-500 text-white p-3 rounded shadow-lg"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { visible, message } from '../composables/toast'
</script>

<style scoped></style>
