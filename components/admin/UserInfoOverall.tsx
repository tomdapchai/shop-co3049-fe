"use client";
import { useState } from "react";
import AddressForm from "@/components/form/AddressForm";
import {
    updateUserInfo,
    updateUsername,
    adminUpdateUserPassword,
} from "@/services/UserService";
import { addressFormSchema } from "@/lib/validation";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";
import AdminAddressForm from "../form/AdminAddressForm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const UserInfoOverall = ({ user }: { user: User }) => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { toast } = useToast();

    const handleInfoSubmit = async (
        data: z.infer<typeof addressFormSchema>
    ) => {
        console.log(data);
        const { name, email, phoneNumber, streetAddress, city, province } =
            data;
        await updateUserInfo(user.userId.toString(), {
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

    const handleUpdateUsername = async () => {
        await updateUsername(user.userId.toString(), {
            username: user.username,
            newUsername,
        }).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description:
                        "An error occurred while updating user's username.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "User's username has been updated.",
                });
            }
        });
    };

    const handleUpdatePassword = async () => {
        await adminUpdateUserPassword(user.userId.toString(), {
            newPassword,
        }).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description:
                        "An error occurred while updating user's password.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "User's password has been updated.",
                });
            }
        });
    };
    return (
        <div className="w-full p-4 flex justify-start items-start">
            <div className="flex flex-col w-full justify-start items-start space-y-6">
                <p className="text-2xl font-bold">Account details</p>
                <AdminAddressForm
                    onSubmit={handleInfoSubmit}
                    detail
                    user={user}
                />

                <p className="text-2xl font-bold">Change credentials</p>
                <div>
                    <p className="text-lg font-bold">Change username</p>
                    <Input
                        placeholder="New username"
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            handleUpdateUsername();
                        }}>
                        Update username
                    </Button>
                </div>
                <div>
                    <p className="text-lg font-bold">Change password</p>
                    <Input
                        placeholder="New password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            handleUpdatePassword();
                        }}>
                        Update password
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoOverall;
