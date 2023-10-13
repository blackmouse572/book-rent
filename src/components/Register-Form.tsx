import { zodResolver } from "@hookform/resolvers/zod";
import { IconReload } from "@tabler/icons-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { signUpApi } from "../apis/auth/apis/sign-up";
import { RegisterSchema } from "../pages/(auth)/register/validation";
import { Button } from "./ui/button/button";
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

type FormData = z.infer<typeof RegisterSchema>;
function RegisterForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {},
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        await signUpApi(data, (err) => {
            if (err) {
                toast({
                    title: "Error",
                    description: err.response?.data.message,
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Success",
                description: "Register successfully",
                variant: "success",
            });
        });
        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-sm mx-auto w-full"
            >
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Email </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        type="email"
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Username </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="sacom23"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Full Name </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Full name"
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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Phone number </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="+84 1234567890"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Password </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="*******"
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
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Confirm Password </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="*******"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading && (
                        <IconReload className="animate-spin w-5 h-5 mr-2" />
                    )}
                    Register
                </Button>
                <p className="text-center text-sm">
                    Alredy have an account?{" "}
                    <Link to="/login" className="text-primary">
                        Login now
                    </Link>
                </p>
            </form>
        </Form>
    );
}

export default RegisterForm;
