import {useRef, useEffect, useCallback} from "react";

export type ResetTimeout = (...parameters : string[]) => void;

export function useDebounce(func : TimerHandler, debounceTime : number) : ResetTimeout {
    const debounceTimeout = useRef<number | undefined>(undefined);



    useEffect(() => {
        // ACÁ VA EL CÓDIGO QUE SE EJECUTA AL MONTARSE

        return () => {
            // ACÁ VA EL CÓDIGO QUE SE EJECUTA AL DESMONTARSE
            if(debounceTimeout.current != undefined)
                clearTimeout(debounceTimeout.current);
        }
    }, []); // COMO NO TIENE DEPENDENCIAS EN EL ARRAY, SOLO CORRE AL MONTARSE.

    // SI NO HAY ARRAY, CORRE EN CADA CAMBIO
    // SI EL ARRAY TIENE DEPENDENCIAS, CORRE POR CADA CAMBIO EN LA DEPENDENCIA

    const resetTimeout = useCallback((...parameters:string[]) => {
        if(debounceTimeout.current != undefined)
            clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(func,debounceTime,...parameters);
    },[func,debounceTime]);

    return resetTimeout;
}

