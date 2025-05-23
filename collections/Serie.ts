import { CollectionConfig } from 'payload'

export const Serie: CollectionConfig = {
  slug: 'serie',
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
      on: 'serie',
    },
  ],
}
