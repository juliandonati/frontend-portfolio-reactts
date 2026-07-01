import {useState} from "react";
import {useDebounce, type ResetTimeout} from "../../hooks/useDebounce.ts";


import {getUserPageByName} from "../../services/userService.ts";
import type {User} from "../../types/User.ts";
import type {PageResponse} from "../../types/PageResponse.ts";
import {useNavigate} from "react-router-dom";


const searchDebounceTime = 500;


interface PortfolioResultProps{
    user: User
}

const PortfolioResultItem = ({user}: PortfolioResultProps) => {
    const navigate = useNavigate();

    return (<li
        className="
        h-12 w-full
        text-2xl
        border-black border-2 border-t-0

        flex gap-5
        items-center

        bg-white
        hover:bg-blue-300 cursor-pointer select-none
        "

        onClick={() => navigate(`/u/${user.username}/view`)}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>{user.displayName} ({user.username})</p>
    </li>);
}

function PortfolioSearchBar() {
    const [searchFilter, setSearchFilter] = useState('');
    const [searchResultList, setSearchResultList] = useState<User[]>([]);
    const resetTimeout : ResetTimeout = useDebounce(searchFor,searchDebounceTime);

    function searchFor(newSearchFilter : string): void{
        if(newSearchFilter.trim() != '')
            getUserPageByName(newSearchFilter)
                .then((userPage : PageResponse<User>) => setSearchResultList(userPage.content))
        else
            setSearchResultList([]);
    }

    return(
        <div className="w-full font-sans">
            <input
                className="1
                w-full h-1/3 text-2xl
                border-2 border-black rounded-2xl
                bg-white
                focus:bg-blue-100 focus:border-blue-300 focus:outline-none
                "

                onChange={(e) => {
                const newSearchFilter = e.currentTarget.value;
                setSearchFilter(newSearchFilter);
                resetTimeout(newSearchFilter);
            }}
                   value={searchFilter} type="search" placeholder="Nombre del Portafolio"/>
            <ul className="
            w-full
            h-2/3 overflow-y-scroll
            scrollbar-none
            ">
                {searchResultList.map((user,index) => (<PortfolioResultItem key={index} user={user}/>))}
            </ul>
        </div>
    );
}

export default PortfolioSearchBar;