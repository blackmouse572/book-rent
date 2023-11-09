import { ICategory } from "@/types/category";
import { axiosClient } from "../../lib/axios";

export function getAllCategories(): Promise<ICategory[]> {
    return axiosClient.get("/category/", {}).then((res) => res.data);
}
