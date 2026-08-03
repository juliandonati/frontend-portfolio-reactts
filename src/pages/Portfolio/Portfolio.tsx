import {type JSX, useEffect, useState} from "react";
import {getUserPortfolioByName} from "../../services/portfolioService.ts";

import {useNavigate, useParams} from "react-router-dom";
import type {Portfolio} from "../../types/Portfolio.ts";

import {PortfolioView} from "../PortfolioView/PortfolioView.tsx";
import {PortfolioEdit} from "../PortfolioEdit/PortfolioEdit.tsx";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import {LoadingCover} from "../../components/layout/Miscellaneous/LoadingCover.tsx";


interface PortfolioResult {
    error?: Error,
    portfolio?: Portfolio
}

export function Portfolio(): JSX.Element {
    const [portfolioResult, setPortfolioResult] = useState<PortfolioResult>({error: undefined, portfolio: undefined});
    const {isErrorOpen, errorMessage, showError} = useErrorDialog();
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {username, action} = useParams<string>();
    useEffect(() => {
        if (username)
            getUserPortfolioByName(username)
                .then(foundPortfolio => {
                    setPortfolioResult({error: undefined, portfolio: foundPortfolio});
                })
                .catch((error: Error) => {
                    setPortfolioResult({error: error, portfolio: undefined});
                    showError(error.message);
                    setIsLoading(false);
                }/*mostrar dialogo de error*/);
        else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPortfolioResult({error: new Error("Tienes que especificar el usuario de quien buscas el portafolio.")});
        }
    }, [username,showError,setIsLoading]);

    if (portfolioResult.portfolio) {
        return action == 'view' ? (
                <PortfolioView portfolio={portfolioResult.portfolio} username={username!}/> ) :
        (<PortfolioEdit portfolio={portfolioResult.portfolio} username={username!}/>
        );
    } else {
        return (
            <>
                <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={() => navigate("/")}/>
                <LoadingCover loading={isLoading}/>
            </>
        );
    }


}