"use client";
import React from "react";
import AddressForm from "@/components/form/AddressForm";
import { updateUserInfo } from "@/services/UserService";
import { addressFormSchema } from "@/lib/validation";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
const page = () => {
    const { userId, isLoggedIn } = useAuth();
    const { toast } = useToast();
    const handleSubmit = async (data: z.infer<typeof addressFormSchema>) => {
        console.log(data);
        const { name, email, phoneNumber, streetAddress, city, province } =
            data;
        await updateUserInfo(userId, {
            name,
            email,
            phoneNumber,
            address: {
                street: streetAddress,
                city: `${city}, ${province}`,
            },
        }).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "An error occurred while updating your info.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "Your info has been updated.",
                });
            }
        });
    };
    return (
        <div className="w-full p-4 flex justify-start items-start">
            <div className="flex flex-col w-full justify-start items-start space-y-6">
                <p className="text-2xl font-bold">Account details</p>
                <AddressForm onSubmit={handleSubmit} detail />
            </div>
        </div>
    );
};

export default page;
