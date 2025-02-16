"use client";
import { Mail, MapPin, Phone } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema } from "@/lib/validation";
import { createContact } from "@/services/ContactService";
import { Contact } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useProduct } from "@/context/ProductContext";
export default function ContactPage() {
    const { toast } = useToast();
    const { siteInfo } = useProduct();
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
        console.log(data);
        await createContact(data).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: res.error,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: res.message,
                });
            }
        });
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Contact</h1>
                <p className="text-muted-foreground">Home &gt; Contact</p>
            </header>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/3 space-y-8">
                    <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <div>
                            <h2 className="text-lg font-bold">Address</h2>
                            <p>{siteInfo!.address}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-primary" />
                        <div>
                            <h2 className="text-lg font-bold">Phone</h2>
                            <p>{siteInfo!.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-primary" />
                        <div>
                            <h2 className="text-lg font-bold">Email address</h2>
                            <p>{siteInfo!.email}</p>
                        </div>
                    </div>
                </aside>
                <main className=" flex-1 flex-col justify-start items-start w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Get In Touch With Us
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        For more information about our products & services,
                        please feel free to drop us an email. Our staff always
                        be there to help you out. Do not hesitate!
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mx-auto w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your name</FormLabel>
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
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="johndoe@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Phone number (optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+1 (555) 000-0000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            We'll only use this to contact you
                                            if needed.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Subject (optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="What's this about?"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Hi! I'd like to ask about..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </main>
            </div>
        </div>
    );
}
