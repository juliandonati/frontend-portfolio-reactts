import GenericForm, {type entryValueType, type FormStructure} from "../../ui/GenericForm.tsx";
import type {EditSectionProps} from "../../../pages/PortfolioEdit/PortfolioEdit.tsx";
import type {Presentation} from "../../../types/Portfolio.ts";
import {useCookies} from "react-cookie";


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
export default function PresentationEditSection({portfolioComponent,username,showError,showSuccess}:EditSectionProps){
    const [cookies, ,] = useCookies(['accessToken']);

    let presentation;
    if (portfolioComponent) {
        const {id: _, ...presentationWithoutId} = portfolioComponent as Presentation;
        presentation = presentationWithoutId;
    }
    return (
        <div className="portfolio-edit-section">
            <GenericForm formStructure={presentationFormStructure} formPath={`presentation/${username}`}
                         formMethod={presentation ? 'PUT' : 'POST'} token={{tokenType:'Bearer',accessToken:cookies.accessToken}}
                         currentFormData={presentation ? {
                             'name': presentation.name,
                             'title': presentation.title,
                             'description': presentation.description,
                             'img-file': presentation.imgUrl
                         } : {} as Record<string, entryValueType>}
                         postFormFunc={() => showSuccess?.('¡Presentación guardada con éxito!')}
                         postErrorCallback={showError}
            />
        </div>
    );
}