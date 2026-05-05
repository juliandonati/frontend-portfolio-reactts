import './LandingSite.css'
import PortfolioSearchBar from "../../components/ui/PortfolioSearchBar.tsx";

function LandingSite(){


    return (
        <div id="landing-site">
            <div id="landing-hero">
                <h2>¡Bienvenido a</h2>
                <h1>Port-A-Folio!</h1>
            </div>

            <PortfolioSearchBar/>
        </div>
    )
}

export default LandingSite;