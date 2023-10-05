import { useContext } from "react";

import { ImageDetailsContext } from "@/contexts/ImageDetailsContext";

export default function useImageDetails(){
    return useContext(ImageDetailsContext);
}