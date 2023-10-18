import Image, { Comment as CommentType } from "@/types/Gallery";

import CommentList from "./styles";
import Comment from "./Comment";
import React from "react";

interface CommentListProps {
  CallbackOnDelete: () => void;
  comments: CommentType[];
  image: Image;
}

function Index({ comments, CallbackOnDelete, image }: CommentListProps) {
  return (
    <CommentList>
      {comments
        .filter((comment) => !comment.referenceId)
        .map((comment) => {
          let relatedComments: CommentType[] = [];

          function getRelatedComments(comment: CommentType) {
            comments.forEach((cmnt) => {
              if (cmnt.referenceId == comment.id) {
                relatedComments.push(cmnt);

                if (comments.some((c) => c.referenceId == cmnt.id))
                  getRelatedComments(cmnt);
              }
            });
          }

          getRelatedComments(comment);

          return (
            <React.Fragment key={comment.id}>
              <Comment
                image={image}
                {...comment}
                CallbackOnDelete={CallbackOnDelete}
              />
              <div className="comment-comments">
                {relatedComments.map((cmnt) => (
                  <Comment
                    image={image}
                    {...cmnt}
                    CallbackOnDelete={CallbackOnDelete}
                    key={cmnt.id}
                  />
                ))}
              </div>
            </React.Fragment>
          );
        })}
    </CommentList>
  );
}

export default Index;
