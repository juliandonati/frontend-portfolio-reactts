import {EditTable} from "../../portfolio/EditTable.tsx";
import type {Job} from "../../../types/Portfolio.ts";
import type {EditSectionProps} from "../../../pages/PortfolioEdit/PortfolioEdit.tsx";
import {useNavigate} from "react-router-dom";

export default function ExperienceEditSection({portfolioComponent,username,showError}:EditSectionProps){
    const navigate = useNavigate();
    const jobs = portfolioComponent as Job[] || [];

    return (
        <div className="portfolio-edit-section">
            <h3 className="portfolio-title">Mi experiencia laboral</h3>
            {jobs.length > 0 ?
                <EditTable<Job> tableHeaders={['ID', 'EMPRESA', 'CARGO', 'DESC', 'INICIO', 'FIN']}
                                data={jobs} itemName={'experience'} showErrorCallback={showError}/>
                : <p className="mx-auto text-3xl">No has subido ningún trabajo</p>}
            <button
                onClick={() => navigate(`/u/${username}/create/experience`)}
                className="btn-primario mx-auto">DOCUMENTAR TRABAJO
            </button>
        </div>
    );
}