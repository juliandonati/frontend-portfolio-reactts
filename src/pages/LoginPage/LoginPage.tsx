import GenericForm, {type FormStructure} from '../../components/ui/GenericForm.tsx'
import {type Token} from '../../App.tsx'
import {useCookies} from "react-cookie";

import {type JSX} from "react";
import LandingSite from "../LandingSite/LandingSite.tsx";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";

import './LoginPage.css'

export default function LoginPage(): JSX.Element {
    const [cookies, setCookie] = useCookies(["accessToken"]);
    const {isErrorOpen, errorMessage, showError, hideError} = useErrorDialog();


    if(cookies.accessToken == undefined) {
        const setAccessToken = (token: Token) => {
            setCookie("accessToken", token.accessToken);
        }

        const login = (token: Token):void => {
            if(token.accessToken)
                setAccessToken(token);
            else
                showError("Usuario o contraseña incorrectos");
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
            <div id="login-page">
                <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={hideError}/>
                <GenericForm<Token> formStructure={loginFormStructure} formPath={'auth/login'} formMethod={'POST'} postFormFunc={login}/>
            </div>
        );
    }
    else
        return(
            <LandingSite/>
        )
}