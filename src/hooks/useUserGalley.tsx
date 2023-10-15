import { useContext } from "react";

import { UserGalleyContext } from "@/contexts/UserGalleyContext";

export default function useUserGalley(){
    return useContext(UserGalleyContext);
}