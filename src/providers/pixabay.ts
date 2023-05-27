import axios from 'axios'
import Providers from './providers.info.json'

const pixabay = Providers.find(provider => provider.id === "Pixabay");


const pixabayApi = axios.create({
    baseURL: pixabay?.APIURL,
});

const imageDataPatternize = (hit: any) => {
    return {
        name: "",
        sorceId: hit.id,
        sourceImageURL: hit.pageURL,
        imageLink: hit.largeImageURL,
        previewLink: hit.webformatURL,
        imageWidth: hit.imageWidth,
        imageHeight: hit.imageHeight,
        owner: {
            username: hit.user,
            profilePicture: hit.userImageURL,
            userLink: `${pixabay?.URL}/users/${hit.user}-${hit.user_id}/`
        },
        provider: pixabay?.id
    }

}

async function Search({ query }: { query: string }) {
    let images = await pixabayApi.get('', { params: { key: process.env.PIXABAY_API_KEY, q: query } })
        .then(response => {
            let data = response.data;
            return data.hits.map(imageDataPatternize)
        }).catch((error) => {
            console.error(error)
        })


    return images;
}

export { Search }