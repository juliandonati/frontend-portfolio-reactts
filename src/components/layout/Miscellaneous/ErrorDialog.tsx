import type {JSX} from "react";
import './ErrorDialog.css'

export interface ErrorDialogProps{
    isOpen:boolean,
    errorMessage:string,
    onClose: ()=>void
}

export default function ErrorDialog({isOpen, errorMessage, onClose}:ErrorDialogProps): JSX.Element | null{

    return isOpen ? (
        <div className="error-dialog">
            <strong>VENTANA DE ERROR</strong>
            <p>ERROR: {errorMessage}</p>
            <button onClick={onClose}>OK</button>
        </div>
    ) : null;
}