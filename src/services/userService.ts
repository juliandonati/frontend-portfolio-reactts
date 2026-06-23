import type {PageResponse} from "../types/PageResponse.ts";
import type {User} from "../types/User.ts";

import {API_BASE_URL} from "./apiConfig.ts";
const API_USERS_URL = API_BASE_URL + '/users';

export async function getUserPageByName(name : string): Promise<PageResponse<User>>{
    const response = await fetch(`${API_USERS_URL}?name=${name}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}

