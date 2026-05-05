import Navbar from "./components/layout/Navbar/Navbar.tsx";
import Footer from "./components/layout/Footer/Footer.tsx";

import LandingSite from "./pages/LandingSite/LandingSite.tsx";

import {type JSX, useState} from "react";
import {useCookies} from "react-cookie";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";

export interface Token{
    "tokenType":"string",
    "accessToken":"string"
}


function App() {
    const [actualPage, setPage] = useState(<LandingSite/>);

    const componentDictionary = new Map<string,JSX.Element>([
            ["LandingSite", <LandingSite/>],
            ["LoginPage", <LoginPage/>]
        ]
    );

    const changePageTo = (pageName : string): void =>{
        const pageElement = componentDictionary.get(pageName);
        if(pageElement)
            setPage(pageElement);
    }

  return (
    <>
        <header>
            <Navbar changePageTo={changePageTo}/>
        </header>
        <main>
            {actualPage}
        </main>
        <Footer/>
    </>
  );
}

export default App
