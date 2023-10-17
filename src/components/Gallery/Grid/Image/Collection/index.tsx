import { useEffect, useState } from "react";
import { CollectionDropdown, ThemeStyles } from "./styles";

import useTheme from "@/hooks/useTheme";

import CreateForm from "./Form";
import api from "@/services/api";
import { useSession } from "next-auth/react";
import { Collection } from "@/types/Gallery";
import useUserGalley from "@/hooks/useUserGalley";
import Link from "next/link";

function Index({ image }: { image: { sourceId: string; provider: string } }) {
  const { theme } = useTheme();

  const { data: session } = useSession();

  const { LoadUserCollections: LoadUserCollectionsUserGallery } =
    useUserGalley();

  const [userCollections, setUserCollections] = useState<Collection[]>([]);

  const [tab, setTab] = useState<"new-form" | "list" | "">("list");

  function LoadUserCollections() {
    api
      .get("/collections", { params: { ownerId: session?.user?.id } })
      .then((resp) => {
        setUserCollections(
          resp.data.collections.sort((a: Collection, b: Collection) =>
            `${a.name}` < `${b.name}` ? -1 : 1
          )
        );
      });
  }

  useEffect(() => {
    if (tab == "list") LoadUserCollections();
  }, [tab]);

  useEffect(() => {
    return () => {
      LoadUserCollectionsUserGallery();
    };
  }, []);

  function HandleImageCollection({
    action,
    collectionId,
  }: {
    action: "add" | "remove";
    collectionId: string;
  }) {
    api
      .put(`/collection/${action}-image`, {
        collectionId,
        image_provider: image.provider,
        identification: image.sourceId,
      })
      .then((resp) => {
        LoadUserCollections();
      });
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
