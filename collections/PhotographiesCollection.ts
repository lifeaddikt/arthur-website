import { CollectionConfig } from 'payload'

export const PhotographiesCollection: CollectionConfig = {
  slug: 'photographies-collection',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nom de la collection',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      label: 'Ordre',
      type: 'number',
      required: false,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'photos',
      label: 'Photos associées',
      type: 'join',
      collection: 'photography',
      on: 'collection',
      hasMany: true,
    },
    {
      name: 'availableSeries',
      label: 'Séries disponibles',
      type: 'relationship',
      relationTo: 'serie',
      hasMany: true,
      required: false,
      admin: {
        description: 'Les séries disponibles pour filtrer cette collection. Peut ne pas être bien mise à jour automatiquement.',
      },
    },
    {
      name: 'desktopPhoto',
      label: 'Photo principale (desktop)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mobilePhoto',
      label: 'Photo principale (mobile)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        data.slug = data.name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
        return data
      },
    ],
  },
}

export default PhotographiesCollection
