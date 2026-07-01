import type {JSX} from "react";

export interface ErrorDialogProps{
    isOpen:boolean,
    errorMessage:string,
    onClose: ()=>void
}

export default function ErrorDialog({isOpen, errorMessage, onClose}:ErrorDialogProps): JSX.Element | null{

    return isOpen ? (
        <div className="dialog">
            <div className="bg-red-950">
                <strong>VENTANA DE ERROR</strong>
                <p>ERROR: {errorMessage}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    ) : null;
}