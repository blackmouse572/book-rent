import { IResponse } from "@/type";

export type IToken = {
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
};
export type ITokenReponse = IResponse<IToken>;
