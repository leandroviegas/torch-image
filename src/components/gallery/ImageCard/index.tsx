"use client";
import api from "@/services/api";

import { useSession } from "next-auth/react";
import useTheme from "@/hooks/useTheme";

import { HiCollection } from "react-icons/hi";
import { MdThumbUpAlt } from "react-icons/md";

import ImageType, { Like } from "@/types/Image";
import Image from "next/image";

import { ImageCard, ThemeStyles } from "./styles";

const Index = ({
  previewLink,
  owner,
  provider,
  likes,
  sourceId,
  ChangeLikes,
}: ImageType & {
  ChangeLikes: (likes: Like[], sourceId: string, provider: string) => void;
}) => {
  const { data: session } = useSession();
  const { theme } = useTheme();

  async function Like() {
    let lastLikes = likes;

    if (session?.user?.id) {
      if (lastLikes.find((like) => like.UserId == session?.user?.id))
        ChangeLikes(
          lastLikes.filter((like) => like.UserId != session?.user?.id),
          sourceId,
          provider.name
        );
      else
        ChangeLikes(
          [
            ...lastLikes,
            {
              UserId: session.user.id,
              profilePicture: session?.user?.profilePicture,
              username: session?.user?.username,
            },
          ],
          sourceId,
          provider.name
        );
    }

    await api
      .put("/image/like", { identification: sourceId, provider: provider.name })
      .then((res) => {
        lastLikes = res.data.image.likes;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        ChangeLikes(lastLikes, sourceId, provider.name);
      });
  }

  return (
    <ImageCard theme={ThemeStyles[theme]}>
      <div className="image">
        <div className="info-card">
          <div className="user-info">
            <a href={owner.userLink} target="_blank">
              <Image
                width={30}
                height={30}
                src={owner.profilePicture}
                alt={owner.username}
              />
              <span>{owner.username}</span>
            </a>
          </div>
        </div>
        <img src={previewLink} alt="" />
      </div>
      <div className="footer">
        <div className="buttons">
          <button>
            <HiCollection />
          </button>
          <button
            onClick={Like}
            className={
              likes.find((like) => like.UserId == (session?.user?.id || ""))
                ? "selected"
                : ""
            }
          >
            <MdThumbUpAlt />
          </button>
        </div>
        <div className="provider">
          <a href={provider.URL} target="_blank">
            <span>{provider.name}</span>
            <Image
              width={25}
              height={25}
              src={provider.providerPicture}
              alt={provider.name}
            />
          </a>
        </div>
      </div>
    </ImageCard>
  );
};

export default Index;