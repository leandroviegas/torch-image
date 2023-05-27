import { NextApiRequest, NextApiResponse } from "next";

import { Search } from "@/providers/pixabay";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':

            break;
        case 'GET':
            res.status(200).json(await Search({ query: "" }))
            break;
        default:
            res.status(200).json({});
    }
}