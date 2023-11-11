export interface ICategory {
    _id?: string;
    name: string;
    status?: "ENABLE" | "DISABLE";
    description: string;
}

export enum STATUS {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
}