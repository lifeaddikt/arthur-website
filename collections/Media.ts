import type { CollectionConfig } from 'payload'
import { getPlaiceholder } from 'plaiceholder'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
      },
    }
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
        effort: 6,
      }
    },
    resizeOptions: {
      width: 1500,
      height: 1500,
      fit: 'inside',
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          const base64 = await getPlaiceholder(req.file.data)
          data.blurDataURL = base64.base64
        }
      },
    ],
  }
}
