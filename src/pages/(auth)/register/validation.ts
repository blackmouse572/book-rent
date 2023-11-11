import * as z from "zod";
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 8 characters, 1 uppercase, 1 lowercase, 1 number
export const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

export enum ENUM_CITIZEN_ID_TYPE {
    OLD = "old",
    NEW = "new",
    CCCD_CHIP_NEW = "cccd_chip_front",
    OLD_BACK = "old_back",
    NEW_BACK = "new_back",
    CHIP_FRONT = "chip_front",
    CHIP_BACK = "chip_back",
    CCCD_CHIP_NEW_BACK = "cccd_chip_back",
}

export const RegisterSchema = z
    .object({
        email: z.string().email(),
        username: z.string().min(6),
        phone: z.string().regex(phoneRegex, {
            message: "Invalid phone number",
        }),
        password: z
            .string()
            .min(8)
            .regex(
                passwordRegex,
                "Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number"
            ),
        confirmPassword: z.string().min(8),
        fullName: z.string(),
        citizenId: z.string().min(9).max(12),
        citizenIdType: z.nativeEnum(ENUM_CITIZEN_ID_TYPE),
        citizenIdIssueDate: z.date(),
        citizenIdPlaceOfIssue: z.string(),
        citizenIdDateOfBirth: z.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    });
