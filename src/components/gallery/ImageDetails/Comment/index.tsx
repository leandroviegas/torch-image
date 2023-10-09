import { MdOutlineInsertComment } from "react-icons/md";
import { Comment, ThemeStyles } from "./styles";
import useTheme from "@/hooks/useTheme";
import { Comment as CommentType } from "@/types/Image";
import moment from "moment";

function Index({ content, createdAt, updatedAt, user, id }: CommentType) {
  const { theme } = useTheme();

  return (
    <Comment theme={ThemeStyles[theme]}>
      <div className="header">
        <span className="avatar">
          <img
            src={
              user.profilePicture
            }
            alt={`${user.username} profile picture`}
          />
        </span>
        <div>
          <span className="username">{user.username ?? "..."}</span>
          <span className="date">{moment(createdAt).format('LL')}</span>
        </div>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="actions">
        <button>
          <MdOutlineInsertComment /> Answer
        </button>
      </div>
    </Comment>
  );
}

export default Index;
