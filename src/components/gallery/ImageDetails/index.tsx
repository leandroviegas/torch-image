import useOutsideClick from "@/hooks/useOutsideClick";

import { ImageDetails, ThemeStyles } from "./styles";
import Comment from "./Comment";

import Image from "@/types/Image";
import useTheme from "@/hooks/useTheme";
import GridGallery from "@/components/gallery/Grid";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";
import { MdThumbUpAlt } from "react-icons/md";
import { useSession } from "next-auth/react";
import { HiCollection, HiUser } from "react-icons/hi";

interface ImageDetailsProps {
  setShowDetails: (value: boolean) => void;
  ImagePreDetails: Image & { Like: () => void };
}

function Index({ ImagePreDetails, setShowDetails }: ImageDetailsProps) {
  const { data: session } = useSession();
  const { theme } = useTheme();

  const [ImageDetailsRef] = useOutsideClick(() => {
    setShowDetails(false);
  });

  const [images, setImages] = useState<Image[]>([]);

  const [page, setPage] = useState<number>(1);

  const [loadStatus, setLoadStatus] = useState<"load"| "loading" | "success" | "error">(
    "success"
  );

  function Search({ query }: { query: string }) {
    if (loadStatus == "loading") return;

    setLoadStatus("loading");
    
    api
      .get("/images/search", { params: { query, page } })
      .then((resp) => {
        setImages((imgs) => [...imgs, ...resp.data.images]);
        setPage((p) => p + 1);
        setTimeout(() => {
          setLoadStatus("success");
        }, 1000);
      })
      .catch(() => {
        setLoadStatus("error");
      });
  }

  useEffect(() => {
    if (loadStatus == "load") Search({ query: ImagePreDetails?.tags[0] || "" });
  }, [loadStatus]);

  useEffect(() => {
    setImages([]);
    Search({ query: ImagePreDetails?.tags[0] || "" });
  }, [ImagePreDetails.sourceId, ImagePreDetails.provider.name]);

  return (
    <ImageDetails theme={ThemeStyles[theme]} ref={ImageDetailsRef}>
      <div className="imageInfo">
        <div className="image">
          <div className="image-section">
            <Link target="_blank" href={ImagePreDetails.sourceImageURL}>
              <img
                src={ImagePreDetails.imageLink}
                alt={`Image of ${ImagePreDetails.owner.username}`}
              />
            </Link>
            <div className="image-actions">
              <div className="user-profile">
                <Link target="_blank" href={ImagePreDetails.owner.userLink}>
                  <button className="user-profile">
                    <span className="user-profile-picture">
                      {ImagePreDetails.owner.profilePicture ? (
                        <img
                          src={ImagePreDetails.owner.profilePicture}
                          alt={`${ImagePreDetails.owner.username} profile picture`}
                        />
                      ) : (
                        <HiUser />
                      )}
                    </span>
                    <span>{ImagePreDetails.owner.username}</span>
                  </button>
                </Link>
              </div>
              <div className="actions">
                <button
                  onClick={ImagePreDetails.Like}
                  className={
                    ImagePreDetails.likes.find(
                      (like) => like.UserId == (session?.user?.id || "")
                    )
                      ? "selected"
                      : ""
                  }
                >
                  <MdThumbUpAlt />
                </button>
                <button>
                  <HiCollection />
                </button>
              </div>
            </div>
          </div>
          <div className="comment-section">
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
      <GridGallery
        images={images}
        loading={loadStatus == "loading"}
        LoadMore={() => {
          setLoadStatus((ls) => (ls == "loading" ? ls : "load"))
        }}
      />

    </ImageDetails>
  );
}

export default Index;
