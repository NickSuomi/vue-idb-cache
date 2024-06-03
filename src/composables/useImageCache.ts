import { ref, Ref } from 'vue'
import axios from 'axios'
import { getCachedImage, setCachedImage, getAllCachedImages } from '../idb' // Add getAllCachedImages function

const API_URL = `https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&count=3`

interface ImageCache {
  images: Ref<Blob[]>
  fetchImages: () => Promise<void>
  loadCachedImages: () => Promise<void>
}

let instance: ImageCache | null = null

export const useImageCache = (): ImageCache => {
  if (instance) return instance

  const images = ref<Blob[]>([])

  const fetchImage = async (url: string) => {
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
  }

  const fetchImages = async () => {
    const response = await axios.get(API_URL)
    console.log(response.data) // Log the response data
    const imageUrls = response.data.map(
      (img: { urls: { full: string } }) => img.urls.full,
    )

    images.value = await Promise.all(imageUrls.map(fetchImage))
  }

  const loadCachedImages = async () => {
    const cachedImages = await getAllCachedImages()
    images.value = cachedImages
  }

  instance = {
    images,
    fetchImages,
    loadCachedImages,
  }

  return instance
}
