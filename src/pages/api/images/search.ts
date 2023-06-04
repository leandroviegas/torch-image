import { NextApiRequest, NextApiResponse } from "next";

import { SearchImages } from "@/services/providers/MediaFunctions";

import Image from "@/types/Image";

type SearchResult = {
    query: string,
    images: Image[],
    page: number,
    perPage: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { query, perPage, page, images }: SearchResult = {
        query: (req.query?.query || "").toString(),
        perPage: Math.max(20, Number(req.query?.perPage)),
        page: Math.max(1, Number(req.query?.page)),
        images: []
    };
    
    images = await SearchImages({ query, perPage, page });

    switch (req.method) {
        case 'GET':
            res.status(200).json({ query, perPage, page, images })
            break;
        default:
            res.status(200).json({ query, perPage, page, images });
    }
}