import type {JSX} from "react";
import './ControlPanel.css';
import {useNavigate} from "react-router-dom";
import {decodeToken} from "react-jwt";
import {useCookies} from "react-cookie";

interface CustomJwtPayload{
    sub:string,
    iat:number,
    exp:number
}

export default function ControlPanel():JSX.Element | null{
    const navigate = useNavigate();

    const [cookies] = useCookies(["accessToken"]);

    if(cookies.accessToken != null) {
        const username: string = decodeToken<CustomJwtPayload>(cookies.accessToken)!.sub;


        return (
            <>
                <h3>OPCIONES DE USUARIO</h3>
                <ul className="user-controlpanel-options">
                    <li onClick={() => navigate(`/u/${username}/view`)}>VER PORTAFOLIO</li>
                    <li onClick={() => navigate(`/u/${username}/edit`)}>EDITAR PORTAFOLIO</li>
                </ul>

                <h3>OPCIONES DE ADMIN</h3>
                <ul className="admin-controlpanel-options">

                </ul>
            </>
        )
    }
    else
        return null; // No tengo un GlobalExceptionHandler
}