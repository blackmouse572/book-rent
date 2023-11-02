import "@/index.css";
import "@/index.css";
// import AuthPreview from '../AuthPreview';
import { Input } from "../ui/input";
import { Icons } from "../icons";
import ShoppingCart from "@/components/cart/cart";
function Header() {
    return (
        <header>
            <div className="navbar-wrapper container-wrapper">
                <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
            </div>

            <div className="flex items-center pl-0">
                <div className="bg-white-500 flex h-24 w-full items-center justify-around">
                    <div className="logo">
                        <h1 className="text-black-100 cursor-pointer text-3xl font-extrabold xs:text-2xl">
                            BRental
                        </h1>
                    </div>
                    <nav className="w-1/2 xs:hidden">
                        <div className="flex items-center justify-evenly">
                            <a href="#" className="active">
                                Home
                            </a>
                            <a href="#">Category</a>
                            <a href="#">About Us</a>
                        </div>
                        <div className="flex items-center pl-0">
                            <div className="bg-white-500 flex h-24 w-full items-center justify-around">
                                <div className="logo">
                                    <h1 className="text-black-100 cursor-pointer text-3xl font-extrabold xs:text-2xl">
                                        BRental
                                    </h1>
                                </div>
                                <nav className="w-1/2 xs:hidden">
                                    <div className="flex items-center justify-evenly">
                                        <a href="#" className="active">
                                            Home
                                        </a>
                                        <a href="#">Category</a>
                                        <a href="#">About Us</a>
                                    </div>
                                </nav>
                                <form>
                                    <label
                                        htmlFor="default-search"
                                        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Search
                                    </label>
                                    <div className="flex flex-row items-center">
                                        <Icons.search
                                            className="m-1"
                                            size={25}
                                        />
                                        <Input
                                            className="w-72"
                                            placeholder="Search by Keyword"
                                        />
                                    </div>
                                </form>
                                <ShoppingCart />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
