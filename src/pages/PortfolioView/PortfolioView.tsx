import {type JSX, useEffect, useState} from "react";
import {getUserPortfolioByName} from "../../services/portfolioService.ts";

import {useParams} from "react-router-dom";
import type {Portfolio} from "../../types/Portfolio.ts";

import "./PortfolioView.css"
import {Degree} from "../../components/portfolio/Degree/Degree.tsx";
import {Job} from "../../components/portfolio/Job/Job.tsx";
import {Skill} from "../../components/portfolio/Skill/Skill.tsx";


interface PortfolioResult {
    error?: Error,
    portfolio?: Portfolio
}

export function PortfolioView(): JSX.Element {
    const [portfolioResult, setPortfolioResult] = useState<PortfolioResult>({error: undefined, portfolio: undefined});


    const {username} = useParams<string>();
    useEffect(() => {
        if (username)
            getUserPortfolioByName(username)
                .then(foundPortfolio => {
                    setPortfolioResult({error: undefined, portfolio: foundPortfolio});
                })
                .catch((error: Error) => {
                    setPortfolioResult({error: error, portfolio: undefined});
                }/*mostrar dialogo de error*/);
        else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPortfolioResult({error: new Error("Tienes que especificar el usuario de quien buscas el portafolio.")});
        }
    }, [username]);

    if (portfolioResult.portfolio) {
        const portfolio = portfolioResult.portfolio;
        const presentation = portfolio.presentation;
        const aboutMe = portfolio.aboutMe;
        const degrees = portfolio.degrees;
        const jobs = portfolio.experience;
        const skills = portfolio.skills;
        return (

                <div id="portfolio-view">
                    <div className="portfolio-presentation">
                        <h3>¡Hola, soy {presentation.name}!</h3>
                        <p className="portfolio-presentation-title">{presentation.title}</p>
                        <div className="img-container">
                            <img alt={`Imagen de ${presentation.name}`} src={presentation.imgUrl}/>
                        </div>
                        <p className="portfolio-presentation-desc">{presentation.description}</p>
                    </div>
                    <div className="portfolio-aboutme">
                        <div className="img-container">
                            <img alt={`Fondo del AboutMe de ${presentation.name}`} src={aboutMe.bgImgUrl ? aboutMe.bgImgUrl : "https://wallpaperaccess.com/full/2033886.jpg"}/>
                        </div>
                        <h3>{aboutMe.title}</h3>
                        <p className="portfolio-aboutme-desc">{aboutMe.description}</p>
                        <button className={!aboutMe.buttonText ? 'hidden' : 'portfolio-aboutme-button'} onClick={() => location.href = aboutMe.buttonUrl}>{aboutMe.buttonText}</button>
                    </div>
                    <div className={degrees.length == 0 ? "hidden" : "portfolio-education"}>
                        <h3>MÍS TÍTULOS</h3>
                        <ul>
                          {degrees.map(degree => <Degree key={degree.id} name={degree.name} startDate={degree.startDate} endDate={degree.endDate} description={degree.description} imgUrl={degree.imgUrl}/>)}
                        </ul>
                    </div>
                    <div className={jobs.length == 0 ? "hidden" : "portfolio-experience"}>
                        <h3>MI EXPERIENCIA</h3>
                        <ul>
                            {jobs.map(job => <Job key={job.id} name={job.name} description={job.description} startDate={job.startDate} endDate={job.endDate} position={job.position} />)}
                        </ul>
                    </div>
                    <div className={skills.length == 0 ? "hidden" : "portfolio-skills"}>
                        <h3>MIS HABILIDADES</h3>
                        <ul>
                            {skills.map(skill => <Skill key={skill.id} name={skill.name} description={skill.description} imgUrl={skill.imgUrl} category={skill.category} level={skill.level}/>)}
                        </ul>
                    </div>
                </div>
        );
    }
    else{
        if(portfolioResult.error)
            return(
                <>
                    <p>¡Lo sentimos! No pudimos cargar el portafolio que buscas. ERROR: {portfolioResult.error.message}</p>
                </>
            );
        else
            return(
                <>
                    <p>Cargando portafolio...</p>
                </>
            );
    }
}