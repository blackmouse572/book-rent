import { axiosClient } from "@/lib/axios";
import { AxiosError } from "axios";
import { ITokenReponse } from "../types/token";
import { IProfileResponse } from "../types/user-response";
import { User } from "@/type";

async function profileApi(
  token: string,
  callback: (error: AxiosError | null, result: User | null) => any
) {
  return await axiosClient
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
