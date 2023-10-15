import useTheme from "@/hooks/useTheme";
import CollectionForm, { ThemeStyles } from "./styles";

import { BiArrowBack } from "react-icons/bi";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useEffect, useState } from "react";
import api from "@/services/api";
import linkfy from "@/utils/linkfy";
import useUserGalley from "@/hooks/useUserGalley";

interface CreateCollectionFormProps {
  BackToCollections: () => void;
}

function Index({ BackToCollections }: CreateCollectionFormProps) {
  const { theme } = useTheme();

  const [link, setLink] = useState("");

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {
    setLink(linkfy(name));
  },[name])

  function HandleCreateCollection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    api.post("/collection", { name, description, link }).then((resp) => {
      BackToCollections();
    });
  }

  return (
    <CollectionForm
      theme={ThemeStyles[theme]}
      onSubmit={HandleCreateCollection}
    >
      <div className="header">
        <button type="button" className="back" onClick={BackToCollections}>
          <BiArrowBack /> Back
        </button>
        <h1 className="title">New Collection</h1>
      </div>
      <hr />
      <div className="content">
        <FloatingLabelInput
          type="text"
          value={name}
          onChange={(evt) => setName(evt.currentTarget.value)}
          label="Collection Name"
          name="name"
        />
        <FloatingLabelInput
          type="text"
          value={link}
          onChange={(evt) => setLink(evt.currentTarget.value)}
          label="Collection Link"
          name="link"
        />
        <FloatingLabelInput
          type="textarea"
          value={description}
          onChange={(evt) => setDescription(evt.currentTarget.value)}
          label="Collection Description"
          name="description"
        />
      </div>
      <button className="new-collection" type="submit">
        Create Collection
      </button>
    </CollectionForm>
  );
}

export default Index;
