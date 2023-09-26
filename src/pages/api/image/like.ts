import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import Image from "@/db/models/Image";
import AuthValidator from "@/middlewares/AuthValidator";

export default catchAsyncErrors(AuthValidator(["user", "admin"], async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "PUT") {
        let { identification, provider } = req.body

        const [image] = await Image.findOrCreate({ where: { identification: `${identification}-${provider}`, provider } });

        await image.update({ likes: [...image.likes, req.user.id] });

        res.status(200).json({ image });
    } else {
        res.status(405).json({ error: "Method-not-allowed" });
    }
}
))