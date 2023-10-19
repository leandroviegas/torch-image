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
import { ToastContainer, toast } from "react-toastify";
import usePromise from "@/hooks/usePromise";
import useTheme from "@/hooks/useTheme";

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

  const { theme } = useTheme();

  const [showCollectionWindow, setShowCollectionWindow] =
    useState<boolean>(false);

  const [userCollections, setUserCollections] = useState<Collection[]>([]);

  const [promises, execPromise] = usePromise({
    "user-collections-load": {
      status: "idle",
    },
  });

  async function LoadUserCollections() {
    const result = await execPromise(
      api.get("/collections", { params: { ownerId: session?.user?.id } }),
      "user-collections-load"
    );

    if (result.status === "success")
      setUserCollections(result.response?.data?.collections);

    if (result.status === "error") {
      toast(`Error loading collections:\n ${result.error}`, {
        type: "error",
      });
    }
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
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme={theme === "dark" ? "dark" : "light"}
      />

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
