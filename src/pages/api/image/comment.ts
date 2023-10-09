import Comment from "@/db/models/Comment";
import Image from "@/db/models/Image";
import AuthValidator from "@/middlewares/AuthValidator";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(405).json({ message: "Method-not-allowed" });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  return AuthValidator(
    ["user", "admin"],
    async (req: NextApiRequest, res: NextApiResponse) => {
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
  )(req, res);
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  return AuthValidator(
    ["user", "admin"],
    async (req: NextApiRequest, res: NextApiResponse) => {
      let { content = "", commentId = "" } = req.body;

      const comment = await Comment.findOne(commentId);

      if (!comment) throw new Error("comment-not-found");

      if (comment.UserId != req.user.id && req.user.role != "admin")
        throw new Error("access-denied");

      await comment.update({ content });

      res.status(200).json({ comment });
    }
  )(req, res);
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  return AuthValidator(
    ["user", "admin"],
    async (req: NextApiRequest, res: NextApiResponse) => {
      let { commentId = "" } = req.body;

      const comment = await Comment.findOne(commentId);

      if (!comment) throw new Error("comment-not-found");

      if (comment.UserId != req.user.id && req.user.role != "admin")
        throw new Error("access-denied");

      await comment.destroy();

      res.status(200).json({ comment });
    }
  )(req, res);
}

export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        await GET(req, res);
        break;
      case "POST":
        await POST(req, res);
        break;
      case "PUT":
        await PUT(req, res);
        break;
      case "DELETE":
        await DELETE(req, res);
      default:
        res.status(405).json({ message: "Method-not-allowed" });
    }
  }
);
