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
      name: 'photos',
      label: 'Photos associées',
      type: 'join',
      collection: 'photography',
      on: 'collections',
      hasMany: true,
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