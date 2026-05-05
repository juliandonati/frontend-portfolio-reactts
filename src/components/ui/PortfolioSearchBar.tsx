import './PortfolioSearchBar.css'

import {useState} from "react";
import {useDebounce, type ResetTimeout} from "../../hooks/useDebounce.ts";


import {getUserPageByName} from "../../services/userService.ts";
import type {User} from "../../types/User.ts";
import type {PageResponse} from "../../types/PageResponse.ts";


const searchDebounceTime = 500;


interface PortfolioResultProps{
    user: User
}

const PortfolioResultItem = ({user}: PortfolioResultProps) => {
    return (<li>
        {user.displayName} ({user.username})
    </li>);
}

function PortfolioSearchBar(){
    const [searchFilter,setSearchFilter] = useState('');
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
        <div className="PortfolioSearchBar">
            <input onChange={(e) => {
                const newSearchFilter = e.currentTarget.value;
                setSearchFilter(newSearchFilter);
                resetTimeout(newSearchFilter);
            }}
                   value={searchFilter} type="search" placeholder="Nombre del Portafolio"/>
            <ul>
                {searchResultList.map((user,index) => (<PortfolioResultItem key={index} user={user}/>))}
            </ul>
        </div>
    );
}

export default PortfolioSearchBar;