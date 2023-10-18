import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import GridGallery from "@/components/Gallery/Grid";
import CommentList from "./CommentList";
import CommentForm from "./CommentList/Comment/Form";
import { ImageDetails, ThemeStyles } from "./styles";

import Image, { Comment as CommentType } from "@/types/Gallery";

import useUserGalley from "@/hooks/useUserGalley";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";

import api from "@/services/api";
import Link from "next/link";

import { HiCollection, HiUser } from "react-icons/hi";
import { MdThumbUpAlt } from "react-icons/md";
import { toast } from "react-toastify";

interface ImageDetailsProps {
  ImagePreDetails: Image & { Like: () => void };
}

function Index({ ImagePreDetails }: ImageDetailsProps) {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { setPopup } = useAuth();
  const { setShowCollectionWindow, setImageCollectionTab } = useUserGalley();

  const [page, setPage] = useState<number>(1);

  const [loadStatus, setLoadStatus] = useState<
    "load" | "loading" | "success" | "error"
  >("success");

  const [loadCommentsStatus, setLoadCommentsStatus] = useState<
    "load" | "loading" | "success" | "error"
  >("load");

  const gridRef = useRef<any>();

  const [comments, setComments] = useState<CommentType[]>([]);

  function LoadComments() {
    if (loadCommentsStatus == "loading") return;

    setLoadCommentsStatus("loading");

    api
      .get("/image/details", {
        params: {
          identification: ImagePreDetails.sourceId,
          provider: ImagePreDetails.provider.name,
        },
      })
      .then((resp) => {
        setComments(resp.data.image?.comments);
        setLoadCommentsStatus("success");
      })
      .catch((error) => {
        setLoadCommentsStatus("error");
        toast(`Error to load image details: ${error}`, {
          type: "error",
        });
      });
  }

  function Search({ query }: { query: string }) {
    if (loadStatus == "loading") return;

    setLoadStatus("loading");

    api
      .get("/images/search", { params: { query, page } })
      .then((resp) => {
        gridRef.current?.AddImages(
          resp.data?.images?.filter(
            (image: Image) =>
              `${image.sourceId}-${image.provider.name}` !=
              `${ImagePreDetails.sourceId}-${ImagePreDetails.provider.name}`
          ) || []
        );
        setPage((p) => p + 1);
        setTimeout(() => {
          setLoadStatus("success");
        }, 1000);
      })
      .catch((error) => {
        setLoadStatus("error");
        toast(`Error searching for results: ${error}`, {
          type: "error",
        });
      });
  }

  useEffect(() => {
    if (loadStatus == "load") Search({ query: ImagePreDetails?.tags[0] || "" });
  }, [loadStatus]);

  useEffect(() => {
    gridRef.current.ClearImages();
    setComments([]);
    Search({ query: ImagePreDetails?.tags[0] || "" });

    LoadComments();
  }, [ImagePreDetails.sourceId, ImagePreDetails.provider.name]);

  return (
    <ImageDetails theme={ThemeStyles[theme]}>
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
                <button
                  onClick={() => {
                    if (session?.user?.id) {
                      setImageCollectionTab({
                        ...ImagePreDetails,
                      });
                      setShowCollectionWindow(true);
                    } else setPopup("SignIn");
                  }}
                >
                  <HiCollection />
                </button>
              </div>
            </div>
          </div>
          <div className="comment-section">
            <div className="comment-list styled-scroll">
              {comments.length > 0 ? (
                <CommentList
                  image={ImagePreDetails}
                  comments={comments}
                  CallbackOnDelete={LoadComments}
                />
              ) : (
                <div className="no-comment">
                  <span>Be the first to comment</span>
                </div>
              )}
            </div>
            <div className="comment-form">
              <CommentForm
                identification={ImagePreDetails.sourceId}
                provider={ImagePreDetails.provider.name}
                CommentSuccess={LoadComments}
              />
            </div>
          </div>
        </div>
      </div>
      <GridGallery
        ref={gridRef}
        LoadMore={() => {
          setLoadStatus((ls) => (ls == "loading" ? ls : "load"));
        }}
      />
    </ImageDetails>
  );
}

export default Index;
