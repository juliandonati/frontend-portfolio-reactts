import type {AboutMe, Degree, Job, Presentation, Project, Skill} from "../types/Portfolio.ts";
import {API_BASE_URL} from "./apiConfig.ts";

export type PortfolioComponent = Presentation | AboutMe | Degree[] | Skill[] | Job[] | Project[];
export const COMPONENT_NOT_FOUND_MESSAGE = "No se encontró el componente que buscas";
async function getPortfolioComponent<T extends PortfolioComponent>(username:string,jwt:string,itemType:string,isList:boolean):Promise<T>{
    const response:Response = await fetch(`${API_BASE_URL}/${itemType}/${isList ? 'list/' : ''}${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });

    if(response.status == 404)
        throw new Error(COMPONENT_NOT_FOUND_MESSAGE);

    if(response.status == 401)
        throw new Error("No tienes acceso al portafolio que buscas.")
    return await response.json();
}
async function getPortfolioComponentList<T extends PortfolioComponent> (username:string,jwt:string,itemType:string):Promise<T> {return await getPortfolioComponent(username,jwt,itemType,true)}


export abstract class PortfolioComponentService<T extends PortfolioComponent>{
    protected username:string;
    protected jwt:string;

    public constructor (username:string,jwt:string){this.username = username; this.jwt = jwt};
    public abstract get: () => Promise<T>;
}
export class PortfolioPresentationService extends PortfolioComponentService<Presentation>{get=()=>{return getPortfolioComponent<Presentation>(this.username,this.jwt,'presentation',false)}}
export class PortfolioAboutMeService extends PortfolioComponentService<AboutMe>{get=()=>{return getPortfolioComponent<AboutMe>(this.username,this.jwt,'about-me',false)}}
export class PortfolioSkillListService extends PortfolioComponentService<Skill[]>{get=()=>{return getPortfolioComponentList<Skill[]>(this.username,this.jwt,'skills')}}
export class PortfolioDegreeListService extends PortfolioComponentService<Degree[]>{get=()=>{return getPortfolioComponentList<Degree[]>(this.username,this.jwt,'degrees')}}
export class PortfolioExperienceListService extends PortfolioComponentService<Job[]>{get=()=>{return getPortfolioComponentList<Job[]>(this.username,this.jwt,'experience')}}
export class PortfolioProjectListService extends PortfolioComponentService<Project[]>{get=()=>{return getPortfolioComponentList<Project[]>(this.username,this.jwt,'projects')}}
