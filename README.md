# Vue IDB Cache

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.4.21-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)

## Overview

**Vue IDB Cache** is a Vue 3 project that demonstrates how to implement an efficient image caching system using IndexedDB. This project is designed to fetch and cache images from an API (e.g., Unsplash) to enhance performance and provide a smoother user experience.

## Features

- **IndexedDB Integration**: Efficiently cache API responses in the browser.
- **Vue 3**: Leverage the power and flexibility of Vue 3.
- **TypeScript**: Static type checking to improve code quality.
- **Vite**: Fast build tool for modern web projects.
- **Pinia**: State management for Vue applications.
- **TailwindCSS**: Utility-first CSS framework for styling.

## Project Structure

- **`useImageCache.ts`**: Custom composable for handling image caching logic.
- **`ImageGallery.vue`**: Vue component to display the image gallery.
- **`idb.ts`**: Utility for interacting with IndexedDB.
- **`package.json`**: Project dependencies and scripts.

## How It Works

The project fetches images from an API and caches them in IndexedDB. On subsequent loads, images are served from the cache if available, reducing API calls and speeding up the user experience.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/vue-idb-cache.git
   cd vue-idb-cache
   ```

2. **Install dependencies**:

   Using npm:

   ```sh
   npm install
   ```

   Using yarn:

   ```sh
   yarn install
   ```

### Environment Setup

Create a `.env` file in the root directory and add your Unsplash API key:

```sh
UNSPLASH_KEY=your_unsplash_key
```

### Running the Project

1. **Development Server**:

   ```sh
   npm run dev
   ```

   This will start the development server on `http://localhost:4200`.

2. **Build for Production**:

   ```sh
   npm run build
   ```

   This will create a production-ready build in the `dist` folder.

3. **Preview Production Build**:

   ```sh
   npm run preview
   ```

### Linting and Formatting

- **Lint** the project:

  ```sh
  npm run lint
  ```

- **Format** the code:

  ```sh
  npm run format
  ```

## Integrating with Your Project

To integrate the image caching system into your own Vue project, follow these steps:

1. **Copy the `useImageCache.ts` composable**:

   ```ts
   import { ref } from 'vue';
   import { openDB } from 'idb';

   export function useImageCache() {
       const images = ref([]);
       const dbPromise = openDB('image-cache', 1, {
           upgrade(db) {
               db.createObjectStore('images');
           },
       });

       const cacheImage = async (url) => {
           const db = await dbPromise;
           const image = await fetch(url).then(res => res.blob());
           await db.put('images', image, url);
       };

       const loadImages = async () => {
           const db = await dbPromise;
           const keys = await db.getAllKeys('images');
           images.value = await Promise.all(keys.map(key => db.get('images', key)));
       };

       return { images, cacheImage, loadImages };
   }
   ```

2. **Use the composable in your component**:

   ```vue
   <template>
     <div>
       <img v-for="(image, index) in images" :key="index" :src="URL.createObjectURL(image)" />
     </div>
   </template>

   <script setup>
   import { useImageCache } from './useImageCache';

   const { images, cacheImage, loadImages } = useImageCache();

   // Cache and load images when component mounts
   onMounted(() => {
     const urls = ['url1', 'url2', 'url3'];
     urls.forEach(url => cacheImage(url));
     loadImages();
   });
   </script>
   ```

3. **Ensure you have the necessary dependencies**:

   ```sh
   npm install idb
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [TailwindCSS](https://tailwindcss.com/)
- [idb](https://github.com/jakearchibald/idb)
