import { openDB } from 'idb'

const dbPromise = openDB('image-cache', 1, {
  upgrade(db) {
    db.createObjectStore('images')
  },
})

export const setCachedImage = async (url: string, blob: Blob) => {
  const db = await dbPromise
  await db.put('images', blob, url)
}

export const getCachedImage = async (
  url: string,
): Promise<Blob | undefined> => {
  const db = await dbPromise
  return db.get('images', url)
}

export const deleteCachedImage = async (url: string) => {
  const db = await dbPromise
  await db.delete('images', url)
}
