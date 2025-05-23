import { CollectionConfig } from 'payload'

export const Photography: CollectionConfig = {
  slug: 'photography',
  admin: {
    useAsTitle: 'place',
  },
  fields: [
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
      displayPreview: true,
    },
    {
      name: 'collection',
      label: 'Collection associée',
      type: 'relationship',
      relationTo: 'photographies-collection',
      required: true,
      hasMany: false,
    },
    {
      name: 'serie',
      label: 'Série (facultatif)',
      type: 'relationship',
      relationTo: 'serie',
      required: false,
    },
  ],
  hooks: {
    afterChange: [async ({ doc, req: { payload } }) => {
      if (doc.serie) {
        const collection = await payload.findByID({
          collection: 'photographies-collection',
          id: doc.collection,
        })
        
        const seriesExists = collection.availableSeries?.some(
          (s) => typeof s === 'object' && s.id === doc.serie
        ) ?? false
        
        if (!seriesExists) {
          await payload.update({
            collection: 'photographies-collection',
            id: doc.collection,
            data: {
              availableSeries: [...(collection.availableSeries || []), doc.serie],
            },
          })
        }
      }
    }],
  },
}

export default Photography
