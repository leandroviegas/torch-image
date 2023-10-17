import axios from "axios";
import Providers from "./providers.info.json";
import Image from "@/types/Gallery";
import cacheData from "memory-cache";

const pixabay = Providers["pixabay"];

if (!pixabay) throw new Error("Pixabay informations not found");

const pixabayApi = axios.create({
  baseURL: pixabay?.APIURL,
});

const imageDataPatternize = (hit: any): Image => {
  const image = {
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

  cacheData.put(
    `${image.sourceId}-Pixabay-Image`,
    image,
    15 * 24 * 1000 * 60 * 60
  );

  return image;
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
  const cacheId = `${id}-Pixabay-Image`;
  const value = cacheData.get(cacheId);
  if (value) {
    return value;
  } else {
    let image = await pixabayApi
      .get("", {
        params: {
          key: process.env.PIXABAY_API_KEY,
          id,
        },
      })
      .then((response) => imageDataPatternize(response.data.hits[0]));
    cacheData.put(cacheId, image, 15 * 24 * 1000 * 60 * 60);
    return image;
  }
}

export { PixabaySearch, PixabayImageDetails };
