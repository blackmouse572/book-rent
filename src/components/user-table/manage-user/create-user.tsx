import { Button } from "@/components/ui/button";
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";

type FormData = z.infer<typeof userSchema>;

const createUser = async (data : FormData) => {
    const user = await postUserApi(data);
    return user;
  };
  
  export function CreateUser() {
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
          console.log('User ID:', data._id);
          toast({
            title: 'Success',
            description: 'Add User Success!!!',
          });
        } else {
          toast({
            title: 'Invalid user response',
            description: 'No user ID in the response.',
          });
        }
      },
      onError: (error : Error) => {
        toast({
          title: 'Error submitting user',
          description: error.message,
        });
      },
    });
  
    const onSubmit = (data: FormData) => {
      // Call the mutate function to trigger the mutation
      mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
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
                                                <FormLabel>
                                                    {" "}
                                                    User Name{" "}
                                                </FormLabel>
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
                                                <FormLabel>
                                                    {" "}
                                                    Password{" "}
                                                </FormLabel>
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
                                <div className="flex flex-row justify-between">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            form.setValue(
                                                                "role",
                                                                value as
                                                                    | "SUPER_ADMIN"
                                                                    | "ADMIN"
                                                                    | "USER"
                                                            )
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
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
                                                        checked={
                                                            field.value ?? false
                                                        }
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <DialogFooter className="sm:justify-start">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Submit
                                        </Button>
                                        <DialogClose>Close</DialogClose>
                                    </DialogFooter>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}