import './Navbar.css'
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";




export default function Navbar(){
    const navigate = useNavigate();

    const [cookies,setCookie,removeCookie] = useCookies(["accessToken"]);
    const authenticated:boolean= cookies.accessToken != undefined;

    function logout(){
        removeCookie('accessToken')
    }

    return (
        <nav>
            <ul>
                <li onClick={() => navigate('/')}>Inicio</li>
                <li className={!authenticated ? '' : 'hidden'} onClick={() => navigate('/login')}>Iniciar sesión</li>
                <li className={authenticated ? '' : 'hidden'} onClick={() => navigate('/control-panel')}>Panel de Control</li>
                <li className={authenticated ? '' : 'hidden'} onClick={logout}>Cerrar sesión</li>
                <li onClick={() => navigate("/contact")}>Contacto</li>
            </ul>
        </nav>
    )
}
