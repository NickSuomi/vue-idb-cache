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
import { watch } from 'vue'
import { useImageCache } from '../composables/useImageCache'
// import { ImageData } from '../types'

const { images, fetchImages } = useImageCache()

const getObjectURL = (image: Blob): string => {
  return URL.createObjectURL(image)
}

// Watch the images array to log changes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
watch(images, (newImages: any) => {
  console.log('Images updated:', newImages)
})
</script>
