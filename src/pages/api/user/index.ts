import { NextApiRequest, NextApiResponse } from "next"

import User from "@/db/models/User"
import catchAsyncErrors from "@/middlewares/ErrorHandler"
import AuthValidator from "@/middlewares/AuthValidator"
import { ApiHandler } from "@/classes/ApiHandler";

async function GET(req: NextApiRequest, res: NextApiResponse) {
    let { link } = req.body;

    const user = await User.findOne({ where: { link } });

    res.status(200).json({ user });
}


async function POST(req: NextApiRequest, res: NextApiResponse) {
    let { username, email, password } = req.body;

    const user = await User.create({ username, email, password })

    res.status(200).json({ user });
}


async function PUT(req: NextApiRequest, res: NextApiResponse) {
    let { link, username, profilePicture, password } = req.body;

    let user = await User.findOne({ where: { link } });

    if (!user) throw new Error("user-not-found")

    if(user.id != req.user.id && req.user.role != "admin") throw new Error("access-denied");

    user = await user.update({ username, profilePicture, password })

    res.status(200).json({ user });
}


async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    let { link } = req.body;

    let user = await User.findOne({ where: { link } });

    if(!user) throw new Error("user-not-found");

    if(user.id != req.user.id && req.user.role != "admin") throw new Error("access-denied");

    await user.destroy()

    res.status(200).json({ user });
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