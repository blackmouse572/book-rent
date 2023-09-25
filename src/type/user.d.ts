export interface User {
    _id: string;
    email: string;
    fullName: string;
    role: string;
    username: string;
    blocked: boolean = false;
    address?: string | null;
    password?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
