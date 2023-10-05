import useOutsideClick from "@/hooks/useOutsideClick";

import { ImageDetails, ThemeStyles } from "./styles";
import Comment from "./Comment";

import Image from "@/types/Image";
import useTheme from "@/hooks/useTheme";
import GridGallery from "@/components/gallery/Grid";
import { useState } from "react";
import api from "@/services/api";

interface ImageDetailsProps {
  setShowDetails: (value: boolean) => void;
  ImagePreDetails: Image;
  Like: () => void;
}

function Index({ ImagePreDetails, setShowDetails, Like }: ImageDetailsProps) {
  const { theme } = useTheme();

  const [ImageDetailsRef] = useOutsideClick(() => {
    setShowDetails(false);
  });

  const [images, setImages] = useState<Image[]>([]);

  function Search({ query }: { query: string }) {
    api.get('/images/search', { params: { query } }).then(resp => {
      setImages(resp.data.images)
    })
  }

  console.log(ImagePreDetails)

  // useEffect(() => {
  //   Search({ query: ImagePreDetails. });
  // }, [ImagePreDetails])

  return (
    <ImageDetails theme={ThemeStyles[theme]} ref={ImageDetailsRef}>
      <div className="imageInfo">
        <div className="image">
          <div className="image-section">
            <img src={ImagePreDetails.imageLink} alt="" />
          </div>
          <div className="comment-section">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
      <GridGallery images={images} />
    </ImageDetails>
  );
}

export default Index;
