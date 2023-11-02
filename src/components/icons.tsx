import { IconProps } from "@radix-ui/react-icons/dist/types";
import {
    IconBell,
    IconBook2,
    IconBookmarkQuestion,
    IconBrandDiscord,
    IconBrandDribbble,
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandGoogleHome,
    IconBrandTwitter,
    IconCategory,
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconDashboard,
    IconGardenCart,
    IconLoader2,
    IconLogout,
    IconMoodEmptyFilled,
    IconPlus,
    IconQuestionMark,
    IconSearch,
    IconSmartHome,
    IconSquareRoundedXFilled,
    IconStarFilled,
    IconStarOff,
    IconTruckDelivery,
    IconUser,
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
    truckDelivery: IconTruckDelivery,
    smartHome: IconSmartHome,
    starFilled: IconStarFilled,
    starEmpty: IconStarOff,
    search: IconSearch,
    bell: IconBell,
    user: IconUser,
    question: IconQuestionMark,
    cart: IconGardenCart,
    fb: IconBrandFacebook,
    disc: IconBrandDiscord,
    tw: IconBrandTwitter,
    git: IconBrandGithub,
    dribble: IconBrandDribbble,
    questionMark: IconBookmarkQuestion,
    sidebar: (props: IconProps) => (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    ),
};
