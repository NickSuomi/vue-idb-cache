<template>
  <div
    v-if="visible"
    :class="[
      'fixed top-4 right-4 text-white p-3 rounded-sm shadow-lg',
      toastClasses[type],
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { visible, message, type, ToastType } from '../composables/toast'

const toastClasses = computed<Record<ToastType, string>>(() => ({
  success: 'bg-green-300',
  error: 'bg-red-300',
  warning: 'bg-yellow-300',
  info: 'bg-blue-300',
}))
</script>

<style scoped></style>
