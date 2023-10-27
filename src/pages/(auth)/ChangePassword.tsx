import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export function ChangePassword() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const onSubmit = (data: unknown) => {
        // Xử lý logic gửi đường dẫn đặt lại mật khẩu tại đây
        console.log(data);
        setIsFormSubmitted(true);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your username"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Please enter your username to reset your
                                password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                {isFormSubmitted && (
                    <p className="text-green-500 mt-2 text-sm">
                        Reset password link sent to your email.
                    </p>
                )}
            </form>
        </Form>
    );
}
