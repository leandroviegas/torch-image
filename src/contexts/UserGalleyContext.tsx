import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import OpaqueBackground from "@/components/OpaqueBackground";
import ImageDetails from "@/components/Gallery/Grid/Image/Details";

import Image, { Collection } from "@/types/Gallery";
import api from "@/services/api";
import { useSession } from "next-auth/react";
import CollectionWindow from "@/components/Gallery/Grid/Image/Collection";

type ImageWithLike = Image & { Like: () => void };

interface UserGalleyContextProps {
  imageDetails?: ImageWithLike;
  setImageDetails: Dispatch<SetStateAction<ImageWithLike | undefined>>;
  setImageCollectionTab: Dispatch<SetStateAction<Image | undefined>>;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
  setShowCollectionWindow: (value: boolean) => void;
  LoadUserCollections: () => void;
  userCollections: Collection[];
}

export const UserGalleyContext = createContext({} as UserGalleyContextProps);

export function UserGalleyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Image to show details
  const [imageDetails, setImageDetails] = useState<
    Image & { Like: () => void }
  >();

  const [showDetails, setShowDetails] = useState<boolean>(false);

  // User Collections

  const [imageCollectionTab, setImageCollectionTab] = useState<Image>();

  const { data: session } = useSession();

  const [showCollectionWindow, setShowCollectionWindow] =
    useState<boolean>(false);

  const [userCollections, setUserCollections] = useState<Collection[]>([]);

  function LoadUserCollections() {
    api
      .get("/collections", { params: { ownerId: session?.user?.id } })
      .then((resp) => {
        setUserCollections(resp.data.collections);
      });
  }

  useEffect(() => {
    if (showDetails == false && session?.user) LoadUserCollections();
  }, [showDetails, session]);


  return (
    <UserGalleyContext.Provider
      value={{
        imageDetails,
        setImageDetails,
        showDetails,
        setShowDetails,
        LoadUserCollections,
        userCollections,
        setShowCollectionWindow,
        setImageCollectionTab,
      }}
    >
      {showDetails && (
        <OpaqueBackground BackgroundClick={() => setShowDetails(false)}>
          {imageDetails && <ImageDetails ImagePreDetails={imageDetails} />}
        </OpaqueBackground>
      )}

      {showCollectionWindow && (
        <OpaqueBackground
          BackgroundClick={() => setShowCollectionWindow(false)}
        >
          <CollectionWindow
            image={{
              sourceId: imageCollectionTab?.sourceId || "",
              provider: imageCollectionTab?.provider.name || "",
            }}
          />
        </OpaqueBackground>
      )}
      {children}
    </UserGalleyContext.Provider>
  );
}
