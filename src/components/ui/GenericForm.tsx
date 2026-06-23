import {type ChangeEvent, type JSX, useState} from "react";
import {API_BASE_URL} from "../../services/apiConfig.ts";

export interface FormEntry {
    name: string,
    label: string,
    dataType: 'image' | 'date' | 'string' | 'password'
}

export interface FormStructure {
    formEntryList: FormEntry[],
    formId: string,
    formName: string,
    submitBtnText: string
}

interface GenericFormProps<T> {
    formStructure: FormStructure,
    formPath: string,
    formMethod: 'POST' | 'PUT',
    postFormFunc ?: (parameter: T) => void
}


interface FormEntryValue{
    name:string,
    value: string | Date | File | undefined
}


export default function GenericForm<T>({formStructure, formPath, formMethod, postFormFunc}: GenericFormProps<T>): JSX.Element {
    const [formEntryValues,setFormEntryValues] = useState<FormEntryValue[]>(
        formStructure.formEntryList.map((formEntry): FormEntryValue => {
            switch(formEntry.dataType){
                case "string":
                    return {name:formEntry.name, value:''}
                case "password":
                    return {name:formEntry.name, value:''}
                case "image":
                    return {name:formEntry.name, value:undefined}
                case "date":
                    return {name:formEntry.name, value:new Date()}
            }
            }
        )
    );


    function submitForm(e:React.SubmitEvent<HTMLElement>){
        e.preventDefault();

        let formDataEntryValuesString:string = '{';
        let formDataImageFile:File|undefined = undefined;
        let formDataImageName:string|undefined= undefined;
        formEntryValues.forEach((formEntryValue) => {
            if (formEntryValue.value != undefined) {
                if (!(formEntryValue instanceof File))
                    formDataEntryValuesString = formDataEntryValuesString + `"${formEntryValue.name}":"${formEntryValue.value}",`;
                else {
                    /* formDataImageFile = formEntryValue.value; todo Arreglar subida de imagenes*/
                    formDataImageName = formEntryValue.name;
                }
            }
        });
        formDataEntryValuesString = formDataEntryValuesString.substring(0,formDataEntryValuesString.length-1) + '}';


        let isDataMultipart : boolean;
        const formData = new FormData();
        if(formDataImageFile && formDataImageName){
            isDataMultipart = true;

            formData.append(formStructure.formName,new Blob([
                formDataEntryValuesString
            ], {type: "application/json; charset=UTF-8"}));
            formData.append(formDataImageName,formDataImageFile)
        }
        else
            isDataMultipart = false;





        fetch(`${API_BASE_URL}/${formPath}`,{
            method:formMethod,
            headers:{
                'Content-Type': isDataMultipart ? 'multipart/form-data' : 'application/json'
            },
            body: isDataMultipart ? formData : formDataEntryValuesString
        })
            .then((response) =>
                response.json()
                    .then((responseJson) => {
                        console.log("JSON Recibido como respuesta: " + responseJson);
                        if(postFormFunc != undefined)
                            postFormFunc(responseJson);
                    })
            )
            .catch(() => console.log("No se obtuvo rta. del form"));
        // todo GlobalExceptionHandler
    }

    function handleChange(e:ChangeEvent<HTMLInputElement, HTMLInputElement>){
        e.preventDefault();
        const formEntry = formEntryValues.find((formEntry)=>formEntry.name == e.target.name);
        if(formEntry != undefined){
            if(e.target.files)
                formEntry.value = (e.target.files.length > 0) ? e.target.files[0] : undefined;
            else
                formEntry.value = e.target.value;
            setFormEntryValues(formEntryValues); // Es raro, cambiar la lista y luego settearla. Forza un re-render, pero es como actualizar dos veces la lista. todo Pensar en otra solución
        }

    }

    return (
        <>
            <h3>{formStructure.formName}</h3>
            <form id={formStructure.formId} encType="multipart/form-data" onSubmit={(e) => submitForm(e)}>
                {formStructure.formEntryList.map((formEntry:FormEntry):JSX.Element => {
                    switch (formEntry.dataType){
                        case "string":
                            return (
                                <>
                                    <label htmlFor={formEntry.name}>{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name={formEntry.name}></input>
                                </>
                            );
                        case "password":
                            return (
                                <>
                                    <label htmlFor={formEntry.name}>{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="password" name={formEntry.name}></input>
                                </>
                            );
                        case "date":
                            return (
                                <>
                                    <label htmlFor={formEntry.name}>{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="date" name={formEntry.name}></input>
                                </>
                            );
                        case "image":
                            return (
                                <>
                                    <label htmlFor={formEntry.name}>{formEntry.label}:</label>
                                    <input onChange={(e) => handleChange(e)} type="image" alt={formEntry.label} name={formEntry.name}></input>
                                </>
                            );
                    }
                })}
                <button type="submit">{formStructure.submitBtnText}</button>
            </form>
        </>
    )
}