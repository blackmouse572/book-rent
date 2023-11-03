import { Icons } from "@/components/icons";
import AuthPreview from "../AuthPreview";

export default function NavBar() {
    return (
        <nav className="px-32 navbar flex flex-row items-center justify-between bg-background/70 backdrop-blur-md border-b border-accent sticky top-0 h-16 z-50">
            <div className="flex items-center">
                <Icons.questionMark />
                <span>Can we help you?</span>
                <span className="ml-5">+1 246-345-0695</span>
            </div>
            <ul className="navbar__links flex space-x-4 items-center">
                <AuthPreview />
            </ul>
        </nav>
    );
}
