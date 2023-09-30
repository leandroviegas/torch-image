import { NextApiRequest, NextApiResponse } from "next"

import User from "@/db/models/User"
import catchAsyncErrors from "@/middlewares/ErrorHandler"
import AuthValidator from "@/middlewares/AuthValidator"
import { ApiHandler } from "@/classes/ApiHandler";
import Collection from "@/db/models/Collection";

async function GET(req: NextApiRequest, res: NextApiResponse) {
    let { link } = req.query;

    const collection = await Collection.findOne({ where: { link } });

    res.status(200).json({ 
        collection 
    });
}


async function POST(req: NextApiRequest, res: NextApiResponse) {
    let { link, name, description } = req.body;

    const collection = await Collection.create({ link, name, description, owner: req.user.id })

    res.status(200).json({ collection });
}


async function PUT(req: NextApiRequest, res: NextApiResponse) {
    let { link, name, description } = req.body;

    let collection = await Collection.findOne({ where: { link } });

    if (!collection) throw new Error("collection-not-found")

    if (collection.ownerId != req.user.id && req.user.role != "admin") throw new Error("access-denied");

    collection = await collection.update({  link, name, description })

    res.status(200).json({ collection });
}


async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    let { link } = req.body;

    let collection = await Collection.findOne({ where: { link } });

    if (!collection) throw new Error("collection-not-found");

    if (collection.ownerId != req.user.id && req.user.role != "admin") throw new Error("access-denied");

    await collection.destroy()

    res.status(200).json({ collection });
}


export default catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const apiHandler = new ApiHandler(req, res);

    apiHandler.methods = {
        GET,
        POST,
        PUT: AuthValidator(["user", "admin"], PUT),
        DELETE: AuthValidator(["user", "admin"], DELETE)
    }

    apiHandler.exec();
})