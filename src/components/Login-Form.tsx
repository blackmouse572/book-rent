import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGithubFilled, IconBrandGoogle } from "@tabler/icons-react";
import React from "react";

import { loginApi } from "@/apis/auth/apis/login.api";
import { profileApi } from "@/apis/auth/apis/profile.api";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { IToken } from "../apis/auth/types/token";
import { LoginSchema } from "../pages/(auth)/login/validation";
import { Checkbox } from "./ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button/button";

type FormData = z.infer<typeof LoginSchema>;
function LoginForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            remember: false,
        },
    });
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);
    const { login } = useAuth();
    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        let token: IToken;
        let error: AxiosError | null = null;
        await loginApi(data, (err, data) => {
            if (err) {
                error = err;
                return;
            } else {
                toast({
                    title: "Login Success",
                    variant: "success",
                });
                token = data!;
            }
        });
        if (!error) {
            await profileApi(token!.accessToken, (err, user) => {
                if (err) {
                    toast({
                        title: err.message,
                        description: err.cause?.message,
                        variant: "destructive",
                    });
                } else {
                    if (!user) {
                        return;
                    }
                    toast({
                        title: "Login Success",
                        description: JSON.stringify(user),
                        variant: "success",
                    });
                    login({
                        user,
                        token,
                    });
                }
                navigate("/login");
            });
        }
        if (error) {
            toast({
                title: "Login Failed",
                variant: "destructive",
            });
        }
        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-sm mx-auto w-full"
            >
                <FormField
                    control={form.control}
                    name="userNameOrEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Username </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="example@mail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Password </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="*********"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormLabel>Remember me</FormLabel>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    <Button
                        isLoading={isLoading}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                    <div className="text-xs flex justify-between">
                        <Link to="/register" className="text-primary">
                            Register now
                        </Link>
                        <Link to="/forgot" className="text-primary">
                            Forgot password ?
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            isLoading={isLoading}
                            className="w-full bg-slate-800 hover:bg-slate-700"
                        >
                            <IconBrandGithubFilled className="w-5 h-5 mr-2" />
                            Github
                        </Button>
                        <Button
                            isLoading={isLoading}
                            className="w-full bg-sky-800 hover:bg-sky-700"
                        >
                            <IconBrandGoogle className="w-5 h-5 mr-2" />
                            Google
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default LoginForm;
