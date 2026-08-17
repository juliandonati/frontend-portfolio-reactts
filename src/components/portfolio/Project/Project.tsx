import {CloudinaryImage} from "../../misc/CloudinaryImage.tsx";

interface ProjectProps{
    title:string;
    description:string;
    startDate:Date;
    endDate?:Date;
    url?:string;
    imgUrl?:string;
}
export default function Project({title,description,startDate,endDate,url,imgUrl}:ProjectProps){

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
        w-9/10 h-120 p-4 lg:w-5/6 lg:p-0
        rounded-2xl lg:rounded-t-[8rem]
        lg:grid lg:grid-cols-[2fr_1fr]
        ">
            <div className="
            grid grid-rows-4 mx-auto p-8 font-sans
            lg:relative lg:left-32
            gap-8 lg:gap-0
            lg:max-w-110">
                <h4 className="text-4xl underline z-20">{title}</h4>
                <strong
                    className="text-3xl z-20">Inicio: {startDate.toString()} {endDate ? `, Finalización: ${endDate.toString()}` : " (EN DESARROLLO)"}</strong>
                <p className="text-3xl z-20">{description}</p>
                <a className="text-3xl mx-auto z-20 btn-terciario" href={url} target="_blank">VISITAR</a>
            </div>
            <div className="
            absolute inset-0
            overflow-hidden
            w-full h-full
            block
            ">
                <div className="absolute inset-0 bg-secundario opacity-75 z-10"></div>
                <CloudinaryImage className="absolute lg:static w-full h-full top-0 left-0 object-cover z-0"
                                 alt={`Imagen del título de ${title}`}
                                 src={imgUrl ? imgUrl : "https://helloartsy.com/wp-content/uploads/kids/school/how-to-draw-a-book/how-to-draw-a-book-step-6.jpg"}
                />
            </div>
        </li>
    );
}