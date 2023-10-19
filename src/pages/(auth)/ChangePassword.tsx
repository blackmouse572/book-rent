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
        <div className="max-w-md mx-auto m-4 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}
export default ChangePassword;
