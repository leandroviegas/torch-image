import { createContext, useState } from "react";

import OpaqueBackground from "@/components/OpaqueBackground";
import ImageDetails from "@/components/gallery/ImageDetails";

import Image from "@/types/Image";

interface ImageDetailsContextProps {
  image?: Image & { Like: () => void };
  setImage: (newImage: Image & { Like: () => void }) => void;
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
            Like={image.Like}
            setShowDetails={setShowDetails}
          />
        </OpaqueBackground>
      )}
      {children}
    </ImageDetailsContext.Provider>
  );
}
