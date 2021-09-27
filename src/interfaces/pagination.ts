export interface IPaginationResponseSettings {
    page: number;
    pageSize: number;
    sortDirection: "asc" | "desc";
    sortField: string;
    count: number;
}

export interface IPaginationRequestSettings {
    page?: number;
    pageSize?: number;
    sortDirection?: "asc" | "desc";
    sortField?: string;
}

export interface IPaginatedResponse<T> {
    list: Array<T>;
    pagination: IPaginationResponseSettings;
}
