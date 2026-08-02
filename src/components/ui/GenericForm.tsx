import {type ChangeEvent, type JSX, useState} from "react";
import {API_BASE_URL} from "../../services/apiConfig.ts";
import type {Token} from "../../App.tsx";

export interface FormEntry {
    name: string;
    label: string;
    dataType: 'image' | 'date' | 'string' | 'password';
}

/* todo Implementar limitaciones de caracteres */
export interface FormStructure {
    formEntryList: FormEntry[];
    formId: string;
    formName: string;
    submitBtnText: string;
}

export type entryValueType = string | File | undefined | null;

interface GenericFormProps<T> {
    formStructure: FormStructure;
    formPath: string;
    formMethod: 'POST' | 'PUT';
    postErrorCallback: (errorMessage: string) => void;
    postFormFunc?: (parameter: T) => void;
    token?: Token;
    currentFormData?: Record<string, entryValueType>;
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function GenericForm<T>({
                                           formStructure,
                                           formPath,
                                           formMethod,
                                           postErrorCallback,
                                           postFormFunc,
                                           token,
                                           currentFormData
                                       }: GenericFormProps<T>): JSX.Element {
    const [formEntryValues, setFormEntryValues] = useState<Record<string, entryValueType>>(
        formMethod == 'POST' || !currentFormData ?
            formStructure.formEntryList.reduce((acumulador, formEntry) => {
                    switch (formEntry.dataType) {
                        case "string":
                        case "password":
                            acumulador[formEntry.name] = '';
                            break;
                        case "image":
                            acumulador[formEntry.name] = undefined;
                            break;
                        case "date":
                            acumulador[formEntry.name] = formatDate(new Date());
                            break;
                    }

                    return acumulador;
                }
                , {} as Record<string, entryValueType>) :
            currentFormData
    );
    const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});


    function submitForm(e: React.SubmitEvent<HTMLElement>) {
        e.preventDefault();

        let formDataEntryValuesString: string = '{';
        let formDataImageFile: File | undefined = undefined;

        /* todo Reemplazar toda esta peligrosidad por un JSON.stringify()*/
        if (Object.entries(formEntryValues)[0][1] != '' || undefined) {
            Object.entries(formEntryValues).forEach(([name, value]) => {
                if (value) {
                    if (!(value instanceof File))
                        formDataEntryValuesString = formDataEntryValuesString + `"${name}":"${value}",`;
                    else {
                        formDataImageFile = value;
                    }
                }
            });
            formDataEntryValuesString = formDataEntryValuesString.substring(0, formDataEntryValuesString.length - 1) + '}';
        } else
            formDataEntryValuesString = formDataEntryValuesString + '}';


        const formData = new FormData();

        const isDataMultipart: boolean = formStructure.formEntryList.find(
            formEntry => formEntry.dataType == 'image'
        ) != undefined;

        if (isDataMultipart)
            formData.append(formStructure.formId, new Blob([
                formDataEntryValuesString
            ], {type: "application/json; charset=UTF-8"}));

        if (formDataImageFile) {
            formData.append('img-file', formDataImageFile)
        }


        const requestHeaders: Record<string, string> = {};

        if (token)
            requestHeaders['Authorization'] = `${token.tokenType} ${token.accessToken}`;
        if (!isDataMultipart)
            requestHeaders['Content-Type'] = 'application/json';

        fetch(`${API_BASE_URL}/${formPath}`, {
            method: formMethod,
            headers: requestHeaders,
            body: isDataMultipart ? formData : formDataEntryValuesString
        })
            .then((response) => {
                    if (response.ok)
                        response.json()
                            .then((responseJson) => {
                                console.log("JSON Recibido como respuesta: " + responseJson);
                                if (postFormFunc != undefined)
                                    postFormFunc(responseJson);
                            });
                    else
                        postErrorCallback(response.statusText);
                }
            )
            .catch((error: Error) => console.log("ERROR:" + error.message));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const {name, type, files, value, valueAsDate} = e.target;
        let newEntryValue;
        if (type === 'file' && files) {
            newEntryValue = files.length > 0 ? files[0] : undefined;
            if (newEntryValue instanceof File) {
                const previewUrl = URL.createObjectURL(newEntryValue);
                setImagePreviews(prev => ({...prev, [name]: previewUrl}));
            }
        } else {
            if (type === 'date') {
                const rawDate = valueAsDate;
                if (rawDate)
                    newEntryValue = formatDate(rawDate);
                else
                    newEntryValue = null;
            } else
                newEntryValue = value;
        }

        setFormEntryValues((prevValues) => (
            {...prevValues, [name]: newEntryValue}
        ));
    }

    // console.log(`Metodo de ${formStructure.formId}: ${formMethod}`);

    return (
        <div className="flex flex-col items-center w-2/3 lg:w-200 mx-auto text-center">

            <h3 className="text-6xl">{formStructure.formName}</h3>

            <form id={formStructure.formId}
                  encType="multipart/form-data"
                  onSubmit={(e) => submitForm(e)}
                  className="flex flex-col w-full items-center gap-4 py-10"
            >
                {formStructure.formEntryList.map((formEntry: FormEntry): JSX.Element | undefined => {
                    switch (formEntry.dataType) {
                        case "string":
                            return (
                                <div className="form-entry" key={formEntry.name}>
                                    <label htmlFor={formEntry.name}
                                           className="form-label"
                                    >{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name={formEntry.name}
                                           id={formEntry.name} value={formEntryValues[formEntry.name] as string}
                                           className="form-input"
                                    ></input>
                                </div>
                            );
                        case "password":
                            return (
                                <div className="form-entry" key={formEntry.name}>
                                    <label htmlFor={formEntry.name}
                                           className="form-label"
                                    >{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="password" name={formEntry.name}
                                           id={formEntry.name} value={formEntryValues[formEntry.name] as string}
                                           className="form-input"
                                    ></input>
                                </div>
                            );
                        case "date":
                            return (
                                <div className="form-entry" key={formEntry.name}>
                                    <label htmlFor={formEntry.name}
                                           className="form-label"
                                    >{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="date" name={formEntry.name}
                                           id={formEntry.name} value={formEntryValues[formEntry.name]?.toString()}
                                           className="form-input"
                                    ></input>
                                </div>
                            );
                        case "image": {
                            const previewSrc = imagePreviews[formEntry.name] || (typeof formEntryValues[formEntry.name] === 'string' ? formEntryValues[formEntry.name] as string : undefined);
                            return (
                                <div className="form-entry flex flex-col" key={formEntry.name}>
                                    <label htmlFor={formEntry.name}
                                           className="form-label"
                                    >{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)}
                                           type="file" accept="image/*"
                                           alt={formEntry.label}
                                           name={formEntry.name} id={formEntry.name}
                                           className="form-file-input"
                                    ></input>
                                    {formEntryValues[formEntry.name] &&
                                        <div className="w-2/6 overflow-hidden mx-auto">
                                            <img className="object-cover w-full h-full" alt={formEntry.label}
                                                 src={previewSrc}/>
                                        </div>}
                                </div>
                            );
                        }
                    }
                })}
                <button
                    className="btn-primario"
                    type="submit">{formStructure.submitBtnText}</button>
            </form>
        </div>
    );
}


