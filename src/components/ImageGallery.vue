<template>
  <div>
    <h1>Image Gallery</h1>
    <button @click="fetchImages">Fetch Images</button>
    <div v-if="images.length">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="getObjectURL(image)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useImageCache } from '../composables/useImageCache'

const { images, fetchImages, loadCachedImages } = useImageCache()

const getObjectURL = (image: Blob): string => {
  return URL.createObjectURL(image)
}

onMounted(async () => {
  await loadCachedImages()
  if (images.value.length === 0) {
    await fetchImages()
  }
})
</script>

<style scoped>
img {
  width: 50%;
  height: auto;
  margin-bottom: 1rem;
}
</style>
