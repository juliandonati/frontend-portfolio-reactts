import {type JSX, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {decodeToken} from "react-jwt";
import {useCookies} from "react-cookie";
import {createPortfolioByName, existsPortfolioByName} from "../../services/portfolioService.ts";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {LoadingCover} from "../../components/layout/Miscellaneous/LoadingCover.tsx";

interface CustomJwtPayload {
    sub: string,
    iat: number,
    exp: number
}

export default function ControlPanel(): JSX.Element | null {
    const navigate = useNavigate();
    const [cookies] = useCookies(["accessToken"]);
    const username: string | undefined = cookies.accessToken ? decodeToken<CustomJwtPayload>(cookies.accessToken)!.sub : undefined;
    const [hasPortfolio, setHasPortfolio] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {isErrorOpen, errorMessage, showError, hideError} = useErrorDialog();

    useEffect(() => {
        if (username)
            existsPortfolioByName(username)
                .then(existsPortfolio => {
                    setHasPortfolio(existsPortfolio);
                    setIsLoading(false);
                })
                .catch((error: Error) => {
                    setIsLoading(false);
                    showError(error.message);
                });
        else
            showError("Tienes que iniciar sesión para acceder a tu panel de control.")
    }, [username, showError]);

    if (username != null) {
        return (
            <>
                <LoadingCover loading={isLoading}/>
                <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={hideError}/>
                {
                    !isLoading &&
                    <div className="grid grid-rows-[1fr_3fr_1fr_3fr] gap-4 w-5/6 md:w-auto text-center">
                        <h3 className="text-6xl underline decoration-pink-500">OPCIONES DE USUARIO</h3>
                        <ul className="grid grid-rows-2 gap-4 m-4 text-center mx-auto">
                            {
                                hasPortfolio ? (
                                        <>
                                            <li className="btn-primario">
                                                <Link to={`/u/${username}/view`}>VER PORTAFOLIO</Link>
                                            </li>
                                            <li className="btn-secundario">
                                                <Link to={`/u/${username}/edit`} target="_blank">EDITAR PORTAFOLIO</Link>
                                            </li>
                                        </>
                                    ) :
                                    (
                                        <li className="btn-primario"
                                            onClick={() => {
                                                createPortfolioByName(username, cookies.accessToken)
                                                    .then(() => navigate(`/u/${username}/edit`))
                                                    .catch((error: Error) => showError(error.message));
                                            }}>CREAR PORTAFOLIO</li>
                                    )

                            }
                        </ul>

                        <h3 className="text-6xl underline decoration-pink-500 hidden">todo OPCIONES DE ADMIN</h3>
                        <ul className="admin-controlpanel-options">

                        </ul>
                    </div>
                }
            </>
        )
    } else
        return (<ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={() => navigate("/login")}/>); // No tengo un GlobalExceptionHandler


}