import type { CollectionConfig } from 'payload'

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
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        position: 'centre',
      },
      {
        name: 'blur',
        width: 10,
        height: undefined,
        position: 'centre',
      }
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
}
