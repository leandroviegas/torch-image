import Comment from "@/db/models/Comment";
import Image from "@/db/models/Image";
import AuthValidator from "@/middlewares/AuthValidator";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

async function POST(req: NextApiRequest, res: NextApiResponse) {
  let { content = "", provider = "", identification = "" } = req.body;

  const [image] = await Image.findOrCreate({
    where: { provider: `${provider}`, identification: `${identification}` },
  });

  if (!image) throw new Error("image-not-found");

  const comment = await Comment.create({
    ImageId: image.id,
    UserId: req.user.id,
    content,
  });

  res.status(200).json({ comment });
}


async function PUT(req: NextApiRequest, res: NextApiResponse) {
  let { content = "", commentId = "" } = req.body;

  const comment = await Comment.findOne(commentId);

  if (!comment) throw new Error("comment-not-found");

  if (comment.UserId != req.user.id && req.user.role != "admin")
    throw new Error("access-denied");

  await comment.update({ content });

  res.status(200).json({ comment });
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  let { commentId = "" } = req.body;

  const comment = await Comment.findOne(commentId);

  if (!comment) throw new Error("comment-not-found");

  if (comment.UserId != req.user.id && req.user.role != "admin")
    throw new Error("access-denied");

  await comment.destroy();

  res.status(200).json({ comment });
}


export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "POST":
        await AuthValidator(["user", "admin"], POST)(req, res);
        break;
      case "PUT":
        await AuthValidator(["user", "admin"], PUT)(req, res);
        break;
      case "DELETE":
        await AuthValidator(["user", "admin"], DELETE)(req, res);
        break;
      default:
        res.status(405).json({ message: "Method-not-allowed" });
    }
  }
);
