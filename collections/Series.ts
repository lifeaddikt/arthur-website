import { CollectionConfig } from 'payload'

export const Series: CollectionConfig = {
  slug: 'series',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nom de la série',
      type: 'text',
      required: true,
    },
    {
      name: 'photos',
      label: 'Photos associées',
      type: 'join',
      collection: 'photography',
      on: 'series',
    },
  ],
}