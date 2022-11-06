const collectionService = {
    baseUrl: process.env.NEXT_PUBLIC_APP_BACK_URL + 'wp/v2',

    loadCollections : async () => {
        return fetch(`${collectionService.baseUrl}/collection?acf_format=standard`)
        .then(res => res.json())
    }
}

export default collectionService