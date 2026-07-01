import {useCallback, useState} from "react";

export function useErrorDialog(){
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error desconocido');

    const showError = useCallback((message:string) =>{
        setIsErrorOpen(true);
        setErrorMessage(message);
    },[]);

    const hideError = () => {
        setIsErrorOpen(false);
        setErrorMessage('Error desconocido');
    }

    return{
        isErrorOpen,
        errorMessage,
        showError,
        hideError
    }
}