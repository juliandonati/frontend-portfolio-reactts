import GenericForm, {type FormStructure} from "../../components/ui/GenericForm.tsx";
import {useNavigate} from "react-router-dom";
import {useSuccessDialog} from "../../hooks/useSuccessDialog.ts";
import {SuccessDialog} from "../../components/layout/Miscellaneous/SuccessDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import "./RegisterPage.css";


export default function RegisterPage() {
    const {isSuccessOpen, successMessage, showSuccess} = useSuccessDialog();
    const {isErrorOpen, errorMessage, showError, hideError} = useErrorDialog();
    const navigate = useNavigate();
    const registerFormStructure:FormStructure = {
        formId:"login",
        formName:"Formulario de Registro",
        formEntryList:[
            {name:"username",label:"Nombre de usuario",dataType:'string'},
            {name:"displayName",label:"Nombre público",dataType:'string'},
            {name:"unencryptedPassword",label:"Contraseña",dataType:'password'},
            {name:"email",label:"Correo electrónico",dataType:'string'},
            {name:"recoveryEmail",label:"Correo de recuperación",dataType:'string'}
        ],
        submitBtnText:"Registrarse"
    }

    return (
        <div className="mt-12">
            <SuccessDialog isSuccessOpen={isSuccessOpen} successMessage={successMessage} onClose={()=>navigate("/login")}/>
            <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={()=>hideError()}/>
            <GenericForm formStructure={registerFormStructure} formPath={"auth/register"} formMethod={'POST'}
                         postErrorCallback={showError} // todo Validar campos individualmente
                         postFormFunc={()=>showSuccess("¡Usuario registrado con éxito! Proceda a iniciar sesión")}
            />
        </div>
    );
}