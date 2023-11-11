import { ENUM_CITIZEN_ID_TYPE } from "@/pages/(auth)/register/validation";

export interface User {
    _id?: string;
    email: string;
    fullName: string;
    role?: "ADMIN" | "SUPER_ADMIN" | "USER";
    phone: string;
    avatar?: string;
    address?: string | null;
    username: string;
    password: string;
    passwordAttempt?: number;
    blocked?: boolean;
    blockedDate?: Date;
    salt?: string;
    citizenId?: string;
    citizenIdType?: "old"
    | "new"
    | "cccd_chip_front"
    | "old_back"
    | "new_back"
    | "chip_front"
    | "chip_back"
    | "cccd_chip_back";
    citizenIdIssueDate?: Date;
    citizenIdPlaceOfIssue?: string;
    citizenIdDateOfBirth?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ROLE {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    USER = "USER",
}

export interface ICitizenReponse<T = ICitizenFrontSide | ICitizenBackSide> {
    errorCode: number;
    errorMessage: string;
    data: T[];
}

export interface ICitizenFrontSide {
    id: string;
    id_prob: string;
    name: string;
    name_prob: string;
    dob: string;
    dob_prob: string;
    sex: string;
    sex_prob: string;
    nationality: string;
    nationality_prob: string;
    home: string;
    home_prob: string;
    address: string;
    address_prob: string;
    address_entities: AddressEntities;
    doe: string;
    doe_prob: string;
    type: ENUM_CITIZEN_ID_TYPE;
    type_new?: ENUM_CITIZEN_ID_TYPE;
}

export interface AddressEntities {
    province: string;
    district: string;
    ward: string;
    street: string;
}
export interface ICitizenBackSide {
    religion_prob: string;
    religion: string;
    ethnicity_prob: string;
    ethnicity: string;
    features: string;
    features_prob: string;
    issue_date: string;
    issue_date_prob: string;
    issue_loc_prob: string;
    issue_loc: string;
    type: ENUM_CITIZEN_ID_TYPE;
}
