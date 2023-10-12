import { Dispatch, SetStateAction, createContext, useState } from "react";

import OpaqueBackground from "@/components/OpaqueBackground";
import ImageDetails from "@/components/Gallery/Grid/Image/Details";

import Image from "@/types/Image";

type ImageWithLike = Image & { Like: () => void };

interface ImageDetailsContextProps {
  image?: ImageWithLike;
  setImage: Dispatch<SetStateAction<ImageWithLike | undefined>>;
  showDetails: boolean;
  setShowDetails: (newShowDetails: boolean) => void;
}

export const ImageDetailsContext = createContext(
  {} as ImageDetailsContextProps
);

export function ImageDetailsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [image, setImage] = useState<Image & { Like: () => void }>();

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <ImageDetailsContext.Provider
      value={{ image, setImage, showDetails, setShowDetails }}
    >
      {showDetails && (
        <OpaqueBackground>
          {image && (
            <ImageDetails
              ImagePreDetails={image}
              setShowDetails={(showDetails) => {
                setShowDetails(showDetails);
                document.body.style.overflowY = "auto";
              }}
            />
          )}
        </OpaqueBackground>
      )}
      {children}
    </ImageDetailsContext.Provider>
  );
}
