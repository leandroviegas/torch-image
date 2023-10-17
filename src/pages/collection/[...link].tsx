import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import api from "@/services/api";
import styled from "styled-components";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import Image, { Collection } from "@/types/Gallery";
import Container from "@/components/Container";
import { HiUser } from "react-icons/hi";
import useTheme from "@/hooks/useTheme";
import GridGallery from "@/components/Gallery/Grid";
import useUserGalley from "@/hooks/useUserGalley";

import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import CollectionForm from "@/components/Gallery/Grid/Image/Collection/Form/styles";

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});

const ThemeStyles = {
  light: {
    color: "#353535",
    backgroundColor: "#fafafa",
    userProfile: {
      backgroundColor: "#fafafa",
      color: "#0e0e0e",
    },
  },
  dark: {
    color: "#f1f1f1",
    backgroundColor: "#161616",
    userProfile: {
      backgroundColor: "#161616",
      color: "#f1f1f1",
    },
  },
};

const CollectionHeader = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .collection-details {
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    gap: 7px;
    position: relative;
    padding: 25px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);

    .action-buttons {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
      display: flex;
      gap: 10px;

      button {
        cursor: pointer;
        background-color: ${({ theme }) => theme.color};
        color: ${({ theme }) => theme.backgroundColor};
        font-weight: 600;
        font-size: 20px;
        padding: 5px;
        padding-bottom: 0;
        border-radius: 50%;
      }
    }

    h1.collection-name {
      color: ${({ theme }) => theme.color};
      font-weight: 700;
      font-size: 25px;
      text-align: center;
      padding-bottom: 10px;
    }

    p {
      max-width: 400px;
      width: 100%;
      font-size: 15px;
      text-align: center;
      color: ${({ theme }) => theme.color};
      margin: 0 auto;
    }
  }

  .collection-details-form {
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    gap: 7px;
    padding: 25px;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);

    input.collection-name {
      color: ${({ theme }) => theme.color};
      background-color: transparent;
      font-weight: 700;
      font-size: 25px;
      margin: 0 auto;
      width: 100%;
      max-width: 400px;
      text-align: center;
      padding-bottom: 10px;
      border: 1px solid ${({ theme }) => theme.color}66;
      border-radius: 5px;
    }

    textarea.collection-description {
      max-width: 400px;
      background-color: transparent;
      width: 100%;
      font-size: 15px;
      text-align: center;
      color: ${({ theme }) => theme.color};
      border: 1px solid ${({ theme }) => theme.color}66;
      border-radius: 5px;
    }

    .action-buttons {
      display: flex;
      justify-items: center;
      gap: 10px;
      padding-top: 10px;

      button {
        cursor: pointer;
        color: white;
        font-size: 15px;
        font-weight: 600;
        padding: 7px 15px;
        border-radius: 5px;
      }

      button.save-button {
        background-color: #00b309c9;

        &:hover {
          background-color: #00b309;
        }
      }
      button.cancel-button {
        background-color: #ac1a00c3;

        &:hover {
          background-color: #ac1a00;
        }
      }
    }
  }

  button.user-profile {
    margin: 10px auto;
    color: ${({ theme }) => theme.userProfile.color};
    background-color: ${({ theme }) => theme.userProfile.backgroundColor};
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;

    .user-profile-picture {
      img,
      svg {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      svg {
        color: #3e3e3e;
        background-color: #e0e0e0;
        padding-bottom: 4px;
      }
    }
  }
`;

function Collection() {
  const { theme } = useTheme();

  const { data: session } = useSession();

  const [collection, setCollection] = useState<
    Omit<Collection, "images"> & { images: Image[] }
  >();

  const { userCollections } = useUserGalley();

  const router = useRouter();

  const { link } = router.query;

  const [edit, setEdit] = useState<boolean>(false);

  const [collectionForm, setCollectionForm] = useState<
    Omit<Collection, "images">
  >({
    description: "",
    link: "",
    name: "",
    owner: {
      link: "",
      profilePicture: "",
      username: "",
    },
  });

  const [status, setStatus] = useState<
    "load" | "loading" | "success" | "error"
  >("load");

  const gridRef = useRef<any>();

  useEffect(() => {
    gridRef.current?.ClearImages(collection?.images);
    gridRef.current?.AddImages(collection?.images);
  }, [collection]);

  function LoadCollection() {
    if (link && status != "loading") {
      setStatus("loading");

      gridRef.current?.ClearImages();

      api
        .get("/collection", { params: { link: (link as string[])[0] || "" } })
        .then((res) => {
          setCollection(res.data.collection);
          setCollectionForm({
            ...res.data.collection,
          });
          setStatus("success");
        });
    }
  }

  function HandleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    api
      .put("/collection", {
        description: collectionForm?.description,
        link: collectionForm?.link,
        name: collectionForm?.name,
      })
      .then((res) => {
        setEdit(false);
        LoadCollection();
      });
  }

  function HandleDelete() {
    api
      .delete("/collection", {
        params: {
          link: collection?.link,
        },
      })
      .then((res) => {
        router.push("/");
      });
  }

  useEffect(() => {
    let ucFiltered = userCollections.find(
      (collection) => collection.link == (link as string[])[0]
    );

    const ordered_collection = collection?.images
      .sort((a, b) =>
        `${a.sourceId}-${a.provider.name}` < `${b.sourceId}-${b.provider.name}`
          ? -1
          : 1
      )
      .map((image) => `${image.sourceId}-${image.provider.name}`)
      .join(", ");

    const ordered_ucFiltered = ucFiltered?.images
      .sort((a, b) => (a.identification < b.identification ? -1 : 1))
      .map((image) => image.identification)
      .join(", ");

    if (ucFiltered && collection) {
      if (ordered_collection != ordered_ucFiltered) {
        LoadCollection();
      }
    }
  }, [userCollections, collection]);

  useEffect(() => {
    LoadCollection();
  }, [link]);

  return (
    <>
      <Head>
        <title>All the images you already love in one place</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Navbar />
      <Container>
        {collection && (
          <>
            <CollectionHeader theme={ThemeStyles[theme]}>
              {edit ? (
                <form onSubmit={HandleEdit} className="collection-details-form">
                  <input
                    className="collection-name"
                    placeholder="Name"
                    onChange={(e) =>
                      setCollectionForm({
                        ...collectionForm,
                        name: e.target.value,
                      })
                    }
                    defaultValue={collectionForm?.name}
                  />
                  <textarea
                    placeholder="Description"
                    className={`collection-description ${inter.className}`}
                    onChange={(e) =>
                      setCollectionForm({
                        ...collectionForm,
                        description: e.target.value,
                      })
                    }
                    defaultValue={collectionForm?.description}
                  />
                  <div className="action-buttons">
                    <button className="save-button" type="submit">
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      type="button"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="collection-details">
                  {session?.user.link == collection.owner.link && (
                    <div className="action-buttons">
                      <button onClick={() => setEdit(true)}>
                        <HiOutlinePencilAlt />
                      </button>
                      <button onClick={() => HandleDelete()}>
                        <HiTrash />
                      </button>
                    </div>
                  )}
                  <h1 className="collection-name">{collectionForm?.name}</h1>
                  {collectionForm?.description && (
                    <p>{collectionForm?.description}</p>
                  )}
                </div>
              )}
              <button className="user-profile">
                <span className="user-profile-picture">
                  {collection.owner?.profilePicture ? (
                    <img
                      src={collection.owner.profilePicture}
                      alt={`${collection.owner.username} profile picture`}
                    />
                  ) : (
                    <HiUser />
                  )}
                </span>
                <span>{collection.owner.username}</span>
              </button>
            </CollectionHeader>
            <GridGallery ref={gridRef} LoadMore={() => {}} />
          </>
        )}
      </Container>
    </>
  );
}

export default Collection;
