import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

// Cache the getPayload function to ensure we're using a single instance
export const getPayloadClient = cache(async () => {
  const payload = await getPayload({ config })
  return payload
}) 