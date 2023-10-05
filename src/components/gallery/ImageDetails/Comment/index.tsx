import { MdOutlineInsertComment } from "react-icons/md";
import { Comment, ThemeStyles } from "./styles";
import useTheme from "@/hooks/useTheme";

function Index() {
  const { theme } = useTheme();

  return (
    <Comment theme={ThemeStyles[theme]}>
      <div className="header">
        <span className="avatar">
          <img
            src={
              "https://pixabay.com/get/g6bef69c35e5c469375529ceb82f9d6be0f7d47f6aefe2a8abdf800eded4399f3112e39c92bca3e39165bbfe6128bc04e22dbbdce64c05677c7a2226c51c446a9_1280.jpg"
            }
            alt=""
          />
        </span>
        <div>
          <span className="username">Leandro Viegas</span>
          <span className="date">7 de setembro</span>
        </div>
      </div>
      <div className="content">
        <p>Teste</p>
      </div>
      <div className="actions">
        <button>
          <MdOutlineInsertComment /> Responder
        </button>
      </div>
    </Comment>
  );
}

export default Index;
