import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { userSchema } from "@/components/user-table/manage-user/validation-user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { postUserApi } from "@/apis/users/post-user";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type FormData = z.infer<typeof userSchema>;

const createUser = async (data: FormData) => {
    const user = await postUserApi(data);
    return user;
};

export default function CreateUser() {
    const form = useForm<FormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            blocked: false,
        },
    });

    // Use the useMutation hook
    const { mutate } = useMutation(createUser, {
        onSuccess: (data) => {
            if (data && data._id) {
                console.log("User ID:", data._id);
                toast({
                    title: "Success",
                    description: "Add User Success!!!",
                });
            } else {
                toast({
                    title: "Invalid user response",
                    description: "No user ID in the response.",
                });
            }
        },
        onError: (error: Error) => {
            toast({
                title: "Error submitting user",
                description: error.message,
            });
        },
    });

    const onSubmit = (data: FormData) => {
        // Call the mutate function to trigger the mutation
        mutate(data);
    };

    return (
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 max-w-sm mx-auto w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Email </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="abc@gmail.com"
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
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Full Name </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="J.K Rowling"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row justify-between">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> User Name </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="J.K Rowling"
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
                                                placeholder="J.K Rowling"
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Phone </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0123456789"
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
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Address </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="J.K Rowling"
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
                            name="citizenId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> citizenId </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="xxx xxx xxx xxx"
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
                            name="citizenIdType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>citizenIdType</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) =>
                                                form.setValue(
                                                    "citizenIdType",
                                                    value as
                                                        | "old"
                                                        | "new"
                                                        | "cccd_chip_front"
                                                        | "old_back"
                                                        | "new_back"
                                                        | "chip_front"
                                                        | "chip_back"
                                                        | "cccd_chip_back"
                                                )
                                            }
                                            defaultValue={field.value}
                                            className="flex flex-row justify-between"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="old" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    OLD
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="new" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    NEW
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="cccd_chip_front" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    CCCD CHIP FRONT
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="new_back" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    NEW BACK
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="chip_front" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    CHIP FRONT
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="chip_back" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    CHIP BACK
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="cccd_chip_back" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    CCCD CHIP BACK
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="citizenIdIssueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>citizenIdIssueDate</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[175px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>
                                                            citizenIdIssueDate
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="citizenIdDateOfBirth"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>citizenIdDateOfBirth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[175px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>
                                                            citizenIdIssueDate
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="citizenIdPlaceOfIssue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {" "}
                                        citizenIdPlaceOfIssue{" "}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ABCD..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-row justify-between">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(value) =>
                                                    form.setValue(
                                                        "role",
                                                        value as
                                                            | "SUPER_ADMIN"
                                                            | "ADMIN"
                                                            | "USER"
                                                    )
                                                }
                                                defaultValue={field.value}
                                                className="flex flex-row justify-between"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="SUPER_ADMIN" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        SUPER ADMIN
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="ADMIN" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        ADMIN
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="USER" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        USER
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="blocked"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blocked</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value ?? false}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
