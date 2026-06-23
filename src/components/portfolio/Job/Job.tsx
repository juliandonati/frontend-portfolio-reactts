import type {JSX} from "react";
import "./Job.css";

interface JobProps {
    name: string,
    position: string,
    description: string,
    startDate: Date,
    endDate: Date
}

export function Job({name, position, description, startDate, endDate}: JobProps): JSX.Element {

    return (
        <li className="job">
            <h4>{name}</h4>
            <strong>{position}</strong>
            <strong>Inicio: {startDate.toString()} {endDate ? `Finalización: ${endDate.toDateString()}` : ' (EN CURSO)'}</strong>
            <p>{description}</p>
        </li>
    );
}