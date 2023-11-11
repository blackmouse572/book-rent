import { authAxiosClient } from "@/lib/axios";
import { IDefaultQuery } from "@/types";

export function getAllTransactionAdmin(params: Partial<IDefaultQuery>) {
    return authAxiosClient
        .get("/transaction/admin/list", { params })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function getAllTransactionUser(params: Partial<IDefaultQuery>) {
    return authAxiosClient
        .get("/transaction/me/list", { params })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}
