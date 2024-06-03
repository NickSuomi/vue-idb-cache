<template>
  <button
    type="button"
    class="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-sm flex items-center"
    :disabled="loading"
    @click="handleClick"
  >
    <svg v-if="loading" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
      ></path>
    </svg>
    <span v-if="loading">{{ loadingText }}</span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
  loadingText: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped></style>
