import PortfolioSearchBar from "../../components/ui/PortfolioSearchBar.tsx";

function LandingSite(){


    return (
        <div className="
        grid grid-rows-[15rem_10rem_15rem] md:grid-rows-[15rem_5rem_15rem] gap-10 mt-16
        h-full
        2xl:gap-48
        ">
            <div className="grid grid-rows-2 text-center select-none
            text-8xl text-shadow-lg text-shadow-pink-200
            2xl:text-[12rem] 2xl:gap-32">
                <h2>¡Bienvenido a</h2>
                <h1>Port-A-Folio!</h1>
            </div>
            <p className="
            text-4xl w-2/3 mx-auto text-center underline
            2xl:text-6xl
            ">
                ¡Registrate para crear tu propio portafolio, o busca el de alguien en esta barra de abajo!
            </p>
            <PortfolioSearchBar/>
        </div>
    )
}

export default LandingSite;