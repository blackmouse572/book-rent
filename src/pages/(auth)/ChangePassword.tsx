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
import HomeButtton from "@/components/Home-Button";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

function ChangePassword() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
function ChangePassword() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 text-xs italic mt-1">
                Please enter your username to reset your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </Button>
        {isFormSubmitted && (
          <p className="text-green-500 mt-2 text-sm">Reset password link sent to your email.</p>
        )}
      </form>
    </Form>
  );
}