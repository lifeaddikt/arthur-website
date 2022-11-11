import Head from 'next/head'
import Grid from '../../components/Grid/Grid.js'
import Script from 'next/script'
import collectionService from '../../services/collectionService'
import pictureService from '../../services/pictureService'

export default function Collection({ pictures }) {

  return (
    <>
      <Script
        src='https://unpkg.com/colcade@0/colcade.js'
        strategy='lazyOnload'
        onReady={() => {
          let colc = new Colcade('.grid', {
            columns: '.grid-col',
            items: '.grid-item',
          })
        }}
      />
      <Grid pictures={pictures} />
    </>
  )
}

export async function getStaticPaths(){
  const collections = await collectionService.loadCollections()
  const paths = collections.map(collection => ({params : { slug: collection.slug }}))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const pictures = await pictureService.loadPicturesByCollection(params.slug)
  return {
    props: {
       pictures,
    },
  }
}
