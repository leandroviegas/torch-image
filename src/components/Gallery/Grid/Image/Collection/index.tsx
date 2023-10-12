import useTheme from "@/hooks/useTheme";
import { CollectionDropdown, ThemeStyles } from "./styles";
import OutClick from "@/components/OutClick";
import CreateForm from "./Form";
import { useState } from "react";

function Index({ outClick }: { outClick: () => void }) {
  const { theme } = useTheme();

  const [tab, setTab] = useState<"new-form" | "list">();

  return (
    <OutClick onOutClick={outClick}>
      <CollectionDropdown theme={ThemeStyles[theme]}>
        <div>
          {tab == "new-form" ? (
            <CreateForm BackToCollections={() => setTab("list")} />
          ) : (
            <>
              <button type="button" onClick={() => setTab("new-form")} className="new-collection">
                New Collection
              </button>
              <div className="separators">
                <hr />
                <span>Your Collections</span>
              </div>
              <div>
                <div className="new-collection">Collection</div>
              </div>
            </>
          )}
        </div>
      </CollectionDropdown>
    </OutClick>
  );
}

export default Index;
