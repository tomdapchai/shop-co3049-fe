"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

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
import { subcriberSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { createSubscriber } from "@/services/SubscribeService";

type SubscriberFormValues = z.infer<typeof subcriberSchema>;

interface SubscribeFormProps {
    onSubmit: (data: SubscriberFormValues) => void;
}

export const SubscribeForm = () => {
    const { toast } = useToast();
    const form = useForm<SubscriberFormValues>({
        resolver: zodResolver(subcriberSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: SubscriberFormValues) {
        console.log(values);
        // perform sending to backend here
        await createSubscriber(values)
            .then((data) => {
                if ("error" in data) {
                    toast({
                        title: "Error",
                        description: data.error,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Success",
                        description:
                            "You have successfully subscribed to our newsletter",
                        className: "bg-green-500",
                    });
                }
            })
            .finally(() => {
                form.reset();
            });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4 justify-center items-center p-8">
                <div className="flex flex-col space-y-2 justify-center items-center">
                    <h1 className="text-3xl font-bold">
                        Subscribe to our newsletter
                    </h1>
                    <p className="text-sm text-slate-500">
                        Sign up to be the first hearing our latest news
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email here"
                            className="p-4"
                            {...field}
                        />
                    )}></FormField>
                <FormMessage />
                <Button
                    type="submit"
                    className="w-[400px] bg-sub p-4 hover:bg-[#b88e2f]/90">
                    Subscribe
                </Button>
            </form>
        </Form>
    );
};
