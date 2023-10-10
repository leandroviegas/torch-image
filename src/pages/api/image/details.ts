import Image from "@/db/models/Image";
import User from "@/db/models/User";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
      let { provider = "", identification = "" } = req.query;

      const image: any = await Image.findOne({
        raw: true,
        plain: false,
        nest: true,
        where: { provider, identification },
        include: {
          model: User,
          as: "comments",
          attributes: ["username", "profilePicture", "link", "id"],
          through: {
            as: "image_comment",
            attributes: ["content", "createdAt", "updatedAt", "id"],
          },
        },
      });

      res.status(200).json({
        image: {
          ...image[0],
          comments: image.map((img: any) => img.comments).filter((comment: any) => comment.image_comment.content != null).map((comment: any) => ({
            id: comment.id,
            content: comment.image_comment.content,
            createdAt: comment.image_comment.createdAt,
            updatedAt: comment.image_comment.updatedAt,
            user: {
              username: comment.username,
              profilePicture: comment.profilePicture,
              link: comment.link,
              id: comment.id,
            },
          })),
        },
      });
    }
  }
);
