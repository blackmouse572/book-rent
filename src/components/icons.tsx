import { IconProps } from "@radix-ui/react-icons/dist/types";
import {
    IconArrowLeft,
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
    IconDiscountCheckFilled,
    IconGardenCart,
    IconLoader2,
    IconLogout,
    IconMoodEmptyFilled,
    IconMoodSadSquint,
    IconPlus,
    IconQuestionMark,
    IconSearch,
    IconSmartHome,
    IconSquareRoundedPlus,
    IconSquareRoundedXFilled,
    IconStarFilled,
    IconStarOff,
    IconTruckDelivery,
    IconTruckLoading,
    IconUser,
    IconVocabulary,
    IconX,
    type Icon as TablerIcons,
} from "@tabler/icons-react";

export type Icon = TablerIcons;

export const Icons = {
    logo: IconVocabulary,
    close: IconX,
    book: IconBook2,
    category: IconCategory,
    dashboard: IconDashboard,
    arrowLeft: IconArrowLeft,
    discountCheckFilled: IconDiscountCheckFilled,
    addRound: IconSquareRoundedPlus,
    moodSadSquint: IconMoodSadSquint,
    truckLoading: IconTruckLoading,
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
    done: IconDiscountCheckFilled,
    fail: IconMoodSadSquint,
    loading: IconTruckLoading,
};
