"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SignUpSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
const SignUp = () => {
    const { isLoggedIn, register } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    useEffect(() => {
        if (isLoggedIn) {
            const callbackUrl = searchParams.get("callbackUrl");
            router.replace(callbackUrl || "/");
        }
    }, [isLoggedIn, router, searchParams]);

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        // push to DB the credentials
        try {
            await register(values.username, values.password).then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Registration Failed",
                        description: res.error,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Registration Successful",
                        description: res.message,
                        className: "bg-green-500 text-white",
                    });
                }
            });
        } catch (error) {
            console.log(error);
            // suppose to display error message here
        }
    }

    return (
        <Card className="w-[400px] h-fit">
            <CardHeader>
                <CardTitle className="text-sub">Đăng ký</CardTitle>
                <CardDescription>
                    Hãy điền thông tin đăng ký tài khoản
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="paragraph-semibold font-bold">
                                        Tên đăng nhập
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-focus border"
                                            placeholder="Nhập tên đăng nhập tại đây"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="paragraph-semibold font-bold">
                                        Mật khẩu
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-fcous border"
                                            placeholder="Nhập mật khẩu tại đây"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="paragraph-semibold font-bold">
                                        Xác nhận mật khẩu
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-focus border"
                                            placeholder="Xác nhận mật khẩu tại đây"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-sub hover:bg-[#b88e2f]/90">
                            Đăng ký
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="text-sm flex gap-2">
                <p className="text-slate-400">Đã có tài khoản</p>
                <Link
                    href={"/sign-in"}
                    className="underline text-sub hover:text-[#b88e2f]/80">
                    Đăng nhập
                </Link>
            </CardFooter>
        </Card>
    );
};

export default SignUp;
