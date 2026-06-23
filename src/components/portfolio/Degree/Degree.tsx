import type {JSX} from "react";
import "./Degree.css"

interface DegreeProps{
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    imgUrl: string
}

export function Degree({name,description,startDate,endDate,imgUrl}:DegreeProps):JSX.Element{

    return(
        <li className="degree">
            <div className="text-container">
                <h4>{name}</h4>
                <strong>Inicio: {startDate.toString()} {endDate ? `, Finalización: ${endDate.toString()}` : " (EN CURSO)"}</strong>
                <p>{description}</p>
            </div>
            <div className="img-container">
                <img alt={`Imagen del título de ${name}`} src={imgUrl ? imgUrl : "https://helloartsy.com/wp-content/uploads/kids/school/how-to-draw-a-book/how-to-draw-a-book-step-6.jpg"} />
            </div>
        </li>
    );
}