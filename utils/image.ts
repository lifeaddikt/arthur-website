import { getPlaiceholder } from 'plaiceholder'

// Cache for base64 placeholders
const placeholderCache = new Map<string, string | null>();

export async function generateBlurPlaceholder(imageUrl: string, size = 6) {
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
    
    const { base64 } = await getPlaiceholder(buffer, { size })
    
    // Cache the result
    placeholderCache.set(imageUrl, base64);
    return base64
  } catch (err) {
    console.error('Error generating blur data:', err)
    placeholderCache.set(imageUrl, null);
    return null
  }
} 