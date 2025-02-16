import { CollectionConfig } from 'payload'

export const Photography: CollectionConfig = {
  slug: 'photography',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre de la photographie',
      type: 'text',
      required: true,
    },
    {
      name: 'place',
      label: 'Lieu',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'text',
      required: true,
    },
    {
      name: 'picture',
      label: 'Upload de la photographie',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'collections',
      label: 'Collections associées',
      type: 'relationship',
      relationTo: 'photographies-collection',
      hasMany: true,
      required: true,
    },
    {
      name: 'series',
      label: 'Série (facultatif)',
      type: 'relationship',
      relationTo: 'series',
      hasMany: true,
      required: false,
    },
  ],
}

export default Photography
