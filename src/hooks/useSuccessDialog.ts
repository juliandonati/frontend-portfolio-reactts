import {useState} from "react";

export function useSuccessDialog(){
    const [isSuccessOpen,setIsSuccessOpen] = useState(false);
    const [successMessage,setSuccessMessage] = useState('');

    const showSuccess = (message:string) => {
        setSuccessMessage(message);
        setIsSuccessOpen(true);
    }

    const hideSuccess = () => {
        setIsSuccessOpen(false);
        setSuccessMessage('');
    }

    return{
        isSuccessOpen,
        successMessage,
        showSuccess,
        hideSuccess
    };
}