import "@/index.css";
// import AuthPreview from '../AuthPreview';
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../icons";
import { Input } from "../ui/input";
function Header() {
    const nav = useNavigate();
    const onSubmit = useCallback(
        (e: React.SyntheticEvent) => {
            console.log("sbumt");
            e.preventDefault();
            const target = e.target as typeof e.target & {
                search: { value: string };
            };
            nav(`/books?search=${target.search.value}`);
        },
        [nav]
    );
    return (
        <header>
            <div className="navbar-wrapper container-wrapper">
                <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
            </div>
            <div className="flex items-center pl-0">
                <div className="bg-white-500 flex h-24 w-full items-center justify-around">
                    <div className="logo">
                        <Link
                            to={"/"}
                            className="text-black-100 cursor-pointer text-3xl font-extrabold xs:text-2xl"
                        >
                            BRental
                        </Link>
                    </div>
                    <nav className="w-1/2 xs:hidden">
                        <div className="flex items-center justify-evenly">
                            <Link
                                to="/"
                                className="hover:underline underline-offset-2"
                            >
                                Home
                            </Link>
                            <Link
                                to="/books"
                                className="hover:underline underline-offset-2"
                            >
                                Books
                            </Link>
                            <Link
                                to="/policy"
                                className="hover:underline underline-offset-2"
                            >
                                About Us
                            </Link>
                        </div>
                    </nav>
                    <form onSubmit={onSubmit}>
                        <label
                            htmlFor="default-search"
                            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Search
                        </label>
                        <div className="flex flex-row items-center">
                            <Icons.search className="mr-1" size={16} />
                            <Input
                                className="w-72"
                                name={"search"}
                                placeholder="Search by Keyword"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default Header;
