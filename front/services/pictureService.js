const pictureService = {
  baseUrl: process.env.NEXT_PUBLIC_APP_BACK_URL + 'wp/v2',

  loadPicturesByCollection : async (slug) => {
    return fetch(`${pictureService.baseUrl}/picture?_embed&collection_slug=${slug}`)
    .then(res => res.json())
  },
}

export default pictureService