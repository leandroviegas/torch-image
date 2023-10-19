import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "@/middlewares/ErrorHandler";
import Collection from "@/db/models/Collection";
import AuthValidator from "@/middlewares/AuthValidator";
import Image from "@/db/models/Image";
import User from "@/db/models/User";
import { ImagesDetails } from "@/providers/MediaFunctions";
import { SeedStringRandomizer } from "@/utils/seedRandom";

async function GET(req: NextApiRequest, res: NextApiResponse) {
  let { link = "" } = req.query;

  const collection = await Collection.findOne({
    where: { link },
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["username", "profilePicture", "link"],
      },
      {
        model: Image,
        as: "images",
        through: {
          as: "image_collection",
        },
      },
    ],
  });

  if(!collection) throw new Error("collection-not-found");

  const collectionJson = collection?.toJSON();

  const images = await ImagesDetails(
    collectionJson?.images?.map((image: any) => image.identification)
  );

  const imagesInfo = await Image.findAll({
    where: {
      identification: images?.map(
        (image) => `${image.sourceId}-${image.provider.name}`
      ),
    },
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

  let newimages = images.map((image) => {
    let imageInfo = imagesInfo.find(
      (imgInfo) =>
        imgInfo.identification == `${image.sourceId}-${image.provider.name}`
    );
    if (imageInfo)
      return {
        ...image,
        likes: imageInfo.likes
          ?.filter((like) => like.image_likes.liked)
          ?.map((like) => ({
            UserId: like.id,
            username: like.username,
            profilePicture: like.profilePicture,
          })),
      };
    return image;
  });

  newimages.sort((a, b) => {
    return SeedStringRandomizer(a.sourceId) - SeedStringRandomizer(b.sourceId);
  });

  res.status(200).json({
    collection: { ...collectionJson, images: newimages },
  });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  let { link = "", name = "", description = "" } = req.body;

  const collection = await Collection.create({
    link,
    name,
    description,
    ownerId: req.user.id,
  });

  res.status(200).json({ collection });
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  let { link = "", name = "", description = "" } = req.body;

  let collection = await Collection.findOne({ where: { link } });

  if (!collection) throw new Error("collection-not-found");

  if (collection.ownerId != req.user.id && req.user.role != "admin")
    throw new Error("access-denied");

  collection.name = name;
  collection.description = description;
  if (link != collection.link) collection.link = link;
  await collection.save();

  res.status(200).json({ collection });
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  let { link = "" } = req.query;

  let collection = await Collection.findOne({ where: { link } });

  if (!collection) throw new Error("collection-not-found");

  if (collection.ownerId != req.user.id && req.user.role != "admin")
    throw new Error("access-denied");

  await collection.destroy();

  res.status(200).json({ collection });
}

export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        await GET(req, res);
        break;
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
        res.status(405).json({ error: "method-not-allowed" });
    }
  }
);
