import type {JSX} from "react";

interface SkillProps{
    name:string,
    description:string,
    level:string,
    imgUrl:string,
    category:string
}

export function Skill({name,description,level,imgUrl,category}:SkillProps):JSX.Element{

    return(
        <li className="
        grid grid-rows-[3fr_2fr]
        h-120 w-9/10 lg:w-80 mx-auto
        rounded-4xl shadow-md shadow-black
        overflow-hidden
        relative
        ">
            <div className="
            grid grid_rows-[1fr_1fr_1fr_3fr] p-8
            bg-card
            relative
            z-10 shadow shadow-black
            ">
                <h4 className="text-4xl">{name}</h4>
                <strong className="text-3xl">Nivel: {level}</strong>
                <strong className="text-3xl">Categoría: {category}</strong>
                <p className="text-2xl">{description}</p>
            </div>
            <div className="
            w-full content-end mx-auto overflow-hidden
            bg-white
            relative z-0">
                <img
                    className="object-cover"
                    alt={`Imagen de habilidad en ${name}`}
                    src={imgUrl ? imgUrl : "https://i.pinimg.com/736x/44/c2/e7/44c2e7a9afbacb46080ba1f0740d48a3.jpg"}/>
            </div>
        </li>
    );
}