import Image from "@/types/Image";
import { PixabaySearch } from "./Pixabay";

async function SearchImages({ query, perPage = 20, page = 1 }: { query: string, perPage?: number, page?: number }) {
    let images: Image[] = [];

    let promiseResult = await Promise.allSettled([
        await PixabaySearch({ query, perPage, page })
    ]);

    promiseResult.forEach(promise => promise.status == "fulfilled" ? images.push(...promise.value) : console.error(promise.reason))

    images = images.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return images
}

export { SearchImages }