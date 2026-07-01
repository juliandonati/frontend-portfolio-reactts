import {type JSX} from "react";
import {useLocation, useParams} from "react-router-dom";
import GenericForm, {type FormEntry, type FormStructure} from "../../components/ui/GenericForm.tsx";
import {useCookies} from "react-cookie";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import type {Token} from "../../App.tsx";
import {SuccessDialog} from "../../components/layout/Miscellaneous/SuccessDialog.tsx";
import {useSuccessDialog} from "../../hooks/useSuccessDialog.ts";

const degreeFormEntryList: FormEntry[] = [
    {name: 'name', label: 'Nombre', dataType: 'string'},
    {name: 'description', label: 'Descripción', dataType: 'string'},
    {name: 'startDate', label: 'Fecha de inicio', dataType: 'date'},
    {name: 'endDate', label: 'Fecha de egreso', dataType: 'date'},
    {name: 'imgUrl', label: 'Imagen', dataType: 'image'}
];

const jobFormEntryList: FormEntry[] = [
    {name: 'name', label: 'Empresa', dataType: 'string'},
    {name: 'position', label: 'Cargo', dataType: 'string'},
    {name: 'description', label: 'Descripción', dataType: 'string'},
    {name: 'startDate', label: 'Fecha de inicio', dataType: 'date'},
    {name: 'endDate', label: 'Fecha de retiro', dataType: 'date'}
];

const skillFormEntryList: FormEntry[] = [
    {name: 'name', label: 'Nombre', dataType: 'string'},
    {name: 'description', label: 'Descripción', dataType: 'string'},
    {name: 'level', label: 'Dominio', dataType: 'string'},
    {name: 'img-file', label: 'Imagen', dataType: 'image'},
    {name: 'category', label: 'Categoría', dataType: 'string'}
];

export function PortfolioCreateItem(): JSX.Element {
    const [cookies, ,] = useCookies(['accessToken']);
    const {username, itemType, itemId} = useParams();
    const location = useLocation();
    const {isSuccessOpen, successMessage, showSuccess, hideSuccess} = useSuccessDialog();
    const {isErrorOpen, errorMessage, showError, hideError} = useErrorDialog();


    const itemToSubmit = itemType == 'degrees' ? 'título académico' : (itemType == 'experience' ? 'trabajo' : 'habilidad');
    const formStructure: FormStructure = {
        formEntryList: [],
        formId: itemType!,
        formName: `${itemId ? 'Editar' : 'Documentar'} ${itemToSubmit}`,
        submitBtnText: `Guardar ${itemToSubmit}`
    };

    if(itemId)
        formStructure.formEntryList.push({name:'id',label:'id',dataType:'id'});

    let formPath: string;
    switch (itemType) {
        case 'degrees':
            formStructure.formEntryList.push(...degreeFormEntryList);
            formPath = `degrees/${username}`;
            break;
        case 'experience':
            formStructure.formEntryList.push(...jobFormEntryList);
            formPath = `experience/${username}`;
            break;
        case 'skills':
            formStructure.formEntryList.push(...skillFormEntryList);
            formPath = `skills/${username}`;
            break;
    }


    /* todo Crear cartel cuando se logra hacer un cambio exitosamente. */

    /* todo Crear cartel antes de hacer cambios. */

    /* todo Separar secciones de edición, ya que los cambios se guardan individualmente. */

    /* todo Crear modo de edición. Posiblemente usando un prop. */

    const jwt: Token = {
        tokenType: "Bearer",
        accessToken: cookies.accessToken
    };
    const state = location.state;
    return (
        <div className="portfolio-edit-section">
            <SuccessDialog isSuccessOpen={isSuccessOpen} successMessage={successMessage} onClose={hideSuccess}/>
            <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={hideError}/>
            <GenericForm formStructure={formStructure!} formPath={formPath!} formMethod={itemId ? 'PUT':'POST'}
                         currentFormData={itemId ? state :{}}
                         postFormFunc={() => showSuccess('¡Los cambios han sido realizados exitosamente!')}
                         token={jwt}
                         postErrorCallback={showError}/>
        </div>
    );
}