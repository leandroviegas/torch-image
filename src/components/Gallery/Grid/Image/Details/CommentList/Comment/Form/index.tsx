import { useState } from "react";

import Form, { ThemeStyles } from "./styles";

import useTheme from "@/hooks/useTheme";

import api from "@/services/api";

import { MdClose, MdOutlineInsertComment } from "react-icons/md";

import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});

type CommentFormProps = {
  referenceId?: string;
  preContent?: string;
  provider?: string;
  identification?: string;
  textareaRows?: number;
  CommentSuccess: () => void;
  CancelCallback?: () => void;
};

function CommentForm({
  provider = "",
  identification = "",
  referenceId = "",
  preContent = "",
  textareaRows = 3,
  CommentSuccess,
  CancelCallback = () => {},
}: CommentFormProps) {
  const { theme } = useTheme();

  const { data: session } = useSession();

  const { setPopup } = useAuth();

  const [content, setContent] = useState(preContent);

  function CommentHandler(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!session?.user?.id) {
      setPopup("SignIn");
    } else {
      api
        .post("/image/comment", {
          content,
          provider,
          identification,
          referenceId,
        })
        .then((resp) => {
          setContent("");
          CommentSuccess();
        }).catch((err) => {
          toast(`Error to comment: ${err}`, {
            type: "error",
          });
        });
    }
  }

  return (
    <Form
      className={referenceId ? "reply" : "comment"}
      onSubmit={CommentHandler}
      theme={ThemeStyles[theme]}
    >
      <div>
        <textarea
          className={`${inter.className} styled-scroll`}
          name="comment"
          value={content}
          onChange={(evt) => {
            if (!session?.user?.id) {
              setPopup("SignIn");
              return;
            }
            setContent(evt.target.value);
          }}
          placeholder="Add a comment"
          rows={textareaRows}
        ></textarea>
        <hr />
        <div className="actions">
          {!referenceId && (
            <button type="submit">
              <MdOutlineInsertComment />
              Comment
            </button>
          )}

          {referenceId && (
            <>
              <button type="submit">
                <MdOutlineInsertComment />
                Reply
              </button>
              <button type="button" onClick={CancelCallback}>
                <MdClose /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </Form>
  );
}

export default CommentForm;
