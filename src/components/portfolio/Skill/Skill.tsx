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
        h-120 w-9/10 lg:w-80 2xl:w-140 mx-auto
        rounded-4xl shadow-md shadow-black
        overflow-hidden
        relative
        ">
            <div className="
            grid grid_rows-[1fr_1fr_1fr_3fr] p-8
            bg-card
            relative
            z-10
            ">
                <h4 className="text-4xl underline">{name}</h4>
                <strong className="text-3xl">Nivel: {level}</strong>
                <strong className="text-3xl">Categoría: {category}</strong>
                <p className="text-2xl mt-6">{description}</p>
            </div>
            <div className="
            mx-auto overflow-hidden
            bg-white
            w-full h-full
            absolute top-1/2 -translate-y-1/2
            z-2">
                <div className="z-2 absolute w-full h-full bg-white opacity-75"></div>
                <img
                    className="object-cover w-full h-full my-auto z-1"
                    alt={`Imagen de habilidad en ${name}`}
                    src={imgUrl ? imgUrl : "https://i.pinimg.com/736x/44/c2/e7/44c2e7a9afbacb46080ba1f0740d48a3.jpg"}/>
            </div>
        </li>
    );
}