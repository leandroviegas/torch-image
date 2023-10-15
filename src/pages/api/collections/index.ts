import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "@/middlewares/ErrorHandler";
import Collection from "@/db/models/Collection";
import Image from "@/db/models/Image";

async function GET(req: NextApiRequest, res: NextApiResponse) {
  let { ownerId = null } = req.query;

  let collections = await Collection.findAll({
    where: { ownerId },
    include: {
      model: Image,
      as: "images",
      through: {
        as: "image_collection",
      },
    },
  });
  
  res.status(200).json({
    collections
  });
}

export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        await GET(req, res);
        break;
      default:
        res.status(405).json({ error: "method-not-allowed" });
    }
  }
);
