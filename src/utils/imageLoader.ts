// Dedicated Image Preloading and Cache Engine

const imageCache = new Set<string>();

/**
 * Preloads a single image into browser cache and decodes it if possible.
 */
export function preloadImage(url: string): Promise<boolean> {
  if (!url) return Promise.resolve(false);
  if (imageCache.has(url)) return Promise.resolve(true);

  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageCache.add(url);
      if ('decode' in img) {
        img.decode().catch(() => {}).finally(() => resolve(true));
      } else {
        resolve(true);
      }
    };
    img.onerror = () => {
      resolve(false);
    };
  });
}

/**
 * Eagerly preloads a list of image URLs in parallel.
 */
export function preloadImages(urls: string[]): Promise<boolean[]> {
  return Promise.all(urls.map((url) => preloadImage(url)));
}

/**
 * Checks if an image is already cached.
 */
export function isImagePreloaded(url: string): boolean {
  return imageCache.has(url);
}
