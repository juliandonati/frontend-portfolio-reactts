import {type JSX, Suspense, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import {useParams} from "react-router-dom";
import {useSuccessDialog} from "../../hooks/useSuccessDialog.ts";
import {SuccessDialog} from "../../components/layout/Miscellaneous/SuccessDialog.tsx";
import {PortfolioEditNavbar} from "../../components/layout/PortfolioEditNavbar/PortfolioEditNavbar.tsx";
import {LoadingCover} from "../../components/layout/Miscellaneous/LoadingCover.tsx";
import {
    COMPONENT_NOT_FOUND_MESSAGE,
    PortfolioAboutMeService, type PortfolioComponent,
    type PortfolioComponentService, PortfolioDegreeListService,
    PortfolioExperienceListService, PortfolioPresentationService, PortfolioProjectListService,
    PortfolioSkillListService
} from "../../services/portfolioComponentService.ts";
import * as React from "react";
import {decodeToken} from "react-jwt";
import type {CustomJwtPayload} from "../ControlPanel/ControlPanel.tsx";

// Para la carga del item a editar
interface PortfolioComponentResult {
    error?: Error;
    component?: PortfolioComponent;
}

// Para la carga de componentes de React según el componente:
export interface EditSectionProps {
    portfolioComponent?: PortfolioComponent;
    showError: (message: string) => void;
    username?: string;
    showSuccess?: (message: string) => void;
}

// Code-Splitting
const SkillEditSection = React.lazy(() => import('../../components/portfolioEdit/SkillEditSection/SkillEditSection'));
const DegreeEditSection = React.lazy(() => import('../../components/portfolioEdit/DegreeEditSection/DegreeEditSection'));
const ExperienceEditSection = React.lazy(() => import('../../components/portfolioEdit/ExperienceEditSection/ExperienceEditSection'));
const PresentationEditSection = React.lazy(() => import('../../components/portfolioEdit/PresentationEditSection/PresentationEditSection'));
const AboutMeEditSection = React.lazy(() => import('../../components/portfolioEdit/AboutMeEditSection/AboutMeEditSection'));
const ProjectEditSection = React.lazy(() => import('../../components/portfolioEdit/ProjectEditSection/ProjectEditSection'));

// Mapa de componentes
const SECTION_COMPONENTS: Record<string, React.ComponentType<EditSectionProps>> = {
    'skills': SkillEditSection,
    'degrees': DegreeEditSection,
    'experience': ExperienceEditSection,
    'presentation': PresentationEditSection,
    'about-me': AboutMeEditSection,
    'projects': ProjectEditSection
};

export function PortfolioEdit(): JSX.Element {
    const [cookies, ,] = useCookies(['accessToken']);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {isErrorOpen, errorMessage, showError, hideError} = useErrorDialog();
    const {isSuccessOpen, successMessage, showSuccess} = useSuccessDialog();
    const {username, itemType} = useParams<string>();
    const [componentResult, setComponentResult] = useState<PortfolioComponentResult>({
        error: undefined,
        component: undefined
    }); // se busca componente y se carga

    const DynamicSection = SECTION_COMPONENTS[itemType ? itemType : 'presentation'];
    const isUserOwner: boolean = Boolean(username && cookies.accessToken && username == decodeToken<CustomJwtPayload>(cookies.accessToken)?.sub);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            if (isUserOwner) {
                if (!DynamicSection) {
                    showError(`El componente ${itemType} no existe`);
                    setIsLoading(false);
                    return;
                }
                setIsLoading(true);
                let portfolioComponentService: PortfolioComponentService<PortfolioComponent>;
                const activeItemType = itemType ? itemType : 'presentation';
                switch (activeItemType) {
                    case 'skills':
                        portfolioComponentService = new PortfolioSkillListService(username!, cookies.accessToken);
                        break;
                    case 'experience':
                        portfolioComponentService = new PortfolioExperienceListService(username!, cookies.accessToken);
                        break;
                    case 'degrees':
                        portfolioComponentService = new PortfolioDegreeListService(username!, cookies.accessToken);
                        break;
                    case 'projects':
                        portfolioComponentService = new PortfolioProjectListService(username!, cookies.accessToken);
                        break;
                    case 'about-me':
                        portfolioComponentService = new PortfolioAboutMeService(username!, cookies.accessToken);
                        break;
                    case 'presentation':
                        portfolioComponentService = new PortfolioPresentationService(username!, cookies.accessToken);
                        break;
                    default:
                        return;
                }


                try {
                    const portfolioComponent = await portfolioComponentService.get();
                    setComponentResult({error: undefined, component: portfolioComponent});
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        if (error.message.includes(COMPONENT_NOT_FOUND_MESSAGE))
                            setComponentResult({error: undefined, component: undefined});
                        else {
                            setComponentResult({error: error, component: undefined});
                            showError(error.message);
                        }
                    } else {
                        setComponentResult({error: new Error("Error desconocido"), component: undefined});
                        showError("Ocurrió un error inesperado");
                    }
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                showError("Este portafolio no te pertenece, o debes iniciar sesión de vuelta");
            }
        }
        void fetchPortfolioData();
    }, [username, showError, setIsLoading, DynamicSection, cookies.accessToken, itemType, isUserOwner]);


    return (
        <>
            <PortfolioEditNavbar username={username!}/>
            <LoadingCover loading={isLoading}/>
            <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={hideError}/>
            <SuccessDialog isSuccessOpen={isSuccessOpen} successMessage={successMessage}
                           onClose={() => location.reload()}/>
            {!componentResult.error && !isLoading && DynamicSection && isUserOwner &&
                <div className="
                flex flex-col gap-8 w-full lg:w-5/6
                relative mt-12">
                    <Suspense>
                        <DynamicSection username={username} portfolioComponent={componentResult.component}
                                        showError={showError}
                                        showSuccess={showSuccess}/>
                    </Suspense>
                </div>
            }
        </>
    );
}