import {type JSX, useEffect, useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import GenericForm, {type FormEntry, type FormStructure} from "../../components/ui/GenericForm.tsx";
import {useCookies} from "react-cookie";
import ErrorDialog from "../../components/layout/Miscellaneous/ErrorDialog.tsx";
import {useErrorDialog} from "../../hooks/useErrorDialog.ts";
import type {Token} from "../../App.tsx";
import {SuccessDialog} from "../../components/layout/Miscellaneous/SuccessDialog.tsx";
import {useSuccessDialog} from "../../hooks/useSuccessDialog.ts";
import {decodeToken} from "react-jwt";
import type {CustomJwtPayload} from "../ControlPanel/ControlPanel.tsx";

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
    const {itemType, itemId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {isSuccessOpen, successMessage, showSuccess} = useSuccessDialog();
    const {isErrorOpen, errorMessage, showError} = useErrorDialog();

    const {username, tokenError} = useMemo(() => {
        if (!cookies.accessToken) {
            return {username: undefined, tokenError: "Tu sesión ha expirado. Vuelve a iniciar sesión"};
        }
        const decodedToken = decodeToken<CustomJwtPayload>(cookies.accessToken);
        if (!decodedToken) {
            return {username: undefined, tokenError: "Token inválido. Vuelve a iniciar sesión"};
        }
        return {username: decodedToken.sub.toString(), tokenError: undefined};
    }, [cookies.accessToken]);
    useEffect(() => {
        if (tokenError)
            showError(tokenError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenError])


    const itemToSubmit = itemType == 'degrees' ? 'título académico' : (itemType == 'experience' ? 'trabajo' : 'habilidad');
    const formStructure: FormStructure = {
        formEntryList: [],
        formId: itemType == 'degrees' ? 'degree' : (itemType == 'experience' ? 'job' : 'skill'),
        formName: `${itemId ? 'Editar' : 'Documentar'} ${itemToSubmit}`,
        submitBtnText: `Guardar ${itemToSubmit}`
    };

    let formPath: string;
    switch (itemType) {
        case 'degrees':
            formStructure.formEntryList.push(...degreeFormEntryList);
            formPath = `degrees/`;
            break;
        case 'experience':
            formStructure.formEntryList.push(...jobFormEntryList);
            formPath = `experience/`;
            break;
        case 'skills':
            formStructure.formEntryList.push(...skillFormEntryList);
            formPath = `skills/`;
            break;
    }
    formPath = formPath! + (itemId ? itemId : username);

    const jwt: Token = {
        tokenType: "Bearer",
        accessToken: cookies.accessToken
    };
    const state = location.state;
    const itemEditBaseUrl = `/u/${username}/edit/${itemType}`;
    return (
        <>
            <SuccessDialog isSuccessOpen={isSuccessOpen} successMessage={successMessage} onClose={()=>navigate(itemEditBaseUrl)}/>
            <ErrorDialog isOpen={isErrorOpen} errorMessage={errorMessage} onClose={() => navigate("/login")}/>
            {
                username &&
                <div className="portfolio-edit-section gap-0">
                        <GenericForm formStructure={formStructure!} formPath={formPath!}
                                   formMethod={itemId ? 'PUT' : 'POST'}
                                   currentFormData={itemId ? state : {}}
                                   postFormFunc={() => showSuccess('¡Los cambios han sido realizados exitosamente!')}
                                   token={jwt}
                                   postErrorCallback={showError}/>
                        <button className="btn-terciario w-2/3 mx-auto"
                                onClick={() => navigate(itemEditBaseUrl)}>VOLVER
                        </button>
                </div>
            }
        </>
    );
}

