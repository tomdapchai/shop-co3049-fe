"use client";
import { useState, useEffect } from "react";
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
import {
    RegionDropdown,
    CountryRegionData,
} from "react-country-region-selector";
import { addressFormSchema } from "@/lib/validation";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";
export type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressFormProps {
    onSubmit: (data: AddressFormValues) => void;
    detail?: boolean;
}

export default function AddressForm({
    onSubmit,
    detail = false,
}: AddressFormProps) {
    // gonna get user info from context
    const { user } = useAuth();
    const country = "Vietnam";
    const [region, setRegion] = useState("");

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            streetAddress: "",
            city: "",
            province: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.setValue("name", user.name ? user.name : "");
            form.setValue("email", user.email ? user.email : "");
            form.setValue(
                "phoneNumber",
                user.phoneNumber ? user.phoneNumber : ""
            );
            form.setValue(
                "streetAddress",
                user.address ? user.address.street : ""
            );
            form.setValue(
                "city",
                user.address
                    ? user.address.city != ""
                        ? user.address.city.split(",")[0]
                        : ""
                    : ""
            );
            form.setValue(
                "province",
                user.address
                    ? user.address.city != ""
                        ? user.address.city.split(",")[1].trim()
                        : ""
                    : ""
            );
        }
    }, [user]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full">
                {!detail ? (
                    <div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col justify-start items-start space-y-4">
                        <p className="text-xl font-bold">User info</p>
                        <div className="flex max-md:flex-col max-md:items-center max-md:space-y-6 w-full justify-between md:space-x-10">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Display name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Label className="text-xs text-slate-500">
                                            This will be used for default
                                            billing name, and in your reviews.
                                        </Label>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="johndoe@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Label className="text-xs text-slate-500">
                                            This will be used when we need to
                                            contact you if there is problem
                                            about the account.
                                        </Label>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}
                {detail ? (
                    <p className="text-xl font-bold">Billing info</p>
                ) : (
                    ""
                )}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="0912345678" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ho Chi Minh City"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                                <RegionDropdown
                                    country={country}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        setRegion(value);
                                    }}
                                    classes="w-full border border-gray-300 rounded-md px-3 py-2"
                                    valueType="full"
                                    disableWhenEmpty={true}
                                    defaultOptionLabel="Select Province"
                                    labelType="full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-sub hover:bg-[#b88e2f]/90">
                    {detail ? "Save Address" : "Order"}
                </Button>
            </form>
        </Form>
    );
}
