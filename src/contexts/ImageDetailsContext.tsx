import { Dispatch, SetStateAction, createContext, useState } from "react";

import OpaqueBackground from "@/components/OpaqueBackground";
import ImageDetails from "@/components/gallery/ImageDetails";

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
      {image && (
        <OpaqueBackground opened={showDetails}>
          <ImageDetails
            ImagePreDetails={image}
            setShowDetails={setShowDetails}
          />
        </OpaqueBackground>
      )}
      {children}
    </ImageDetailsContext.Provider>
  );
}
