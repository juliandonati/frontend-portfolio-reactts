import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar.tsx";
import Footer from "./components/layout/Footer/Footer.tsx";
import LandingSite from "./pages/LandingSite/LandingSite.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ControlPanel from "./pages/ControlPanel/ControlPanel.tsx";
import {Portfolio} from "./pages/Portfolio/Portfolio.tsx";
import {PortfolioCreateItem} from "./pages/PortfolioCreateItem/PortfolioCreateItem.tsx";

export interface Token {
    tokenType: string;
    accessToken: string;
}

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <Navbar/>
            </header>

            <main className={`
            flex flex-col flex-1 items-center content-center
            font-display
            
            w-screen h-full
            
            relative top-40
            `}>
                <Routes>
                    <Route path="/" element={<LandingSite/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/control-panel" element={<ControlPanel/>}/>
                    <Route path="/u/:username/:action" element={<Portfolio/>}/>
                    <Route path="/u/:username/create/:itemType" element={<PortfolioCreateItem/>}/>
                    <Route path="/:itemType/:itemId/edit" element={<PortfolioCreateItem/>}/>
                </Routes>
            </main>

            <Footer/>
        </BrowserRouter>
    );
}
