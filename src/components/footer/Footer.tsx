import { Link } from "react-router-dom";
import { Icons } from "../icons";

const B = [
    { id: 1, title: "About Us", path: "/aboutus" },
    { id: 2, title: "Sitemap", path: "/map" },
    { id: 3, title: "Bookmarks", path: "/book-mark" },
    { id: 4, title: "Sign in/Join", path: "/join" },
];

const C = [
    { id: 1, title: "Help Center", path: "/help-center" },
    { id: 2, title: "Product Recalls", path: "/product" },
    { id: 3, title: "Accessibility", path: "/access" },
    { id: 4, title: "Contact Us", path: "/contact" },
    { id: 5, title: "Store Pickup", path: "/store" },
];

const D = [
    { id: 1, title: "Return Policy", path: "/#" },
    { id: 2, title: "Terms Of Use", path: "/#" },
    { id: 3, title: "Security", path: "/#" },
    { id: 4, title: "Pricavy", path: "/#" },
];

const E = [
    { id: 1, title: "Drama", path: "/books?genre=drama" },
    { id: 2, title: "Horror", path: "/books?genre=horror" },
    { id: 3, title: "Kids", path: "/books?genre=kids" },
    { id: 4, title: "Romantic", path: "/books?genre=romantic" },
    { id: 5, title: "Comedy", path: "/books?genre=comedy" },
];

const I = [
    {
        id: 1,
        title: "123 Nam Ki Khoi Nghia, Ngu Hanh Son, Da Nang, Viet Nam",
        path: "/#",
    },
    { id: 2, title: "BRental@gmail.com", path: "/#" },
    { id: 3, title: "+1 234-567-789", path: "/#" },
];
const A = ({
    items,
}: {
    items: Array<{ id: number; title: string; path: string }>;
}) => {
    return (
        <ul className="text-gray-500 font-medium text-left">
            {items.map((item) => (
                <li key={item.id} className="mb-4">
                    <Link to={item.path} className="hover:text-white">
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const categories: Category[] = [
    { title: "Explore", items: B },
    { title: "Customer Service", items: C },
    { title: "Policy", items: D },
    { title: "Categories", items: E },
];

type Category = {
    title: string;
    items: Array<{ id: number; title: string; path: string }>; // Thay thế kiểu dữ liệu bằng kiểu dữ liệu chính xác của mảng items.
};

const renderCategory = (category: Category) => (
    <div key={category.title}>
        <h2 className="mb-12 text-sm font-semibold uppercase text-white">
            {category.title}
        </h2>
        <A items={category.items} />
    </div>
);

type SocialLink = {
    label: string;
    icon: JSX.Element;
    url: string;
};

const socialLinks: SocialLink[] = [
    { label: "Facebook page", icon: <Icons.fb size={25} />, url: "#" },
    { label: "Discord community", icon: <Icons.disc size={25} />, url: "#" },
    { label: "Twitter page", icon: <Icons.tw size={25} />, url: "#" },
    { label: "GitHub account", icon: <Icons.git size={25} />, url: "#" },
    { label: "Dribbble account", icon: <Icons.dribble size={25} />, url: "#" },
];

const renderSocialLink = (link: SocialLink) => (
    <a
        key={link.label}
        href={link.url}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
    >
        {link.icon}
        <span className="sr-only">{link.label}</span>
    </a>
);

export default function Footer() {
    return (
        <footer className="bg-black dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center m-4">
                            <span className="self-center text-5xl font-extrabold whitespace-nowrap text-white">
                                BRental
                            </span>
                        </Link>
                        <div className="mt-9 text-center">
                            <A items={I} />
                        </div>
                    </div>
                    <div className="mx-auto py-4 w-full max-w-screen-xl">
                        <div className="grid grid-cols-2 gap-8 px-4 py-4 lg:py-8 md:grid-cols-4">
                            {categories.map(renderCategory)}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
            <div>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023{" "}
                        <a href="#" className="hover:text-white">
                            BRental™
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        {socialLinks.map(renderSocialLink)}
                    </div>
                </div>
            </div>
        </footer>
    );
}
