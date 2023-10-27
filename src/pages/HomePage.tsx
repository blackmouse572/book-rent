import AuthPreview from "@/components/AuthPreview";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge/badge";
import { Button } from "../components/ui/button/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";





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
                <Link to={"/admin/user"}>
                    <Button variant={"ghost"}>(Admin) User manager</Button>
                </Link>
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
     
           
        </div>
    );
}

export default HomePage;