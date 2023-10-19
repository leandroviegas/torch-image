import moment from "moment";

import { Comment, ThemeStyles } from "./styles";

import useTheme from "@/hooks/useTheme";

import Image, { Comment as CommentType } from "@/types/Gallery";

import { BsPencil, BsTrashFill } from "react-icons/bs";
import { MdClose, MdOutlineInsertComment } from "react-icons/md";
import api from "@/services/api";
import { useEffect, useState } from "react";
import CommentForm from "./Form";

import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import usePromise from "@/hooks/usePromise";

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});

function Index({
  content,
  createdAt,
  updatedAt,
  user,
  id,
  image,
  CallbackOnDelete,
}: CommentType & {
  image: Image;
  CallbackOnDelete: () => void;
}) {
  const { theme } = useTheme();

  const { data: session } = useSession();
  const { setPopup } = useAuth();

  const [action, setAction] = useState<"edit" | "reply" | "idle">("idle");

  const [newContent, setNewContent] = useState(content);

  const [promises, execPromise] = usePromise({
    "comment-delete": {
      status: "idle",
    },
    "comment-edit": {
      status: "idle",
    },
  });

  useEffect(() => {
    if (action === "edit") {
      setNewContent(content);
    }
  }, [action, content]);

  async function HandleDeleteComment() {
    const result = await execPromise(
      api.delete(`/image/comment`, { params: { commentId: id } }),
      "comment-delete"
    );

    if (result.status === "success") {
      CallbackOnDelete();
      setAction("idle");
    }

    if (result.status === "error") {
      toast(`Error deleting comment:\n ${result.error}`, {
        type: "error",
      });
    }
  }

  async function HandleEditComment() {
    const result = await execPromise(
      api.put(`/image/comment`, { commentId: id, content: newContent }),
      "comment-edit"
    );

    if (result.status === "success") {
      CallbackOnDelete();
      setAction("idle");
    }

    if (result.status === "error") {
      toast(`Error editing comment:\n ${result.error}`, {
        type: "error",
      });
    }
  }

  return (
    <Comment theme={ThemeStyles[theme]}>
      <div className="header">
        <div className="user-info">
          <span className="avatar">
            <img
              width={25}
              height={25}
              src={user.profilePicture}
              alt={`${user.username} profile picture`}
            />
          </span>
          <div>
            <span className="username">{user.username ?? "..."}</span>
            <span className="date">{moment(createdAt).format("LL")}</span>
          </div>
        </div>
        <div className="action-buttons">
          {session?.user.id == user.id && (
            <button onClick={HandleDeleteComment} className="delete">
              <BsTrashFill /> Delete
            </button>
          )}
        </div>
      </div>
      <div className="content">
        {action === "edit" ? (
          <textarea
            className={`${inter.className} styled-scroll`}
            placeholder="Edit comment"
            name="edit-comment"
            rows={2}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        ) : (
          <>
            <p>
              {content}
              {content != "" && createdAt != updatedAt && (
                <span className="edited">(Edited Message)</span>
              )}
            </p>
            {content == "" && (
              <span className="deleted">(Deleted Message)</span>
            )}
          </>
        )}
      </div>
      {action === "idle" && (
        <div className="actions">
          <button
            onClick={() => {
              if (session?.user.id == user.id) setAction("reply");
              else setPopup("SignIn");
            }}
          >
            <MdOutlineInsertComment /> Reply
          </button>
          {content != "" && session?.user.id == user.id && (
            <button onClick={() => setAction("edit")}>
              <BsPencil /> Edit
            </button>
          )}
        </div>
      )}
      {action === "edit" && (
        <div className="actions">
          <button onClick={() => HandleEditComment()}>
            <MdOutlineInsertComment /> Edit
          </button>
          <button onClick={() => setAction("idle")}>
            <MdClose /> Cancel
          </button>
        </div>
      )}
      {action === "reply" && (
        <div className="reply">
          <CommentForm
            textareaRows={2}
            referenceId={id}
            CancelCallback={() => setAction("idle")}
            identification={image.sourceId}
            provider={image.provider.name}
            CommentSuccess={() => {
              setAction("idle");
              CallbackOnDelete();
            }}
          />
        </div>
      )}
    </Comment>
  );
}

export default Index;
