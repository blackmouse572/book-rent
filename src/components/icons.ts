import {
    IconBrandGoogleHome,
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconLoader2,
    IconLogout,
    IconMoodEmptyFilled,
    IconPlus,
    IconSquareRoundedXFilled,
    IconStarFilled,
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
    chevronLeft: IconChevronLeft,
    chevronRight: IconChevronRight,
    star: IconStarFilled,
};
