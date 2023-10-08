import {
    IconBrandGoogleHome,
    IconCheck,
    IconLoader2,
    IconLogout,
    IconMoodEmptyFilled,
    IconPlus,
    IconSquareRoundedXFilled,
    IconVocabulary,
    IconX,
    type Icon as TablerIcons,
} from "@tabler/icons-react";

export type Icon = TablerIcons;

export const Icons = {
    logo: IconVocabulary,
    close: IconX,
    squareClose: IconSquareRoundedXFilled,
    home: IconBrandGoogleHome,
    signOut: IconLogout,
    loader: IconLoader2,
    emptyFilled: IconMoodEmptyFilled,
    plus: IconPlus,
    check: IconCheck,
};
