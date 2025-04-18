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
      async ({ data }) => {
        if (data.url && typeof data.url === 'string') {
          const image = await fetch(process.env.NEXT_PUBLIC_URL + data.url)
          const resizedImage = await sharp(await image.arrayBuffer()).resize(10, 10, { fit: 'cover' }).toBuffer()
          const { base64 } = await getPlaiceholder(resizedImage)
          data.blurDataURL = base64
        }
      }
    ]
  }
}
