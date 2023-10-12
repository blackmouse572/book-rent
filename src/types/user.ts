export interface User {
    _id: string;
    email: string;
    fullName: string;
    role: ROLE;
    username: string;
    blocked: boolean;
    address?: string | null;
    password?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ROLE {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    USER = "USER",
}
