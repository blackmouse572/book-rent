import { axiosClient } from "@/lib/axios";
import { LoginSchema } from "@/pages/(auth)/login/validation";
import { AxiosError } from "axios";
import { z } from "zod";
import { ITokenReponse } from "../types/token";

type ILoginSchema = z.infer<typeof LoginSchema>;
async function loginApi(
  { userNameOrEmail: email, password }: ILoginSchema,
  callback: (error: AxiosError | null, result: string | null) => any
) {
  return await axiosClient
    .post<ITokenReponse>("/auth/login", {
      usernameOrEmail: email,
      password: password,
    })
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data.data.accessToken);
      }
    })
    .catch((error) => {
      callback(error, null);
    });
}

export { loginApi };
