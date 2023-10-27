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
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    Address: z.string(),
});

function InfoAccount() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    // const [userData, setUserData] = useState({
    //     username: "JohnDoe",
    //     email: "johndoe@example.com",
    //     phoneNumber: "123-456-7890",
    //     // example Các thông tin khác của người dùng
    // });

    const onSubmit = (data: unknown) => {
        // Xử lý logic cập nhật thông tin người dùng
        console.log(data);
        // setUserData(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-md mx-auto mb-7"
            >
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-2">Avatar</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" mb-2">Username</FormLabel>
                            <FormControl>
                                <Input
                                    className=" w-full py-2 px-3 "
                                    placeholder="Enter your username"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className=" mt-1">
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" mb-2">Email</FormLabel>
                            <FormControl>
                                <Input
                                    className=" w-full py-2 px-3 "
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-2">Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    className=" w-full py-2 px-3"
                                    placeholder="Enter your phone number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-2">Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className=" py-2 px-4 mt-5  ">
                    Save
                </Button>
            </form>
        </Form>
    );
}
export default InfoAccount;
