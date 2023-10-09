
import { useEffect, useRef } from "react";

function useOutsideClick<T>(callback: () => void) {
    const ref = useRef<any>();

    const handleClick = (e: any) => {
        if (!(e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight)) 
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