import { NextApiRequest, NextApiResponse } from "next";

import { SearchImages } from "@/providers/MediaFunctions";

import ImageT from "@/types/Image";

import Image from "@/db/models/Image";
import catchAsyncErrors from "@/middlewares/ErrorHandler";

type SearchResult = {
    query: string,
    images: ImageT[],
    page: number,
    perPage: number
}

export default catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        let { query, perPage, page, images }: SearchResult = {
            query: (req.query?.query || "").toString(),
            perPage: Math.max(20, Number(req.query?.perPage)),
            page: Math.max(1, Number(req.query?.page)),
            images: []
        };

        images = await SearchImages({ query, perPage, page });

        const imagesInfo = await Image.findAll({ where: { identification: images.map(image => `${image.sourceId}-${image.provider.name}`) } });

        images = images.map(image => {
            let imageInfo = imagesInfo.find(imgInfo => imgInfo.identification == `${image.sourceId}-${image.provider.name}`);
            if (imageInfo) return { ...image, likes: imageInfo.likes }
            return image
        })

        res.status(200).json({ query, perPage, page, images });
    } else {
        res.status(405).json({ message: "Method-not-allowed" });
    }
})