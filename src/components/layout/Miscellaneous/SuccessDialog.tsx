import {type JSX} from "react";

interface SuccessDialogProps {
    isSuccessOpen: boolean;
    successMessage: string;
    onClose: () => void;
}

export function SuccessDialog(
    {isSuccessOpen, successMessage, onClose}: SuccessDialogProps): JSX.Element {

    return (
        <div className={isSuccessOpen ? 'dialog bg-[rgba(34,139,34,.8)]' : 'hidden'}>
            <div className='bg-green-800'>
                <strong>VENTANA DE ÉXITO</strong>
                <p>{successMessage}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}