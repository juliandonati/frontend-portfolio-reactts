import GenericForm, {type FormStructure} from '../../components/ui/GenericForm.tsx'
import {type Token} from '../../App.tsx'
import {useCookies} from "react-cookie";

import {type JSX} from "react";
import LandingSite from "../LandingSite/LandingSite.tsx";


export default function LoginPage(): JSX.Element {
    const [cookies, setCookie] = useCookies(["accessToken"]);


    if(cookies.accessToken == undefined) {
        const setAccessToken = (token: Token) => {
            setCookie("accessToken", token.accessToken);
        }

        const loginFormStructure: FormStructure = {
            formEntryList: [
                {name: 'usernameOrEmail', label: 'Nombre de usuario', dataType: 'string'},
                {name: 'unencryptedPassword', label: 'Contraseña', dataType: 'password'}],
            formId: 'login-form',
            formName: 'Formulario de Inicio de Sesión',
            submitBtnText: 'Iniciar sesión'
        }

        return (
            <>
                <GenericForm formStructure={loginFormStructure} formMethod={'POST'} postFormFunc={setAccessToken}/>
            </>
        );
    }
    else
        return(
            <LandingSite/>
        )
}