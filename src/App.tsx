import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar.tsx";
import Footer from "./components/layout/Footer/Footer.tsx";
import LandingSite from "./pages/LandingSite/LandingSite.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ControlPanel from "./pages/ControlPanel/ControlPanel.tsx";
import {Portfolio} from "./pages/Portfolio/Portfolio.tsx";
import {PortfolioCreateItem} from "./pages/PortfolioCreateItem/PortfolioCreateItem.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import {ContactSite} from "./pages/ContactSite/ContactSite.tsx";
import {PortfolioEdit} from "./pages/PortfolioEdit/PortfolioEdit.tsx";

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
           
            w-screen h-full mt-24
            `}>
                <Routes>
                    <Route path="/" element={<LandingSite/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/control-panel" element={<ControlPanel/>}/>
                    <Route path="/u/:username/view" element={<Portfolio/>}/>
                    <Route path="/u/:username/create/:itemType" element={<PortfolioCreateItem/>}/>
                    <Route path="/u/:username/edit/:itemType" element={<PortfolioEdit/>}/>
                    <Route path="/u/:username/edit" element={<PortfolioEdit/>}/>
                    <Route path="/item/:itemType/:itemId/edit" element={<PortfolioCreateItem/>}/>
                    <Route path="/contact" element={<ContactSite/>}/>
                </Routes>
            </main>

            <Footer/>
        </BrowserRouter>
    );
}
