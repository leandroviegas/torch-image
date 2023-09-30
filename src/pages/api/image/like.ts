import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/ErrorHandler";

import Image, { ImageLikes } from "@/db/models/Image";
import AuthValidator from "@/middlewares/AuthValidator";
import User from "@/db/models/User";

export default catchAsyncErrors(
  AuthValidator(
    ["user", "admin"],
    async (req: NextApiRequest, res: NextApiResponse) => {
      if (req.method == "PUT") {
        let { identification, provider } = req.body;

        const [image] = await Image.findOrCreate({
          where: { identification: `${identification}-${provider}`, provider },
          include: {
            model: User,
            as: "likes",
            attributes: ["username", "profilePicture", "id"],
            through: {
              as: "image_likes",
              attributes: ["liked"],
            },
          },
        });

        if (!image) throw Error("could-not-like-the-image");

        const [imageLikes] = await ImageLikes.findOrCreate({
          where: { ImageId: image.id, UserId: req.user.id },
        });

        await imageLikes.update({ liked: !imageLikes.liked });

        await image.reload();

        const likes = image.likes
          ?.filter((like) => like.image_likes.liked)
          ?.map((like) => ({
            UserId: like.id,
            username: like.username,
            profilePicture: like.profilePicture,
          }));

        res.status(200).json({ image: { ...image.toJSON(), likes } });
      } else {
        res.status(405).json({ error: "Method-not-allowed" });
      }
    }
  )
);
