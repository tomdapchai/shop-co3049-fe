"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUsername, updateUserPassword } from "@/services/UserService";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
const usernameFormSchema = z.object({
    username: z.string().min(3),
    newUsername: z.string().min(3),
});

const passwordFormSchema = z.object({
    password: z.string().min(8),
    newPassword: z.string().min(8),
});

const page = () => {
    const { userId } = useAuth();
    const { toast } = useToast();
    const usernameForm = useForm<z.infer<typeof usernameFormSchema>>({
        resolver: zodResolver(usernameFormSchema),
        defaultValues: {
            username: "",
            newUsername: "",
        },
    });

    const handleUsernameSubmit = async (
        data: z.infer<typeof usernameFormSchema>
    ) => {
        const res = await updateUsername(userId, data);
        if ("error" in res) {
            toast({
                title: "Error",
                description: "An error occurred while updating your username.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Your username has been updated.",
            });
        }
    };

    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            password: "",
            newPassword: "",
        },
    });

    const handlePasswordSubmit = async (
        data: z.infer<typeof passwordFormSchema>
    ) => {
        const res = await updateUserPassword(userId, data);
        if ("error" in res) {
            toast({
                title: "Error",
                description: "An error occurred while updating your password.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Your password has been updated.",
            });
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start space-y-10 max-md:space-y-6">
            <p className="text-2xl font-bold">Change credentials</p>
            <div className="w-full flex flex-col justify-start items-start space-y-6">
                <Form {...usernameForm}>
                    <form
                        onSubmit={usernameForm.handleSubmit(
                            handleUsernameSubmit
                        )}
                        className=" flex w-full max-md:flex-col max-md:justify-start max-md:items-center max-md:space-y-4 justify-between items-end md:space-x-4">
                        <FormField
                            control={usernameForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        placeholder="Current Username"
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={usernameForm.control}
                            name="newUsername"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Username</FormLabel>
                                    <Input
                                        placeholder="New Username"
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className=" max-md:w-full bg-sub hover:bg-[#b88e2f]/90">
                            Update Username
                        </Button>
                    </form>
                </Form>

                <Form {...passwordForm}>
                    <form
                        onSubmit={passwordForm.handleSubmit(
                            handlePasswordSubmit
                        )}
                        className="  flex w-full max-md:flex-col max-md:justify-start max-md:items-center max-md:space-y-4 justify-between items-end md:space-x-4">
                        <FormField
                            control={passwordForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Current password"
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="New password"
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="max-md:w-full bg-sub hover:bg-[#b88e2f]/90">
                            Update password
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default page;
