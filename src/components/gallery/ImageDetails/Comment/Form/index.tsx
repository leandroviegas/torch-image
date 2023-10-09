import { MdOutlineInsertComment } from "react-icons/md";
import Form, { ThemeStyles } from "./styles";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import api from "@/services/api";

type CommentFormProps = {
  commentId?: string;
  preContent?: string;
  provider?: string;
  identification?: string;
  CommentSuccess: () => void;
};

function CommentForm({
  provider = "",
  identification = "",
  commentId = "",
  preContent = "",
  CommentSuccess
}: CommentFormProps) {
  const { theme } = useTheme();

  const [content, setContent] = useState(preContent);

  function CommentHandler(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (commentId) {
      api
        .put(`/image/comment`, {
          data: {
            content,
            commentId,
          },
        })
        .then((resp) => {
          setContent("");
          CommentSuccess();
        });
    } else {
      api
        .post("/image/comment", {
            content,
            provider,
            identification,
        })
        .then((resp) => {
          setContent("");
          CommentSuccess();
        });
    }
  }

  return (
    <Form onSubmit={CommentHandler} theme={ThemeStyles[theme]}>
      <div>
        <textarea
          className=" styled-scroll"
          name="comment"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          placeholder="Adicione um comentário"
          rows={3}
        ></textarea>
        <hr />
        <div className="actions">
          <button type="submit">
            <MdOutlineInsertComment />
            Comment
          </button>
        </div>
      </div>
    </Form>
  );
}

export default CommentForm;
