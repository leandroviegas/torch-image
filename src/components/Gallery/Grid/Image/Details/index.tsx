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
import usePromise from "@/hooks/usePromise";
import { BiLoaderCircle } from "react-icons/bi";

interface ImageDetailsProps {
  ImagePreDetails: Image & { Like: () => void };
}

function Index({ ImagePreDetails }: ImageDetailsProps) {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { setPopup } = useAuth();
  const { setShowCollectionWindow, setImageCollectionTab, userCollections } = useUserGalley();

  const [page, setPage] = useState<number>(1);

  const inCollections = userCollections.some((userCollection) => {
    return userCollection.images.some(
      (image) => image.identification == `${ImagePreDetails.sourceId}-${ImagePreDetails.provider.name}`
    );
  });

  const [loadStatus, setLoadStatus] = useState<
    "load" | "loading" | "success" | "error"
  >("success");

  const gridRef = useRef<any>();

  const [comments, setComments] = useState<CommentType[]>([]);

  const [promises, execPromise] = usePromise({
    "comments-load": {
      status: "idle",
    },
  });

  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  async function LoadComments() {
    const result = await execPromise(
      api.get("/image/details", {
        params: {
          identification: ImagePreDetails.sourceId,
          provider: ImagePreDetails.provider.name,
        },
      }),
      "comments-load"
    );

    if (result.status === "success") {
      setComments(result.response?.data?.image.comments || []);
    }

    if (result.status === "error") {
      toast(`Error loading image details:\n ${result.error}`, {
        type: "error",
      });
    }
  }

  async function Search({ query }: { query: string }) {
    if (loadStatus == "loading") return;

    setLoadStatus("loading");

    const result = await execPromise(
      api.get("/images/search", { params: { query, page } }),
      "search"
    );

    if (result.status === "success") {
      gridRef.current?.AddImages(
        result.response?.data?.images?.filter(
          (image: Image) =>
            `${image.sourceId}-${image.provider.name}` !=
            `${ImagePreDetails.sourceId}-${ImagePreDetails.provider.name}`
        ) || []
      );
      setPage((p) => p + 1);
      setInitialLoad(true);
      setTimeout(() => {
        setLoadStatus("success");
      }, 1000);
    }

    if (result.status === "error") {
      setLoadStatus("error");
      toast(`Error loading images:\n ${result.error}`, {
        type: "error",
      });
    }
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
                  className={inCollections ? "selected" : ""}
                >
                  <HiCollection />
                </button>
              </div>
            </div>
          </div>
          <div className="comment-section">
            <div className="comment-list styled-scroll">
              {promises["comments-load"].status == "success" ? (
                comments.length > 0 ? (
                  <CommentList
                    image={ImagePreDetails}
                    comments={comments}
                    CallbackOnDelete={LoadComments}
                  />
                ) : (
                  <div className="no-comment">
                    <span>Be the first to comment</span>
                  </div>
                )
              ) : promises["comments-load"].status == "error" ? (
                <div className="no-comment">
                  <span>Could not load comments</span>
                </div>
              ) : (
                promises["comments-load"].status == "loading" && (
                  <div className="no-comment">
                    <span>Loading...</span>
                  </div>
                )
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
      {!initialLoad && (
        <div className="loading">
          <BiLoaderCircle />
        </div>
      )}
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
