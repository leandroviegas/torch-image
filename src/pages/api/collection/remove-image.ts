import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "@/middlewares/ErrorHandler";
import Collection, { CollectionImages } from "@/db/models/Collection";
import AuthValidator from "@/middlewares/AuthValidator";
import Image from "@/db/models/Image";

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  let {
    collectionId = null,
    image_provider = "",
    identification = "",
  } = req.body;

  const collection = await Collection.findByPk(collectionId);

  if (!collection) throw new Error("collection-not-found");

  if (collection.ownerId != req.user.id && req.user.role != "admin")
    throw new Error("access-denied");

  const [image] = await Image.findOrCreate({
    where: {
      identification: `${identification}-${image_provider}`,
      provider: image_provider,
    },
  });

  const collectionImage = await CollectionImages.findOne({
    where: { CollectionId: collectionId, ImageId: image.id },
  });

  if(collectionImage){
    await collectionImage.destroy();
  }

  res.status(200).json({});
}

export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "PUT":
        await AuthValidator(["user", "admin"], PUT)(req, res);
        break;
      default:
        res.status(405).json({ error: "method-not-allowed" });
    }
  }
);
