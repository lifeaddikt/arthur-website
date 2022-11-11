const pictureService = {
  baseUrl: process.env.NEXT_PUBLIC_APP_BACK_URL + 'wp/v2',

  loadPictures : async () => {
    return fetch(`${pictureService.baseUrl}/picture`)
    .then(res => res.json())
  },

  loadPicturesByCollection : async (slug) => {
    return fetch(`${pictureService.baseUrl}/picture?_embed&collection_slug=${slug}`)
    .then(res => res.json())
  },

  loadPictureById : async (id) => {
    return fetch(`${pictureService.baseUrl}/picture/${id}?_embed`)
    .then(res => res.json())
  },
}

export default pictureService