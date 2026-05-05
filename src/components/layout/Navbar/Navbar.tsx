import './Navbar.css'
import {useCookies} from "react-cookie";




interface NavbarProps{
    changePageTo: (pageName:string) => void
}

export default function Navbar({changePageTo} : NavbarProps){
    const [cookies,setCookie,removeCookie] = useCookies(["accessToken"]);
    const authenticated:boolean= cookies.accessToken != undefined;

    function logout(){
        removeCookie('accessToken')
    }

    return (
        <nav>
            <ul>
                <li onClick={() => changePageTo('LandingSite')}>Inicio</li>
                <li className={!authenticated ? '' : 'hidden'} onClick={() => changePageTo('LoginPage')}>Iniciar sesión</li>
                <li className={authenticated ? '' : 'hidden'}>Panel de Control</li>
                <li className={authenticated ? '' : 'hidden'} onClick={logout}>Cerrar sesión</li>
                <li>Contacto</li>
            </ul>
        </nav>
    )
}
