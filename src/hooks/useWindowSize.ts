import {useCallback, useEffect, useState} from "react";
import {useDebounce} from "./useDebounce.ts";

export function useWindowSize(){
    const [windowSize, setWindowSize] = useState<{
        width?:number,
        height?:number
    }>({
        width: undefined,
        height: undefined
    });

    const handleResize = useCallback(()=> {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })},[]);


    const debouncedResize = useDebounce(handleResize,200);


    useEffect(() => {
        window.addEventListener('resize',() => debouncedResize());

        debouncedResize(); // Obtenemos el tamaño inicial

        return () => window.removeEventListener('resize',() => debouncedResize());
    }, [debouncedResize]);

    return windowSize;
}