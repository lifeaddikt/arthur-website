import { getPlaiceholder } from 'plaiceholder'

export async function generateBlurPlaceholder(imageUrl: string, size = 10) {
  if (!imageUrl) return null
  
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
      return null
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const { base64 } = await getPlaiceholder(buffer, { size })
    
    return base64
  } catch (err) {
    console.error('Error generating blur data:', err)
    return null
  }
} 