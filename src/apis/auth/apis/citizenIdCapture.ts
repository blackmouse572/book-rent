import { ICitizenReponse } from "@/types";
import axios, { AxiosResponse } from "axios";

export async function citizenIdCaptureApi<T>(formData: FormData) {
    return axios
        .post<unknown, AxiosResponse<ICitizenReponse<T>>>(
            "https://api.fpt.ai/vision/idr/vnm/",
            formData,
            {
                headers: {
                    "api-key": "JpsQUu3EKxNLNSFxzIzG1Vk6dLpPnLaP",
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then((res) => res.data);
}
