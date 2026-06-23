import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar.tsx";
import Footer from "./components/layout/Footer/Footer.tsx";
import LandingSite from "./pages/LandingSite/LandingSite.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ControlPanel from "./pages/ControlPanel/ControlPanel.tsx";
import {PortfolioView} from "./pages/PortfolioView/PortfolioView.tsx";
import {PortfolioEdit} from "./pages/PortfolioEdit/PortfolioEdit.tsx"

export interface Token{
    "tokenType":"string",
    "accessToken":"string"
}

export default function App(){
    return(
        <BrowserRouter>
            <header>
                <Navbar/>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<LandingSite/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/control-panel" element={<ControlPanel/>}/>
                    <Route path="/u/:username/view" element={<PortfolioView/>}/>
                    <Route path="/u/:username/edit" element={<PortfolioView/>}/>
                </Routes>
            </main>

            <Footer/>
        </BrowserRouter>
    );
}
