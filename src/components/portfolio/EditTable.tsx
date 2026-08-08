import type {JSX} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {API_BASE_URL} from "../../services/apiConfig.ts";

interface EditTableProps<T extends PortfolioItem> {
    tableHeaders: string[],
    data: T[],
    itemName: string,
    showErrorCallback: (error: string) => void
}

interface PortfolioItem {
    id: number;
}

export function EditTable<T extends PortfolioItem>({
                                                       tableHeaders,
                                                       data,
                                                       itemName,
                                                       showErrorCallback
                                                   }: EditTableProps<T>): JSX.Element {
    const navigate = useNavigate();
    const [cookies, ,] = useCookies(['accessToken']);

    const fetchHeaders: Record<string, string> = {
        'Authorization': `Bearer ${cookies.accessToken}`
    };
    const deleteItem = (itemId: number) => {
        fetch(`${API_BASE_URL}/${itemName}/${itemId}`, {
            headers: fetchHeaders,
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Item eliminado con éxito")
                    location.reload();
                } else
                    showErrorCallback(response.statusText);
            })
            .catch((error: Error) => showErrorCallback(error.message));
    }

    return (
        <div className="w-5/6 mx-auto overflow-x-auto scrollbar-thumb-primario">
            <table className="portfolio-edit-table">
                <thead>
                <tr>
                    {tableHeaders.map((header) => <th>{header}</th>)}
                    <th>ACCIONES</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item:T) =>
                    <tr className="h-20 lg:h-30">
                        {Object.values(item as Record<string, unknown>).map((value) => {
                                const valueAsString = value ? (typeof value === 'string' ? value : String(value)) : 'N/A';

                                const isImageUrl:boolean = valueAsString.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) != null || valueAsString.startsWith('blob:');

                                return (
                                    <td className="h-full text-center">
                                        {!isImageUrl ? (<p>{valueAsString}</p>) : (<img className="object-fit w-30 h-30 mx-auto" src={valueAsString} alt="Imagen"/>)}
                                    </td>);
                            }
                        )}
                        <td className="h-full">
                            <ul className="grid grid-cols-2 text-center gap-8 lg:gap-0">
                                <li onClick={() =>
                                    navigate(`/item/${itemName}/${item.id}/edit`, {
                                        state: item
                                    })}>
                                    <i title="Editar"
                                       className="fa fa-edit text-yellow-500 text-shadow-md text-shadow-black cursor-pointer select-none text-3xl lg:text-5xl"/>
                                </li>
                                <li onClick={() => deleteItem(item.id)}>
                                    <i title="Eliminar"
                                       className="fa fa-trash text-red-700 text-shadow-md text-shadow-black cursor-pointer select-non text-3xl lg:text-5xl"/>
                                </li>
                            </ul>
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );
}