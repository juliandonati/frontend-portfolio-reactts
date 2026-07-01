import PortfolioSearchBar from "../../components/ui/PortfolioSearchBar.tsx";

function LandingSite(){


    return (
        <div className="
        grid grid-rows-[15rem_15rem] gap-12
        h-full
        ">
            <div className="grid grid-rows-2 text-center select-none">
                <h2 className="text-8xl text-shadow-lg text-shadow-pink-200">¡Bienvenido a</h2>
                <h1 className="text-8xl text-shadow-lg text-shadow-pink-200">Port-A-Folio!</h1>
            </div>

            <PortfolioSearchBar/>
        </div>
    )
}

export default LandingSite;