import Comment from "@/db/models/Comment";
import Image from "@/db/models/Image";
import AuthValidator from "@/middlewares/AuthValidator";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

async function POST(req: NextApiRequest, res: NextApiResponse) {
  let {
    content = "",
    provider = "",
    identification = "",
    referenceId,
  } = req.body;

  const [image] = await Image.findOrCreate({
    where: { provider: `${provider}`, identification: `${identification}` },
  });

  if (!image) throw new Error("image-not-found");

  let referenceCommnt;

  if (referenceId) referenceCommnt = await Comment.findByPk(referenceId);

  const comment = await Comment.create({
    ImageId: image.id,
    UserId: req.user.id,
    referenceId: referenceCommnt?.id,
    content,
  });

  res.status(200).json({ comment });
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  let { content = "", commentId = "" } = req.body;

  const comment = await Comment.findByPk(commentId);

  if (!comment) throw new Error("comment-not-found");

  if (comment.UserId != req.user.id && req.user.role != "admin")
    throw new Error("access-denied");

  comment.content = content;

  await comment.save();

  res.status(200).json({ comment });
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  let { commentId = "" } = req.query;

  let query: { id: string } | { id: string; UserId: string } = {
    id: commentId as string,
  };

  if (!["admin"].includes(req.user.role)) {
    query = { ...query, UserId: req.user.id };
  }

  const comment = await Comment.findOne({ where: query });

  if (!comment) throw new Error("comment-not-found");

  comment.content = "";

  await comment.save({ validate: false });

  let comments = await Comment.findAll({
    where: { ImageId: comment.ImageId },
  });

  let commentsToDelete: string[] = [];

  /* Delete all the parents that have no children(children, grandchildren...) with content */

  function ChildrenHasContent(commentToCheck: Comment) {
    return (function CheckChildComments(comment) {
      return (
        comment.content.length > 0 ||
        comments
          .filter((cmnt) => cmnt.referenceId == comment.id?.toString())
          .some(CheckChildComments)
      );
    })(commentToCheck);
  }

  let topParent: Comment | undefined = comment;

  while (topParent) {
    if (!ChildrenHasContent(topParent)) commentsToDelete.push(topParent.id);
    topParent = comments.find(
      (cmnt) => cmnt.id?.toString() == topParent?.referenceId?.toString()
    );
  }

  await Comment.destroy({ where: { id: commentsToDelete } });

  return res.status(200).json({});
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
