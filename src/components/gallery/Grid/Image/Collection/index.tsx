import useTheme from "@/hooks/useTheme";
import { CollectionDropdown, ThemeStyles } from "./styles";
import OutClick from "@/components/OutClick";

function Index({outClick}: {outClick: () => void}) {
  const { theme } = useTheme();

  return (
    <OutClick callback={outClick}>
      <CollectionDropdown theme={ThemeStyles[theme]}>
        <div>
          <button type="button" className="new-collection">New Collection</button>
        </div>
      </CollectionDropdown>
    </OutClick>
  ); 
}

export default Index;
