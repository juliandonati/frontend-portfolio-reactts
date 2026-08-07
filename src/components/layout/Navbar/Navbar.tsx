import './Navbar.css'
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();

    const [cookies, , removeCookie] = useCookies(["accessToken"]);
    const authenticated: boolean = cookies.accessToken != undefined;

    function logout() {
        removeCookie('accessToken', {path: '/'});
    }

    return (
        <nav id="main-navbar">
            <ul className="flex mx-auto">
                <li className="navbar-option" onClick={() => navigate('/')}>
                    <p className="hidden md:block">Inicio</p>
                    <span className="md:hidden"><i className="fa-solid fa-house"/></span>
                </li>
                {
                    authenticated ?
                        (
                            <>
                                <li className="navbar-option" onClick={() => navigate('/control-panel')}>
                                    <p className="hidden md:block">Panel de Control</p>
                                    <span className="md:hidden"><i className="fa-solid fa-user-lock"/></span>
                                </li>
                                <li className="navbar-option" onClick={logout}>
                                    <p className="hidden md:block">Cerrar sesión</p>
                                    <span className="md:hidden"><i className="fa-solid fa-door-open"/></span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="navbar-option" onClick={() => navigate('/login')}>
                                    <p className="hidden md:block">Iniciar sesión</p>
                                    <span className="md:hidden"><i className="fa-solid fa-door-closed"/></span>
                                </li>
                                <li className="navbar-option" onClick={() => navigate('/register')}>
                                    <p className="hidden md:block">Registrar</p>
                                    <span className="md:hidden"><i className="fa-solid fa-user-plus"/></span>
                                </li>
                            </>
                        )
                }

                <li className="navbar-option" onClick={() => navigate("/contact")}>
                    <p className="hidden md:block">Contacto</p>
                    <span className="md:hidden"><i className="fa-solid fa-phone"/></span>
                </li>
            </ul>
        </nav>
    );
}
