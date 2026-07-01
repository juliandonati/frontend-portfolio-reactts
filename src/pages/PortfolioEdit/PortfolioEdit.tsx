import type {JSX} from "react";
import type {Degree, Job, Portfolio, Skill} from "../../types/Portfolio.ts";
import GenericForm, {type entryValueType, type FormStructure} from "../../components/ui/GenericForm.tsx";
import {useCookies} from "react-cookie";
import type {Token} from "../../App.tsx";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import {useNavigate} from "react-router-dom";
import {EditTable} from "../../components/portfolio/EditTable.tsx";
import LandingSite from "../LandingSite/LandingSite.tsx";
import {useSuccessDialog} from "../../hooks/useSuccessDialog.ts";
import {SuccessDialog} from "../../components/layout/Miscellaneous/SuccessDialog.tsx";

interface PortfolioEditProps {
    portfolio: Portfolio,
    username: string
}

const presentationFormStructure: FormStructure = {
    formEntryList: [
        {name: 'name', label: 'Nombre profesional', dataType: 'string'},
        {name: 'title', label: 'Título profesional', dataType: 'string'},
        {name: 'description', label: 'Mi descripción', dataType: 'string'},
        {name: 'img-file', label: 'Mi imagen', dataType: 'image'}
    ],
    formId: 'presentation',
    formName: 'Editar mi presentación',
    submitBtnText: 'Guardar presentación'
}

const aboutmeFormStructure: FormStructure = {
    formEntryList: [
        {name: 'title', label: 'Título', dataType: 'string'},
        {name: 'description', label: 'Descripción de lo que hago', dataType: 'string'},
        /* todo No agregué la imagen aún porque no la implementé en el Backend */
        {name: 'buttonText', label: 'Botón', dataType: 'string'},
        {name: 'buttonUrl', label: 'URL Botón', dataType: 'string'}
    ],
    formId: 'about-me',
    formName: 'Editar mi About-Me',
    submitBtnText: 'Guardar About-Me'
}


export function PortfolioEdit({portfolio, username}: PortfolioEditProps): JSX.Element {
    const [cookies,,] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const {isErrorOpen, errorMessage, showError, hideError} = useErrorDialog();
    const {isSuccessOpen, successMessage, showSuccess} = useSuccessDialog();

    if (cookies.accessToken) {
        const jwt: Token = {
            tokenType: "Bearer",
            accessToken: cookies.accessToken
        };

        let presentation;
        if (portfolio.presentation) {
            const {id, ...presentationWithoutId} = portfolio.presentation;
            presentation = presentationWithoutId;
        }

        let aboutMe;
        if (portfolio.aboutMe) {
            const {id, ...aboutMeWithoutId} = portfolio.aboutMe;
            aboutMe = aboutMeWithoutId;
        }

        const degrees = portfolio.degrees;
        const jobs = portfolio.experience;
        const skills = portfolio.skills;

        return (
            <div className="flex flex-col gap-8 w-full lg:w-5/6">
                <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={hideError}/>
                <SuccessDialog isSuccessOpen={isSuccessOpen} successMessage={successMessage} onClose={() => location.reload()}/>

                <div className="portfolio-edit-section">
                    <GenericForm formStructure={presentationFormStructure} formPath={`presentation/${username}`}
                                 formMethod={presentation ? 'PUT' : 'POST'} token={jwt}
                                 currentFormData={presentation ? {'name':presentation.name,'title':presentation.title,'description':presentation.description,'img-file':presentation.imgUrl} : {} as Record<string, entryValueType>}
                                 postFormFunc={() => showSuccess('¡Presentación guardada con éxito!')}
                                 postErrorCallback={showError}
                    />
                </div>

                <div className="portfolio-edit-section">
                    <GenericForm formStructure={aboutmeFormStructure} formPath={`about-me/${username}`}
                                 formMethod={aboutMe ? 'PUT' : 'POST'} token={jwt}
                                 currentFormData={aboutMe as Record<string, entryValueType>}
                                 postFormFunc={() => showSuccess('¡About-me guardado con éxito!')}
                                 postErrorCallback={showError}
                    />
                </div>

                <div className="portfolio-edit-section">
                    <h3 className="portfolio-title">Mis títulos académicos</h3>
                    {degrees.length > 0 ?
                        <EditTable<Degree> tableHeaders={['ID','NOMBRE','DESC','INICIO','FIN','IMAGEN']} data={degrees} itemName={'degrees'} showErrorCallback={showError}/>
                    : <p className="mx-auto text-3xl">No has subido ningún título académico</p> }
                    <button
                        onClick={()=>navigate(`/u/${username}/create/degrees`)}
                        className="btn-primario mx-auto">DOCUMENTAR TÍTULO ACADÉMICO
                    </button>
                </div>

                <div className="portfolio-edit-section">
                    <h3 className="portfolio-title">Mi experiencia laboral</h3>
                    {jobs.length > 0 ?
                        <EditTable<Job> tableHeaders={['ID','EMPRESA','CARGO','DESC','INICIO','FIN']} data={jobs} itemName={'experience'} showErrorCallback={showError}/>
                    : <p className="mx-auto text-3xl">No has subido ningún trabajo</p>}
                    <button
                        onClick={()=>navigate(`/u/${username}/create/experience`)}
                        className="btn-primario mx-auto">DOCUMENTAR TRABAJO
                    </button>
                </div>

                <div className="portfolio-edit-section">
                    <h3 className="portfolio-title">Mis habilidades</h3>
                    {skills.length > 0 ?
                        <EditTable<Skill> tableHeaders={['ID','NOMBRE','DESC','NIVEL','IMAGEN','CATEGORIA']} data={skills} itemName={'skills'} showErrorCallback={showError}/>
                        : <p className="mx-auto text-3xl">No has subido ninguna habilidad</p>
                    }
                    <button
                        onClick={()=>navigate(`/u/${username}/create/skills`)}
                        className="btn-primario mx-auto">DOCUMENTAR HABILIDAD
                    </button>
                </div>
            </div>
        );
    }
    else
        return <LandingSite/>
}