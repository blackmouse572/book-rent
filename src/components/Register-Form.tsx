import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconReload } from "@tabler/icons-react";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { signUpApi } from "../apis/auth/apis/sign-up";
import { RegisterSchema } from "../pages/(auth)/register/validation";
import { Button } from "./ui/button";

import { citizenIdCaptureApi } from "@/apis/auth/apis/citizenIdCapture";
import { Icons } from "@/components/icons";
import { ICitizenBackSide, ICitizenFrontSide } from "@/types";
import { format, isDate, parse } from "date-fns";
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
    const [frontImage, setFrontImage] = React.useState<File | null>(null);
    const [backImage, setBackImage] = React.useState<File | null>(null);

    const isBothSide = React.useMemo(() => {
        return frontImage && backImage;
    }, [frontImage, backImage]);

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

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFrontImage(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const onDropBS = useCallback((acceptedFiles: File[]) => {
        setBackImage(acceptedFiles[0]);
    }, []);
    const {
        getRootProps: getRootPropsBS,
        getInputProps: getInputPropsBS,
        isDragActive: isDragActiveBS,
    } = useDropzone({
        onDrop: onDropBS,
    });

    const renderUploadFront = React.useMemo(() => {
        if (frontImage)
            return (
                <>
                    <div className="w-32 h-32 border-dashed border-2 rounded-lg text-xs flex justify-center items-center text-center border-slate-500">
                        <img
                            src={URL.createObjectURL(frontImage)}
                            alt="frontside"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <p className="text-xs">{frontImage.name}</p>
                </>
            );
        return isDragActiveBS ? (
            <div className="w-32 h-32 border-dashed">
                Drop the files here ...
            </div>
        ) : (
            <div className="w-32 h-32 border-dashed border-2 rounded-lg text-xs flex justify-center items-center text-center">
                <div>Upload frontside</div>
                <Icons.cloudUpload className="ml-2" />
            </div>
        );
    }, [frontImage, isDragActiveBS]);

    const renderUploadBack = React.useMemo(() => {
        if (backImage)
            return (
                <>
                    <div className="w-32 h-32 border-dashed border-2 rounded-lg text-xs flex justify-center items-center text-center border-slate-500">
                        <img
                            src={URL.createObjectURL(backImage)}
                            alt="frontside"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <p className="text-xs">{backImage.name}</p>
                </>
            );
        return isDragActive ? (
            <div className="w-32 h-32 border-dashed">
                Drop the files here ...
            </div>
        ) : (
            <div className="w-32 h-32 border-dashed border-2 rounded-lg text-xs flex justify-center items-center text-center">
                <div>Upload backside</div>
                <Icons.cloudUpload className="ml-2" />
            </div>
        );
    }, [backImage, isDragActive]);

    const processCitizenId = React.useCallback(async () => {
        const formDataFS = new FormData();
        if (frontImage === null || backImage === null) return;
        formDataFS.append("image", frontImage);
        const formDataBS = new FormData();
        formDataBS.append("image", backImage);
        const [fs, bs] = await Promise.all([
            citizenIdCaptureApi<ICitizenFrontSide>(formDataFS),
            citizenIdCaptureApi<ICitizenBackSide>(formDataBS),
        ]);
        console.log({ fs, bs });
        form.setValue("citizenId", fs.data[0].id);
        form.setValue(
            "citizenIdDateOfBirth",
            parse(fs.data[0].dob, "dd/MM/yyyy", new Date())
        );
        form.setValue(
            "citizenIdIssueDate",
            parse(bs.data[0].issue_date, "dd/MM/yyyy", new Date())
        );
        form.setValue("citizenIdPlaceOfIssue", bs.data[0].issue_loc);
        form.setValue("citizenIdType", bs.data[0].type);
    }, [backImage, form, frontImage]);

    useEffect(() => {
        if (!isBothSide) return;

        processCitizenId();
    }, [isBothSide, processCitizenId]);

    const renderCitizen = React.useMemo(() => {
        if (!isBothSide) return null;
        return (
            <>
                <FormField
                    control={form.control}
                    name="citizenId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Citizen ID </FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
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
                        <FormItem>
                            <FormLabel> Issue Date </FormLabel>
                            <FormControl>
                                <Input
                                    disabled
                                    {...field}
                                    value={
                                        isDate(field.value)
                                            ? format(field.value, "dd/MM/yyyy")
                                            : ""
                                    }
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="citizenIdDateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                                <Input
                                    disabled
                                    {...field}
                                    value={
                                        isDate(field.value)
                                            ? format(field.value, "dd/MM/yyyy")
                                            : ""
                                    }
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="citizenIdPlaceOfIssue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Issue Place</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
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
                            <FormLabel>ID Type</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </>
        );
    }, [form.control, isBothSide]);

    useEffect(() => {
        form.formState.errors && console.log(form.formState.errors);
    }, [form.formState.errors]);
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
            >
                <div className="space-y-4 max-w-sm mx-auto w-full">
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
                </div>
                <div>
                    <Label>Upload CMND/CCCD</Label>
                    <div className="flex gap-2 mt-2">
                        <div {...getRootProps()}>
                            <Input {...getInputProps()} />
                            {renderUploadFront}
                        </div>
                        <div {...getRootPropsBS()}>
                            <Input {...getInputPropsBS()} />
                            {renderUploadBack}
                        </div>
                    </div>
                    {renderCitizen}
                </div>
                <div className="col-span-full">
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full"
                    >
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
                </div>
            </form>
        </Form>
    );
}

export default RegisterForm;
