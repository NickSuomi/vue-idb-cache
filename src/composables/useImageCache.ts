import { ref, Ref } from 'vue'
import axios from 'axios'
import {
  getCachedImage,
  setCachedImage,
  getAllCachedImages,
  clearAllCachedImages,
} from '../idb'

const API_URL = `https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&count=3`

interface ImageCache {
  images: Ref<Blob[]>
  fetchImages: () => Promise<void>
  loadCachedImages: () => Promise<void>
  clearCache: () => Promise<void>
}

let instance: ImageCache | null = null

export const useImageCache = (): ImageCache => {
  if (instance) return instance

  const images = ref<Blob[]>([])

  const _fetchImage = async (url: string): Promise<Blob> => {
    try {
      const cachedImage = await getCachedImage(url)
      if (cachedImage) {
        console.log(`Loaded from cache: ${url}`)
        return cachedImage
      }

      const response = await axios.get<Blob>(url, { responseType: 'blob' })
      const imageBlob = response.data
      await setCachedImage(url, imageBlob)
      console.log(`Fetched and cached: ${url}`)
      return imageBlob
    } catch (error) {
      console.error(error)
      return new Blob()
    }
  }

  const _showErrorToast = (message: string): void => {
    console.log(message)
  }

  const fetchImages = async (): Promise<void> => {
    try {
      const response = await axios.get(API_URL)
      const imageUrls = response.data.map(
        (img: { urls: { full: string } }) => img.urls.full,
      )
      images.value = images.value.concat(
        await Promise.all(imageUrls.map(_fetchImage)),
      )
    } catch (error) {
      console.error(error)
      _showErrorToast('Error fetching images. Loading cached images...')
      await loadCachedImages()
    }
  }

  const loadCachedImages = async (): Promise<void> => {
    const cachedImages = await getAllCachedImages()
    if (cachedImages.length === 0) {
      _showErrorToast('No cached images found.')
      return
    } else {
      images.value = cachedImages
    }
  }

  const clearCache = async (): Promise<void> => {
    try {
      await clearAllCachedImages()
      images.value = [] // Clear the images array in the application state
    } catch (error) {
      console.error(error)
      _showErrorToast('Failed to clear cache.')
    }
  }

  instance = {
    images,
    fetchImages,
    loadCachedImages,
    clearCache,
  }

  return instance
}
