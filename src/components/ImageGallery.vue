<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Image Gallery</h1>
    <h3 class="text-xl mb-4">{{ `Count is: ${images.length}` }}</h3>
    <div class="flex justify-center mb-4 space-x-4">
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        @click="handleFetchImages"
      >
        Fetch Images
      </button>

      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        @click="handleLoadCachedImages"
      >
        Load Cached Images
      </button>

      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        @click="handleClearCache"
      >
        Clear Cache
      </button>
    </div>

    <div v-if="loading" class="text-center">
      <Spinner />
    </div>

    <div
      v-if="images.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="overflow-hidden rounded-lg shadow-lg"
      >
        <img
          :src="getObjectURL(image)"
          class="w-full h-auto max-h-48 object-cover"
        />
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImageCache } from '../composables/useImageCache'
import Toast from './Toast.vue'
import Spinner from './Spinner.vue'
import { showToast } from '../composables/toast'

const { images, fetchImages, loadCachedImages, clearCache } = useImageCache()
const error = ref<string | null>(null)
const loading = ref<boolean>(false)

const getObjectURL = (image: Blob): string => {
  return URL.createObjectURL(image)
}

const handleFetchImages = async () => {
  loading.value = true
  try {
    await fetchImages()
    showToast('Images fetched successfully')
    error.value = null
  } catch (e) {
    error.value = 'Failed to fetch images'
    showToast(error.value)
  } finally {
    loading.value = false
  }
}

const handleLoadCachedImages = async () => {
  loading.value = true
  try {
    await loadCachedImages()
    showToast('Cached images loaded')
    error.value = null
  } catch (e) {
    error.value = 'No cached images found'
    showToast(error.value)
  } finally {
    loading.value = false
  }
}

const handleClearCache = async () => {
  loading.value = true
  try {
    await clearCache()
    showToast('Cache cleared')
    error.value = null
  } catch (e) {
    error.value = 'Failed to clear cache'
    showToast(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await loadCachedImages()
    if (images.value.length === 0) {
      await fetchImages()
    }
  } catch (e) {
    error.value = 'Error loading images'
    showToast(error.value)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.error {
  @apply bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4;
}
</style>
