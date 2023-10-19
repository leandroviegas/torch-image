import useTheme from "@/hooks/useTheme";
import CollectionForm, { ThemeStyles } from "./styles";

import { BiArrowBack } from "react-icons/bi";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useEffect, useState } from "react";
import api from "@/services/api";
import linkfy from "@/utils/linkfy";
import { toast } from "react-toastify";
import usePromise from "@/hooks/usePromise";

interface CreateCollectionFormProps {
  BackToCollections: () => void;
}

function Index({ BackToCollections }: CreateCollectionFormProps) {
  const { theme } = useTheme();

  const [link, setLink] = useState("");

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [promises, execPromise] = usePromise({
    "collections-create": {
      status: "idle",
    },
  });

  useEffect(() => {
    setLink(linkfy(name));
  }, [name]);

  const [formMessages, setFormMessages] = useState<{
    [key: string]: { message: string; type: "error" | "warning" | "info" }[];
  }>({ link: [], name: [], description: [] });

  const [formStatus, setFormStatus] = useState<"info" | "error">("info");

  useEffect(() => {
    let messages: {
      [key: string]: { message: string; type: "error" | "warning" | "info" }[];
    } = { link: [], name: [], description: [] };

    if (link.trim() === "")
      messages.link = [
        ...(messages?.link || []),
        { message: "Link required", type: "info" },
      ];
    else if (link.trim().length < 3)
      messages.link = [
        ...(messages?.link || []),
        { message: "Link is too short", type: "error" },
      ];

    if (name.trim() === "")
      messages.name = [
        ...(messages?.name || []),
        { message: "Name required", type: "info" },
      ];
    else if (name.trim().length < 3)
      messages.name = [
        ...(messages?.name || []),
        { message: "Name is too short", type: "error" },
      ];

    setFormMessages(messages);
  }, [link, name, description]);

  async function HandleCreateCollection(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      ["name", "description", "link"].some(
        (key) => formMessages[key].length > 0
      )
    ) {
      setFormStatus("error");
      return;
    }

    if (promises["collections-create"].status == "loading") return;

    const toastId = toast(`Creating collection`, {
      isLoading: true,
    });

    const result = await execPromise(
      api.post("/collection", { name, description, link }),
      "collections-create"
    );

    if (result.status === "success") {
      BackToCollections();
    }

    const toastContent = {
      message:
        result.status === "success"
          ? `Collection ${name} created`
          : `Error creating collection:\n ${result.error}`,
      type: result.status as "success" | "error",
    };

    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        render: toastContent.message,
        type: toastContent.type,
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast(toastContent.message, {
        type: toastContent.type,
        autoClose: 2000,
      });
    }
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
          messages={formMessages.name.map((m) => m.message)}
          status={
            formStatus === "error" && formMessages.name.length > 0
              ? "error"
              : "info"
          }
        />
        <FloatingLabelInput
          type="text"
          value={link}
          onChange={(evt) => setLink(evt.currentTarget.value)}
          label="Collection Link"
          name="link"
          messages={formMessages.link.map((m) => m.message)}
          status={
            formStatus === "error" && formMessages.link.length > 0
              ? "error"
              : "info"
          }
        />
        <FloatingLabelInput
          type="textarea"
          value={description}
          onChange={(evt) => setDescription(evt.currentTarget.value)}
          label="Collection Description"
          name="description"
          messages={formMessages.description.map((m) => m.message)}
          status={
            formStatus === "error" && formMessages.description.length > 0
              ? "error"
              : "info"
          }
        />
      </div>
      <button className="new-collection" type="submit">
        Create Collection
      </button>
    </CollectionForm>
  );
}

export default Index;
