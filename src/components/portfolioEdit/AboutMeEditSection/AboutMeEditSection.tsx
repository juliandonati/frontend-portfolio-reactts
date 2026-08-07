import GenericForm, {type entryValueType, type FormStructure} from "../../ui/GenericForm.tsx";
import type {EditSectionProps} from "../../../pages/PortfolioEdit/PortfolioEdit.tsx";
import type {AboutMe} from "../../../types/Portfolio.ts";
import {useCookies} from "react-cookie";

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
export default function AboutMeEditSection({portfolioComponent,username,showError,showSuccess}:EditSectionProps){
    const [cookies, ,] = useCookies(['accessToken']);

    let aboutMe;
    if (portfolioComponent) {
        const {id: _, ...aboutMeWithoutId} = portfolioComponent as AboutMe;
        aboutMe = aboutMeWithoutId;
    }
    return (
        <div className="portfolio-edit-section">
            <GenericForm formStructure={aboutmeFormStructure} formPath={`about-me/${username}`}
                         formMethod={aboutMe ? 'PUT' : 'POST'} token={{tokenType:'Bearer',accessToken:cookies.accessToken}}
                         currentFormData={aboutMe as Record<string, entryValueType>}
                         postFormFunc={() => showSuccess?.('¡About-me guardado con éxito!')}
                         postErrorCallback={showError}
            />
        </div>);
}