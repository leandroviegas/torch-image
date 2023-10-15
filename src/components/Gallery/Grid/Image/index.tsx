"use client";
import api from "@/services/api";

import { useSession } from "next-auth/react";
import useTheme from "@/hooks/useTheme";

import { HiCollection, HiUser } from "react-icons/hi";
import { MdThumbUpAlt } from "react-icons/md";

import ImageType, { Like } from "@/types/Gallery";
import Image from "next/image";

import { ImageCard, ThemeStyles } from "./styles";
import useAuth from "@/hooks/useAuth";
import useUserGalley from "@/hooks/useUserGalley";
import Collection from "./Collection";
import { useState } from "react";
import OpaqueBackground from "@/components/OpaqueBackground";

type ImageCardProps = ImageType & {
  ChangeLikes: (likes: Like[], sourceId: string, provider: string) => void;
};

const Index = ({
  imageHeight,
  imageLink,
  imageWidth,
  sourceImageURL,
  name,
  previewLink,
  owner,
  provider,
  likes,
  sourceId,
  tags,
  ChangeLikes,
}: ImageCardProps) => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { setPopup } = useAuth();
  const {
    setShowDetails,
    setImageDetails,
    userCollections,
    setShowCollectionWindow,
    setImageCollectionTab
  } = useUserGalley();

  const inCollections = userCollections.some((userCollection) => {
    return userCollection.images.some(
      (image) => image.identification == `${sourceId}-${provider.name}`
    );
  });

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

      await api
        .put("/image/like", {
          identification: sourceId,
          provider: provider.name,
        })
        .then((res) => {
          lastLikes = res.data.image.likes;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          ChangeLikes(lastLikes, sourceId, provider.name);
        });
    } else {
      setPopup("SignIn");
    }
  }

  return (
    <>
      <ImageCard theme={ThemeStyles[theme]}>
        <div
          onClick={() => {
            setImageDetails({
              imageHeight,
              imageLink,
              imageWidth,
              likes,
              owner,
              name,
              previewLink,
              provider,
              tags,
              sourceId,
              sourceImageURL,
              Like,
            });
            setShowDetails(true);
          }}
          className="image"
        >
          <div className="info-card">
            <div className="user-info">
              <a href={owner.userLink} target="_blank">
                {owner.profilePicture ? (
                  <Image
                    width={30}
                    height={30}
                    src={owner.profilePicture}
                    alt={`${owner.username} profile picture`}
                  />
                ) : (
                  <HiUser />
                )}
                <span>{owner.username}</span>
              </a>
            </div>
          </div>
          <img src={previewLink} alt="" />
        </div>
        <div className="footer">
          <div className="buttons">
            <button
              onClick={() => {
                if (session?.user?.id) {
                  setImageCollectionTab({
                    imageHeight,
                    imageLink,
                    imageWidth,
                    likes,
                    owner,
                    name,
                    previewLink,
                    provider,
                    tags,
                    sourceId,
                    sourceImageURL,
                  })
                  setShowCollectionWindow(true);
                } else setPopup("SignIn");
              }}
              className={inCollections ? "selected" : ""}
            >
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
              <img
                width={25}
                height={25}
                referrerPolicy="no-referrer"
                src={provider.providerPicture}
                alt={provider.name}
              />
            </a>
          </div>
        </div>
      </ImageCard>
    </>
  );
};

export default Index;
