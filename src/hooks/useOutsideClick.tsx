
import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
    const ref = useRef<any>();

    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("clickmousedown", handleClick);
        };
    });

    return [ref]
};

export default useOutsideClick;