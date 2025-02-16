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
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        readOnly: true, 
      },
    },
    {
      name: 'series',
      label: 'Séries associées',
      type: 'relationship',
      relationTo: 'series',
      hasMany: true,
    },
    {
      name: 'photos',
      label: 'Photos associées',
      type: 'join',
      collection: 'photography',
      on: 'collections',
      hasMany: true, // Une collection peut contenir plusieurs photos
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