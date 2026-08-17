import {Link} from "react-router-dom";

interface PortfolioEditNavbarProps{
    username:string
}

export function PortfolioEditNavbar({username}:PortfolioEditNavbarProps){
    return (
        <nav className="
        w-full z-20 bg-white shadow-xs shadow-black
        h-100
        md:h-16">
            <ul className="
            flex flex-col w-full h-full mx-auto
            md:flex-row">
                <li className="alt-navbar-option"><Link to={`/u/${username}/edit/presentation`}><p>PRESENTACIÓN</p></Link></li>
                <li className="alt-navbar-option"><Link to={`/u/${username}/edit/about-me`}><p>ABOUT-ME</p></Link></li>
                <li className="alt-navbar-option"><Link to={`/u/${username}/edit/degrees`}><p>TÍTULOS</p></Link></li>
                <li className="alt-navbar-option"><Link to={`/u/${username}/edit/experience`}><p>EXPERIENCIA</p></Link></li>
                <li className="alt-navbar-option"><Link to={`/u/${username}/edit/skills`}><p>HABILIDADES</p></Link></li>
                <li className="alt-navbar-option"><Link to={`/u/${username}/edit/projects`}><p>PROYECTOS</p></Link></li>
            </ul>
        </nav>
    )
}