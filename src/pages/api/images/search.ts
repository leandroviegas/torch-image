import { NextApiRequest, NextApiResponse } from "next";

import { SearchImages } from "@/providers/MediaFunctions";

import ImageT from "@/types/Image";

import catchAsyncErrors from "@/middlewares/ErrorHandler";

import Image from "@/db/models/Image";
import User from "@/db/models/User";

import { SeedStringRandomizer } from "@/utils/seedRandom";

type SearchResult = {
  query: string;
  images: ImageT[];
  page: number;
  perPage: number;
};

export default catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
      let { query, perPage, page, images }: SearchResult = {
        query: (req.query?.query || "").toString(),
        perPage: Math.max(20, Number(req.query?.perPage)),
        page: Math.max(1, Number(req.query?.page)),
        images: [],
      };

      images = await SearchImages({ query, perPage, page });

      const imagesInfo = await Image.findAll({
        where: {
          identification: images.map(
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
        return (
          SeedStringRandomizer(a.sourceId) - SeedStringRandomizer(b.sourceId)
        );
      });

      res.status(200).json({ query, perPage, page, images: newimages });
    } else {
      res.status(405).json({ message: "Method-not-allowed" });
    }
  }
);
