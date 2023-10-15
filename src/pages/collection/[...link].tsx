import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import api from "@/services/api";
import styled from "styled-components";
import Image, { Collection } from "@/types/Gallery";
import Container from "@/components/Container";
import { HiUser } from "react-icons/hi";
import useTheme from "@/hooks/useTheme";
import GridGallery from "@/components/Gallery/Grid";

const ThemeStyles = {
  light: {
    color: "#353535",
    userProfile: {
      backgroundColor: "#f8f8f8",
      color: "#0e0e0e",
    },
  },
  dark: {
    color: "#f1f1f1",
    userProfile: {
      backgroundColor: "#161616",
      color: "#f1f1f1",
    },
  },
};

const CollectionHeader = styled.div`
  padding: 30px 0;

  h1.collection-name {
    color: ${({ theme }) => theme.color};
    font-size: 25px;
    text-align: center;
    padding-bottom: 10px;
  }

  p {
    max-width: 400px;
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.color};
    margin: 0 auto;
  }

  button.user-profile {
    margin: 10px auto;
    color: ${({ theme }) => theme.userProfile.color};
    background-color: ${({ theme }) => theme.userProfile.backgroundColor};
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
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
  const router = useRouter();

  const { theme } = useTheme();

  const [collection, setCollection] = useState<
    Collection & { images: Image[] }
  >();

  const { link } = router.query;

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  function GetData() {
    if (link) {
      api
        .get("/collection", { params: { link: (link as string[])[0] || "" } })
        .then((res) => {
          setCollection(res.data.collection);
          setStatus("success");
        });
    }
  }

  useEffect(() => {
    GetData();
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
              <h1 className="collection-name">{collection?.name}</h1>
              {collection?.description && <p>{collection?.description}</p>}
              <div>
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
              </div>
            </CollectionHeader>
            <GridGallery images={collection.images} LoadMore={() => {}} />
          </>
        )}
      </Container>
    </>
  );
}

export default Collection;
