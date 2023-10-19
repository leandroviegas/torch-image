import { useEffect, useState } from "react";
import { CollectionDropdown, ThemeStyles } from "./styles";

import useTheme from "@/hooks/useTheme";

import CreateForm from "./Form";
import api from "@/services/api";
import { useSession } from "next-auth/react";
import { Collection } from "@/types/Gallery";
import useUserGalley from "@/hooks/useUserGalley";
import Link from "next/link";
import { toast } from "react-toastify";
import usePromise from "@/hooks/usePromise";

function Index({ image }: { image: { sourceId: string; provider: string } }) {
  const { theme } = useTheme();

  const { data: session } = useSession();

  const { LoadUserCollections: LoadUserCollectionsUserGallery } =
    useUserGalley();

  const [userCollections, setUserCollections] = useState<Collection[]>([]);

  const [tab, setTab] = useState<"new-form" | "list" | "">("list");

  const [promises, execPromise] = usePromise({
    "user-collections-load": {
      status: "idle",
    },
    "collection-edit": {
      status: "idle",
    },
  });

  async function LoadUserCollections() {
    const result = await execPromise(
      api.get("/collections", { params: { ownerId: session?.user?.id } }),
      "user-collections-load"
    );

    if (result.status === "success") {
      setUserCollections(
        result.response?.data?.collections?.sort(
          (a: Collection, b: Collection) => (`${a.name}` < `${b.name}` ? -1 : 1)
        )
      );
    }

    if (result.status === "error") {
      toast(`Error loading collections:\n ${result.error}`, {
        type: "error",
      });
    }
  }

  useEffect(() => {
    if (tab == "list") LoadUserCollections();
  }, [tab]);

  useEffect(() => {
    return () => {
      LoadUserCollectionsUserGallery();
    };
  }, []);

  async function HandleImageCollection({
    action,
    collectionId,
  }: {
    action: "add" | "remove";
    collectionId: string;
  }) {
    const result = await execPromise(
      api.put(`/collection/${action}-image`, {
        collectionId,
        image_provider: image.provider,
        identification: image.sourceId,
      }),
      "collection-edit"
    );

    if (result.status === "success") {
      LoadUserCollections();
    }

    if (result.status === "error") {
      toast(`Error editing collection:\n ${result.error}`, {
        type: "error",
      });
    }
  }

  return (
    <CollectionDropdown theme={ThemeStyles[theme]}>
      <div>
        {tab == "new-form" ? (
          <CreateForm BackToCollections={() => setTab("list")} />
        ) : (
          <>
            <button
              type="button"
              onClick={() => setTab("new-form")}
              className="new-collection"
            >
              New Collection
            </button>
            <div className="separators">
              <hr />
              <span>Your Collections</span>
            </div>
            <div className="collections styled-scroll">
              {userCollections?.map((collection) => {
                const imageSelected = collection?.images?.some(
                  (img) =>
                    img?.identification ==
                    `${image?.sourceId}-${image?.provider}`
                );

                return (
                  <div
                    key={`${collection.id}-${collection.name}`}
                    className="collection"
                  >
                    <div className="name">
                      <Link href={`/collection/${collection.link}`}>
                        <h2>{collection.name}</h2>
                      </Link>
                    </div>
                    <button
                      onClick={() =>
                        HandleImageCollection({
                          action: "add",
                          collectionId: collection.id || "",
                        })
                      }
                      className={`add ${
                        imageSelected == true ? "selected" : ""
                      }`}
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        HandleImageCollection({
                          action: "remove",
                          collectionId: collection.id || "",
                        })
                      }
                      className={`remove ${!imageSelected ? "selected" : ""}`}
                    >
                      -
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </CollectionDropdown>
  );
}

export default Index;
