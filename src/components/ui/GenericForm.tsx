import {type ChangeEvent, type JSX, useEffect, useState} from "react";
import {API_BASE_URL} from "../../services/apiConfig.ts";
import type {Token} from "../../App.tsx";
import {LoadingCover} from "../layout/Miscellaneous/LoadingCover.tsx";
import * as nsfwjs from 'nsfwjs';
import {NSFWJS} from "nsfwjs";
import * as React from "react";

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
                            acumulador[formEntry.name] = null;
                            break;
                    }

                    return acumulador;
                }
                , {} as Record<string, entryValueType>) :
            currentFormData
    );
    const [formEntryErrors, setFormEntryErrors] = useState<Record<string, string>>(
        formStructure.formEntryList.reduce((acumulador, formEntry) => {
            acumulador[formEntry.name] = '';
            return acumulador;
        }, {} as Record<string, string>)
    );
    const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

    const [submitting, setSubmitting] = useState(false);


    // nsfwjs
    const [model, setModel] = useState<NSFWJS | null>(null);
    const containsImages = formStructure.formEntryList.some((formEntry) => formEntry.dataType == 'image');
    const [isModelLoading, setIsModelLoading] = useState<boolean>(containsImages);
    useEffect(() => {
        async function loadModel() {
            const modelToSet = await nsfwjs.load();
            setModel(modelToSet);
        }

        if (containsImages)
            loadModel()
                .then(() => console.log("Modelo nsfwjs cargado correctamente"))
                .catch((error: Error) => console.error("Error al cargar el modelo nsfwjs:" + error.message))
                .finally(() => setIsModelLoading(false));
    }, [formStructure, containsImages]);


    function submitForm() {
        setSubmitting(true);
        let formDataImageFile: File | undefined = undefined;
        const jsonPayload: Record<string, string> = {};

        // Separamos el archivo de los datos de texto
        Object.entries(formEntryValues).forEach(([name, value]) => {
            if (value instanceof File) {
                formDataImageFile = value;
            } else if (value !== undefined && value !== null) {
                // Guardamos en un objeto limpio lo que sea texto o fechas
                jsonPayload[name] = value as string;
            }
        });

        // JSON.stringify se encarga automáticamente de las llaves {}
        const formDataEntryValuesString = JSON.stringify(jsonPayload);


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
                    const contentType = response.headers.get("content-type");
                    setSubmitting(false);
                    if (response.ok) {
                        setFormEntryErrors({} as Record<string, string>);
                        if (contentType && contentType.includes("application/json"))
                            response.json()
                                .then((responseJson) => {
                                    if (postFormFunc != undefined)
                                        postFormFunc(responseJson);
                                });
                        else
                            response.text()
                                .then((responseText) => {
                                    if (postFormFunc != undefined)
                                        postFormFunc(responseText as unknown as T);
                                })
                    } else if (contentType && contentType.includes("application/json"))
                        response.json()
                            .then((responseJson) => {
                                // Si el error devuelve JSON, generalmente se trata de errores en el formulario.
                                if (responseJson.errores) // Si se trata de errores de validación, se indican.
                                    setFormEntryErrors(responseJson.errores);
                                else
                                    postErrorCallback(responseJson.error ? responseJson.error : "Error desconocido");
                            });
                    else
                        postErrorCallback(response.statusText);
                }
            )
            .catch((error: Error) => console.error("ERROR:" + error.message));
    }

    function validateAndSubmitForm(e: React.SubmitEvent<HTMLElement>) {
        e.preventDefault();

        const areThereFormEntryErrors = Object.values(formEntryErrors).some(error => error !== '');

        if (!areThereFormEntryErrors)
            submitForm();
    }

    function handleChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const {name, type, files, value, valueAsDate} = e.target;
        let newEntryValue;
        if (type === 'file' && files) {
            newEntryValue = files.length > 0 ? files[0] : undefined;
            if (newEntryValue instanceof File) {
                const previewUrl = URL.createObjectURL(newEntryValue);
                // Settear vista previa de imagen
                setImagePreviews(prev => ({...prev, [name]: previewUrl}));

                // Lógica de análisis NSFW.js
                if (model) {
                    const img = new Image();
                    img.src = previewUrl;

                    img.onload = async () => {
                        try {
                            // Crear canvas virtual en memoria
                            const canvas = document.createElement('canvas');
                            // Darle dimensiones a la imagen para que TensorFlow pueda analizarla
                            const size = Math.min(img.naturalWidth, img.naturalHeight);
                            const sx = (img.naturalWidth - size) / 2;
                            const sy = (img.naturalHeight - size) / 2;
                            // Dibujar imagen en el canvas
                            const ctx = canvas.getContext('2d');
                            if (!ctx)
                                postErrorCallback("No se pudo crear el contexto del canvas para NSFW.js");
                            else
                                ctx.drawImage(img, sx, sy, size, size, 0, 0, 224, 224);
                            // Analizamos el canvas
                            const predictions = await model.classify(canvas);
                            const getProbability = (category:string) => {
                                const prediction = predictions.find(p => p.className === category);
                                return prediction ? prediction.probability : 0;
                            };
                            // Probabilidades individuales
                            const pornProb = getProbability('Porn');
                            const hentaiProb = getProbability('Hentai');
                            const sexyProb = getProbability('Sexy');
                            // Umbrales individuales
                            const isPorn = pornProb > 0.6;
                            const isHentai = hentaiProb > 0.6;
                            const isSexy = sexyProb > 0.85;
                            // Umbral combinado
                            const isHighlySuspicious = (pornProb + sexyProb);

                            const isNSFW = isPorn || isHentai || isSexy || isHighlySuspicious;
                            if (isNSFW) {
                                // Mostrar error
                                setFormEntryErrors(prev => ({
                                    ...prev,
                                    [name]: 'Imagen bloqueada por contenido inapropiado.'
                                }));
                                // Limpiar vista previa
                                setImagePreviews(prev => ({...prev, [name]: ''}));
                                // Eliminar imagen del formulario
                                setFormEntryValues(prev => ({...prev, [name]: undefined}));
                            } else
                                // Eliminar error
                                setFormEntryErrors(prev => ({...prev, [name]: ''}));
                        } catch (error) {
                            postErrorCallback("Error al analizar la imagen con NSFW.js: " + error);
                        }
                    }
                }
            }
        } else {
            if (type === 'date') {
                const rawDate = valueAsDate;
                if (rawDate) {
                    newEntryValue = formatDate(rawDate);
                } else
                    newEntryValue = null;
            } else
                newEntryValue = value;
            setFormEntryErrors(prev => ({...prev, [name]: ''}));
        }

        setFormEntryValues((prevValues) => (
            {...prevValues, [name]: newEntryValue}
        ));
    }

    return (
        <>
            <div className="absolute left-0">
                <LoadingCover loading={submitting || isModelLoading}/>
            </div>
            <div className="flex flex-col items-center w-2/3 lg:w-200 mx-auto text-center">

                <h3 className="text-6xl">{formStructure.formName}</h3>

                <form id={formStructure.formId}
                      encType="multipart/form-data"
                      onSubmit={(e) => validateAndSubmitForm(e)}
                      className="flex flex-col w-full items-center gap-4 py-10"
                >
                    {formStructure.formEntryList.map((formEntry: FormEntry): JSX.Element | undefined => {
                        switch (formEntry.dataType) {
                            case "string":
                                return (
                                    <div className="form-entry" id={`${formEntry.name}Div`} key={formEntry.name}>
                                        <label htmlFor={formEntry.name}
                                               className="form-label"
                                        >{formEntry.label}:</label>
                                        <input onChange={(e) => handleChange(e)} type="text" name={formEntry.name}
                                               id={formEntry.name} value={formEntryValues[formEntry.name] as string}
                                               className="form-input"
                                        ></input>
                                        {formEntryErrors[formEntry.name] &&
                                            <p className="form-error">{formEntryErrors[formEntry.name]}</p>}
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
                                        {formEntryErrors[formEntry.name] &&
                                            <p className="form-error">{formEntryErrors[formEntry.name]}</p>}
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
                                        {formEntryErrors[formEntry.name] &&
                                            <p className="form-error">{formEntryErrors[formEntry.name]}</p>}
                                    </div>
                                );
                            case "image": {
                                const previewSrc = imagePreviews[formEntry.name] || (typeof formEntryValues[formEntry.name] === 'string' ? formEntryValues[formEntry.name] as string : undefined);
                                return (
                                    <div className="form-file-entry" key={formEntry.name}>
                                        <label htmlFor={formEntry.name}
                                               className="form-label justify-self-center underline"
                                        >{formEntry.label}</label>
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
                                        {formEntryErrors[formEntry.name] &&
                                            <p className="form-error text-2xl 2xl:text-4xl">{formEntryErrors[formEntry.name]}</p>}
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
        </>
    );
}


