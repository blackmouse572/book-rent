import { Icons } from "./icons";

function PageLoader() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Icons.loader className="w-5 h-5 mr-2 animate-spin ease-in-out text-primary" />
        </div>
    );
}

export default PageLoader;
