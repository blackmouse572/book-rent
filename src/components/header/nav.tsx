import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import AuthPreview from "../AuthPreview";

export default function NavBar() {
    return (
        <nav className="container navbar flex flex-row items-center justify-between bg-background/70 backdrop-blur-sm border-b border-accent sticky top-0 h-16">
            <div className="flex items-center">
                <Icons.questionMark />
                <span>Can we help you?</span>
                <span className="ml-5">+1 246-345-0695</span>
            </div>
            <ul className="navbar__links flex space-x-4 items-center">
                <li>
                    <Link
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                            }),
                            "px-2"
                        )}
                        to="#"
                    >
                        <Icons.bell />
                    </Link>
                </li>
                {/* <li>
                        <a className='' href='#'>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </a>
                    </li> */}
                <li>
                    <AuthPreview />
                </li>
            </ul>
        </nav>
    );
}
