import { authAxiosClient } from "@/lib/axios";
import { User } from "@/types";
import { AxiosError } from "axios";
import { IProfileResponse } from "../types/user-response";

async function profileApi(
    token: string,
    callback: (error: AxiosError | null, result: User | null) => void
) {
    return await authAxiosClient
        .get<IProfileResponse>("/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((err) => {
            if (err.status === 200) {
                callback(null, err.data.data);
            }
        })
        .catch((error) => {
            callback(error, null);
        });
}

export { profileApi };
