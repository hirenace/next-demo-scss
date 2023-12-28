//Here is the sample custom hook example outside click close modal 

import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: any) => {
    const handleClick = (e: { target: any; }) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref, callback]);
};

export default useOutsideClick