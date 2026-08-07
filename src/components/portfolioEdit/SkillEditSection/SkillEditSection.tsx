import type {EditSectionProps} from "../../../pages/PortfolioEdit/PortfolioEdit.tsx";
import {EditTable} from "../../portfolio/EditTable.tsx";
import type {Skill} from "../../../types/Portfolio.ts";
import {useNavigate} from "react-router-dom";

export default function SkillEditSection({portfolioComponent,username,showError}:EditSectionProps){
    const navigate = useNavigate();
    const skills = portfolioComponent as Skill[] || [];

    return (
        <div className="portfolio-edit-section">
            <h3 className="portfolio-title">Mis habilidades</h3>
            {skills.length > 0 ?
                <EditTable<Skill> tableHeaders={['ID', 'NOMBRE', 'DESC', 'NIVEL', 'IMAGEN', 'CATEGORIA']}
                                  data={skills} itemName={'skills'} showErrorCallback={showError}/>
                : <p className="mx-auto text-3xl">No has subido ninguna habilidad</p>
            }
            <button
                onClick={() => navigate(`/u/${username}/create/skills`)}
                className="btn-primario mx-auto">DOCUMENTAR HABILIDAD
            </button>
        </div>
    );
}