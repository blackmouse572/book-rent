import { Separator } from "@/components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";
import AuthPreview from "@/components/AuthPreview";
import { Link } from 'react-router-dom';

function HomePage() {
    const showToast = (
        variant: "default" | "destructive" | "success" | "warning"
    ) => {
        toast({
            title: variant,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            variant,
        });
    };
    return (
        <div className="container h-screen flex-col  flex gap-8 justify-center items-cente">
            <div className=" flex gap-3 justify-center items-center">
                <Button>Primary</Button>
                <Button variant={"ghost"}>Ghost</Button>
                <Button variant={"link"}>Link</Button>
                <Button variant={"outline"}>Outline</Button>
                <Button variant={"secondary"}>Secondary</Button>
            </div>
            <div className="max-w-sm flex gap-3 justify-center items-center mx-auto">
                <Label htmlFor="test">Test</Label>
                <Input id="test" />
            </div>
            <div className=" flex gap-3 justify-center items-center">
                <Button onClick={() => showToast("default")}>
                    Default Toast
                </Button>
                <Button onClick={() => showToast("warning")} colors="warning">
                    Warning Toast
                </Button>
                <Button
                    onClick={() => showToast("destructive")}
                    colors="destructive"
                >
                    Destructive Toast
                </Button>
                <Button onClick={() => showToast("success")} colors="success">
                    Success Toast
                </Button>
            </div>
            <div className=" flex gap-3 justify-center items-center">
                <Badge>
                    <span>Default</span>
                </Badge>
                <Badge isPressable>Presable</Badge>
                <Badge variant={"outline"}>
                    <span>Outline</span>
                </Badge>
                <Badge colors={"secondary"}>
                    <span>Secondary</span>
                </Badge>
                <Badge isPressable colors={"warning"}>
                    Presable warning
                </Badge>
                <Badge variant={"outline"} colors={"destructive"}>
                    <span>Destructive</span>
                </Badge>
            </div>
            <Separator />
            <AuthPreview />
            <Link to="/sidebar">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sidebar
      </button>
    </Link>
       
        </div>
    );
}

export default HomePage;
