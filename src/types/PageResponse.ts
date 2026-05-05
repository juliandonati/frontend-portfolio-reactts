interface SortValues {
    empty : boolean,
    sorted : boolean,
    unsorted : boolean
}

export interface PageResponse<T>{
    totalElements : number,
    totalPages : number,
    first : boolean,
    last : boolean,
    size : number,
    content : T[],
    sort : SortValues,
    numberOfElements: number,
    pageable : {
        offset : number,
        sort : SortValues,
        paged : boolean,
        pageNumber : number,
        pageSize : number,
        unpaged : boolean
    },
    empty : boolean
}