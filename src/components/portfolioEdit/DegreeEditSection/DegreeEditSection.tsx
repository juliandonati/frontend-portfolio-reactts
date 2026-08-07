import {EditTable} from "../../portfolio/EditTable.tsx";
import type {Degree} from "../../../types/Portfolio.ts";
import type {EditSectionProps} from "../../../pages/PortfolioEdit/PortfolioEdit.tsx";
import {useNavigate} from "react-router-dom";

export default function DegreeEditSection({portfolioComponent,username,showError}:EditSectionProps){
    const navigate = useNavigate();
    const degrees = portfolioComponent as Degree[] || [];

    return (
        <div className="portfolio-edit-section">
            <h3 className="portfolio-title">Mis títulos académicos</h3>
            {degrees.length > 0 ?
                <EditTable<Degree> tableHeaders={['ID', 'NOMBRE', 'DESC', 'INICIO', 'FIN', 'IMAGEN']}
                                   data={degrees} itemName={'degrees'} showErrorCallback={showError}/>
                : <p className="mx-auto text-3xl">No has subido ningún título académico</p>}
            <button
                onClick={() => navigate(`/u/${username}/create/degrees`)}
                className="btn-primario mx-auto">DOCUMENTAR TÍTULO ACADÉMICO
            </button>
        </div>
    );
}