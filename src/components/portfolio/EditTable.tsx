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


    const turnValueIntoString = (itemValue): string => {
        if (itemValue)
            return itemValue.toString();

        return 'N/A';
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
                {data.map((item: T) =>
                    <tr>
                        {Object.values(item as Record<string, any>).map((value) =>
                            <td>{turnValueIntoString(value)}</td>
                        )}
                        <td>
                            <ul className="grid grid-cols-2 px-4 gap-8">
                                <li onClick={() =>
                                    navigate(`/${itemName}/${item.id}/edit`,{
                                        state:item
                                    })}>
                                    <i title="Editar" className="fa fa-edit text-yellow-500 text-shadow-md text-shadow-black cursor-pointer select-none"/></li>
                                <li onClick={() => deleteItem(item.id)}>
                                    <i title="Eliminar" className="fa fa-trash text-red-700 text-shadow-md text-shadow-black cursor-pointer select-none"/></li>
                            </ul>
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );
}