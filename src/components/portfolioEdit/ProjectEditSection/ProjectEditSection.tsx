import type {EditSectionProps} from "../../../pages/PortfolioEdit/PortfolioEdit.tsx";
import {EditTable} from "../../portfolio/EditTable.tsx";
import type {Project} from "../../../types/Portfolio.ts";
import {useNavigate} from "react-router-dom";

export default function ProjectEditSection({portfolioComponent,username,showError}:EditSectionProps){
    const navigate = useNavigate();
    const projects = portfolioComponent as Project[] || [];

    return (
        <div className="portfolio-edit-section">
            <h3 className="portfolio-title">Mis proyectos</h3>
            {projects.length > 0 ?
                <EditTable<Project> tableHeaders={['ID', 'NOMBRE', 'DESC', 'FECHA INICIO', 'FECHA FIN','URL', 'IMAGEN']}
                                  data={projects} itemName={'projects'} showErrorCallback={showError}/>
                : <p className="mx-auto text-3xl">No has subido ningun proyecto</p>
            }
            <button
                onClick={() => navigate(`/u/${username}/create/projects`)}
                className="btn-primario mx-auto">DOCUMENTAR PROYECTO
            </button>
        </div>
    );
}