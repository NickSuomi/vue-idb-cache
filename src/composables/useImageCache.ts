import { ref } from 'vue'
import axios from 'axios'
import { getCachedImage, setCachedImage } from '../idb'
import { ImageData } from '../types'

const API_URL = '/api/photos'

export const useImageCache = () => {
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
    const response = await axios.get<ImageData[]>(API_URL)
    console.log(response.data) // Log the response data
    const imageUrls = response.data.slice(0, 3).map((img) => img.url)

    images.value = await Promise.all(imageUrls.map(fetchImage))
  }

  return {
    images,
    fetchImages,
  }
}
