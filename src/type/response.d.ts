export type IResponse<T> = {
    data: T;
    _metadata?: T | undefined;
};

export type IErrorResponse = {
    message: string;
};
