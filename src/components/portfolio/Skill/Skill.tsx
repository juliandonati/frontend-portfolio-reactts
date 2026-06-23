import type {JSX} from "react";
import "./Skill.css"

interface SkillProps{
    name:string,
    description:string,
    level:string,
    imgUrl:string,
    category:string
}

export function Skill({name,description,level,imgUrl,category}:SkillProps):JSX.Element{

    return(
        <li className="skill">
            <div className="text-container">
                <h4>{name}</h4>
                <strong>Nivel: {level}</strong>
                <strong>Categoría: {category}</strong>
                <p>{description}</p>
            </div>
            <div className="img-container">
                <img alt={`Imagen de habilidad en ${name}`} src={imgUrl ? imgUrl : "https://i.pinimg.com/736x/44/c2/e7/44c2e7a9afbacb46080ba1f0740d48a3.jpg"}/>
            </div>
        </li>
    );
}