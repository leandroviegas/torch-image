import axios from "axios";
import Providers from "./providers.info.json";
import Image from "@/types/Gallery";

const pixabay = Providers["pixabay"];

if (!pixabay) throw new Error("Pixabay informations not found");

const pixabayApi = axios.create({
  baseURL: pixabay?.APIURL,
});

const imageDataPatternize = (hit: any): Image => {
  return {
    name: "",
    sourceId: hit.id,
    sourceImageURL: hit.pageURL,
    imageLink: hit.largeImageURL,
    previewLink: hit.webformatURL,
    imageWidth: hit.imageWidth,
    imageHeight: hit.imageHeight,
    tags: (hit.tags || "").split(", "),
    likes: [],
    owner: {
      username: hit.user,
      profilePicture: hit.userImageURL,
      userLink: `${pixabay.URL}/users/${hit.user}-${hit.user_id}/`,
    },
    provider: {
      name: pixabay.name,
      URL: pixabay.URL,
      providerPicture: pixabay.providerPicture,
    },
  };
};

async function PixabaySearch({
  query,
  perPage = 20,
  page = 1,
}: {
  query: string;
  perPage?: number;
  page?: number;
}) {
  let images: Image[] = await pixabayApi
    .get("", {
      params: {
        key: process.env.PIXABAY_API_KEY,
        safesearch: true,
        q: query,
        per_page: perPage,
        page,
      },
    })
    .then((response) => response.data.hits.map(imageDataPatternize))
    .catch((error) => {
      console.error(error);
    });
  return images;
}

async function PixabayImageDetails(id: string) {
  let image= await pixabayApi
    .get("", {
      params: {
        key: process.env.PIXABAY_API_KEY,
        id
      },
    })
    .then((response) => imageDataPatternize(response.data.hits[0]));

    return image;
}

export { PixabaySearch, PixabayImageDetails };
