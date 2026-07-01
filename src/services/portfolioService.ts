import type {Portfolio} from "../types/Portfolio.ts";
import {API_BASE_URL} from "./apiConfig.ts";

const API_PORTFOLIO_URL = API_BASE_URL + '/portfolio';

export async function getUserPortfolioByName(name : string): Promise<Portfolio>{
    const response:Response = await fetch(`${API_PORTFOLIO_URL}/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.status == 404)
        throw new Error("No se encontró el portafolio que buscas.");

    if(response.status == 401)
        throw new Error("No tienes acceso al portafolio que buscas.")
    return await response.json();
}

export async function existsPortfolioByName(name: string){
    const response:Response = await fetch(`${API_PORTFOLIO_URL}/${name}/exists`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(response.status == 404)
        throw new Error("Usuario inexistente.");
    return await response.json();
}

export async function createPortfolioByName(name:string, token:string):Promise<Portfolio>{
    const response:Response = await fetch(`${API_PORTFOLIO_URL}/${name}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if(response.status == 404)
        throw new Error("Usuario inexistente.");

    if(response.status == 401)
        throw new Error("No tienes los permisos suficientes.");

    return await response.json();
}