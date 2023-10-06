import { axiosClient } from "@/lib/axios";
import { ITokenReponse } from "../types/token";
import { IErrorResponse, IResponse } from "@/type";

export default async function revokeRefreshToken() {
    return axiosClient.post<IErrorResponse, IResponse<ITokenReponse>>(
        "/auth/refresh",
        {},
        {
            withCredentials: true,
        }
    );
}
