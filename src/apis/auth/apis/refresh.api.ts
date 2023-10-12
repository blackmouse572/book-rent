import { axiosClient } from "@/lib/axios";
import { IErrorResponse, IResponse } from "@/types";
import { ITokenReponse } from "../types/token";

export default async function revokeRefreshToken() {
    return axiosClient.post<IErrorResponse, IResponse<ITokenReponse>>(
        "/auth/refresh",
        {},
        {
            withCredentials: true,
        }
    );
}
