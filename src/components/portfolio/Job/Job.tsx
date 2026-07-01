import type {JSX} from "react";

interface JobProps {
    name: string,
    position: string,
    description: string,
    startDate: Date,
    endDate: Date
}

export function Job({name, position, description, startDate, endDate}: JobProps): JSX.Element {

    return (
        <li className="
        grid grid-rows-[1fr_1fr_1fr_4fr] gap-4
        shrink-0
        w-5/6 h-100
        mx-auto mt-2
        p-8
        bg-card
        shadow shadow-black
        border-b-4 border-[rgba(0,0,0,.2)] rounded-4xl
        overflow-x-hidden font-sans
        ">
            <h4 className="text-4xl text-right">{name}</h4>
            <strong className="text-3xl text-right">{position}</strong>
            <strong className="text-3xl">Inicio: {startDate.toString()} {endDate ? `Finalización: ${endDate.toDateString()}` : ' (EN CURSO)'}</strong>
            <p className="text-2xl">{description}</p>
        </li>
    );
}