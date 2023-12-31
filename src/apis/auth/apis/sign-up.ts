import { AxiosError } from "axios";
import { z } from "zod";
import { axiosClient } from "../../../lib/axios";
import { RegisterSchema } from "../../../pages/(auth)/register/validation";
import { IErrorResponse } from "../../../types";
type ISignup = z.infer<typeof RegisterSchema>;
async function signUpApi(
    data: ISignup,
    callback: (error: AxiosError<IErrorResponse> | null) => void
) {
    return await axiosClient
        .post("/auth/sign-up", {
            ...data,
        })
        .then((err) => {
            if (err.status === 200) {
                callback(null);
            }
        })
        .catch((error) => {
            callback(error);
        });
}

export { signUpApi };
