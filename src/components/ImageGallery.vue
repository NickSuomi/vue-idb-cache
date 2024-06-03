<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Image Gallery</h1>
    <h3 class="text-xl mb-4">{{ `Count is: ${images.length}` }}</h3>
    <div class="flex justify-center mb-4 space-x-4">
      <LoadingButton
        :text="'Fetch Images'"
        :loadingText="'Fetching...'"
        :loading="loadingFetch"
        @click="handleFetchImages"
      />
      <LoadingButton
        :text="'Load Cached Images'"
        :loadingText="'Loading...'"
        :loading="loadingLoadCache"
        @click="handleLoadCachedImages"
      />
      <LoadingButton
        :text="'Clear Cache'"
        :loadingText="'Clearing...'"
        :loading="loadingClearCache"
        @click="handleClearCache"
      />
    </div>

    <div
      v-if="images.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="overflow-hidden rounded-sm"
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
import LoadingButton from './LoadingButton.vue'
import { showToast } from '../composables/toast'

const { images, fetchImages, loadCachedImages, clearCache } = useImageCache()
const error = ref<string | null>(null)
const loadingFetch = ref<boolean>(false)
const loadingLoadCache = ref<boolean>(false)
const loadingClearCache = ref<boolean>(false)

const getObjectURL = (image: Blob): string => {
  return URL.createObjectURL(image)
}

const handleFetchImages = async () => {
  loadingFetch.value = true
  try {
    await fetchImages()
    showToast('Images fetched successfully', 'success')
    error.value = null
  } catch (e) {
    error.value = 'Failed to fetch images'
    showToast(error.value, 'error')
  } finally {
    loadingFetch.value = false
  }
}

const handleLoadCachedImages = async () => {
  loadingLoadCache.value = true
  try {
    await loadCachedImages()
    showToast('Cached images loaded', 'info')
    error.value = null
  } catch (e) {
    error.value = 'No cached images found'
    showToast(error.value, 'warning')
  } finally {
    loadingLoadCache.value = false
  }
}

const handleClearCache = async () => {
  loadingClearCache.value = true
  try {
    await clearCache()
    showToast('Cache cleared', 'success')
    error.value = null
  } catch (e) {
    error.value = 'Failed to clear cache'
    showToast(error.value, 'error')
  } finally {
    loadingClearCache.value = false
  }
}

onMounted(async () => {
  loadingLoadCache.value = true
  try {
    await loadCachedImages()
    if (images.value.length === 0) {
      await fetchImages()
    }
  } catch (e) {
    error.value = 'Error loading images'
    showToast(error.value, 'error')
  } finally {
    loadingLoadCache.value = false
  }
})
</script>

<style scoped></style>
