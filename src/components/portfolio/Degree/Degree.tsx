import type {JSX} from "react";

interface DegreeProps {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    imgUrl: string
}

export function Degree({name, description, startDate, endDate, imgUrl}: DegreeProps): JSX.Element {

    return (
        <li className="
        shrink-0
        mt-8
        mx-auto
        bg-card
        shadow shadow-black
        border-b-4 border-[rgba(0,0,0,.2)]
        overflow-hidden

        relative
        w-9/10 h-120 p-4 lg:w-5/6 lg:h-100 lg:p-0
        rounded-2xl lg:rounded-none lg:rounded-tl-[8rem]
        lg:grid lg:grid-cols-[2fr_1fr]
        ">
            <div className="
            grid grid-rows-[1fr_1fr_3fr] p-8 font-sans
            lg:relative lg:left-32
            gap-8 lg:gap-0
            lg:max-w-110">
                <h4 className="text-4xl z-20">{name}</h4>
                <strong
                    className="text-3xl z-20">Inicio: {startDate.toString()} {endDate ? `, Finalización: ${endDate.toString()}` : " (EN CURSO)"}</strong>
                <p className="text-3xl z-20">{description}</p>
            </div>
            <div className="
            absolute bottom-0 right-0
            overflow-hidden
            w-full h-full
            block
            lg:h-80 lg:w-80 lg:rounded-tl-[8rem] lg:shadow lg:shadow-[rgba(0,0,0,.5)]
            ">
                <div className="absolute top-0 left-0 w-full h-full bg-secundario opacity-75 z-10 lg:hidden"></div>
                <img
                    className="absolute lg:static w-full h-full top-0 left-0 object-cover z-0"
                    alt={`Imagen del título de ${name}`}
                    src={imgUrl ? imgUrl : "https://helloartsy.com/wp-content/uploads/kids/school/how-to-draw-a-book/how-to-draw-a-book-step-6.jpg"}/>
            </div>
        </li>
    );
}