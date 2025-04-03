import { getPlaiceholder } from 'plaiceholder'
import sharp from 'sharp'

// Cache for base64 placeholders
const placeholderCache = new Map<string, string | null>();

/**
 * Optimizes an image buffer by resizing it to a smaller size
 * This improves performance when generating blur placeholders
 */
async function optimizeImageBuffer(buffer: Buffer, maxWidth = 800) {
  try {
    // Use sharp to resize the image to a more optimal size for blur generation
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .toBuffer();

    return optimizedBuffer;
  } catch (err) {
    console.error('Error optimizing image:', err);
    return buffer; // Return original buffer if optimization fails
  }
}

export async function generateBlurPlaceholder(imageUrl: string, size = 4) {
  if (!imageUrl) return null;

  // Check if we have a cached result
  if (placeholderCache.has(imageUrl)) {
    return placeholderCache.get(imageUrl);
  }

  try {
    // Ensure we have a full URL
    const url = imageUrl.startsWith('http') || imageUrl.startsWith('https')
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`

    const imageResponse = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!imageResponse.ok) {
      console.error(`Failed to fetch image: ${url} - Status: ${imageResponse.status}`)
      placeholderCache.set(imageUrl, null);
      return null
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Optimize the buffer before generating the placeholder
    const optimizedBuffer = await optimizeImageBuffer(buffer);

    // Generate the placeholder with a smaller size for performance
    const { base64 } = await getPlaiceholder(optimizedBuffer, { size })

    // Cache the result
    placeholderCache.set(imageUrl, base64);
    return base64
  } catch (err) {
    console.error('Error generating blur data:', err)
    placeholderCache.set(imageUrl, null);
    return null
  }
} 