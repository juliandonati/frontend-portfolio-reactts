import {type JSX} from "react";

import type {Portfolio, Presentation} from "../../types/Portfolio.ts";

import {Degree} from "../../components/portfolio/Degree/Degree.tsx";
import {Job} from "../../components/portfolio/Job/Job.tsx";
import {Skill} from "../../components/portfolio/Skill/Skill.tsx";
import {CloudinaryImage} from "../../components/misc/CloudinaryImage.tsx";


interface PortfolioViewProps {
    portfolio: Portfolio,
    username: string
}

export function PortfolioView({portfolio, username}: PortfolioViewProps): JSX.Element {
    const presentation = portfolio.presentation ? portfolio.presentation : {
        id: -1,
        name: username,
        title: 'Mi título',
        imgUrl: '',
        description: 'Aquí va mi descripción'
    } as Presentation;
    const aboutMe = portfolio.aboutMe;
    const degrees = portfolio.degrees;
    const jobs = portfolio.experience;
    const skills = portfolio.skills;
    return (
        <div className="
        flex flex-col w-full items-center
        gap-4
        md:w-2/3
        ">

            <div
                className="portfolio-section grid grid-rows-[1fr_1fr_5fr_2fr] w-full
                        justify-items-center text-center
                        h-[90vh]
                        md:h-[80vh]
                        2xl:h-[60vh]">
                <h3 className="portfolio-title">¡Hola, soy {presentation.name}!</h3>
                <p className="text-4xl">{presentation.title}</p>
                <div className="w-96 h-96 mx-auto overflow-hidden shadow-xl shadow-pink-500 rounded-full">
                    <CloudinaryImage
                        alt={`Imagen de ${presentation.name}`}
                        src={presentation.imgUrl ? presentation.imgUrl : "/default_pfp.jpg"}
                        className="object-cover"
                    />
                </div>
                <p className="portfolio-desc md:my-auto">{presentation.description}</p>
            </div>


            {
                aboutMe &&
                <div className="portfolio-section relative w-full h-100 overflow-hidden">
                    <div className="w-full h-100 absolute top-0 left-0">
                        <CloudinaryImage
                            className="absolute z-0 object-cover w-full h-full"
                            alt={`Fondo del AboutMe de ${presentation.name}`}
                            src={aboutMe.bgImgUrl ? aboutMe.bgImgUrl : "https://wallpaperaccess.com/full/2033886.jpg"}
                        />
                        <div className="absolute z-10 object-cover w-full h-full bg-secundario opacity-75"/>
                    </div>
                    <div className="
                    relative w-full h-full z-20 text-center
                    grid grid-rows-[1fr_2fr_1fr]
                    ">
                        <h3 className="portfolio-title">{aboutMe.title}</h3>
                        <p className="portfolio-desc m-auto">{aboutMe.description}</p>
                        {aboutMe.buttonText && aboutMe.buttonUrl &&
                            <a
                                className="btn-primario w-1/4 m-auto"
                                href={aboutMe.buttonUrl} target="_blank">{aboutMe.buttonText}</a>
                        }
                    </div>
                </div>
            }
            {
                degrees.length > 0 &&
                <div className="
                portfolio-section grid grid-rows-[10rem_40rem]
                ">
                    <h3 className="portfolio-title">Mi educación</h3>
                    <ul className="portfolio-card-list">
                        {degrees.map(degree => <Degree key={degree.id} name={degree.name}
                                                       startDate={degree.startDate}
                                                       endDate={degree.endDate} description={degree.description}
                                                       imgUrl={degree.imgUrl}/>)}
                    </ul>
                </div>
            }
            {
                jobs.length > 0 &&
                <div className="
                portfolio-section h-200 grid grid-rows[10rem_40rem]
                ">
                    <h3 className="portfolio-title">Mi experiencia</h3>
                    <ul className="portfolio-card-list">
                        {jobs.map(job => <Job key={job.id} name={job.name} description={job.description}
                                              startDate={job.startDate} endDate={job.endDate}
                                              position={job.position}/>)}
                    </ul>
                </div>
            }
            {
                skills.length > 0 &&
                <div className="portfolio-section grid grid-rows[10rem_40rem]">
                    <h3 className="portfolio-title">MIS HABILIDADES</h3>
                    <ul className="
                    px-8 my-16

                    flex flex-col gap-y-10

                    md:grid md:grid-cols-3 md:gap-y-20
                    ">
                        {skills.map(skill => <Skill key={skill.id} name={skill.name} description={skill.description}
                                                    imgUrl={skill.imgUrl} category={skill.category}
                                                    level={skill.level}/>)}
                    </ul>
                </div>
            }
        </div>
    );
}