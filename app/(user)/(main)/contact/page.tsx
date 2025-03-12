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
import LoadingSpinner from "@/components/decoration/LoadingSpinner";
export default function ContactPage() {
    const { toast } = useToast();
    const { siteInfo, loadingStates } = useProduct();
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
                <h1 className="text-4xl font-bold">Liên hệ với chúng tôi</h1>
            </header>
            {loadingStates.siteInfo ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/3 space-y-8">
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-primary" />
                            <div>
                                <h2 className="text-lg font-bold text-[#b88e2f]">
                                    Địa chỉ
                                </h2>
                                <p>{siteInfo!.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Phone className="w-6 h-6 text-primary" />
                            <div>
                                <h2 className="text-lg font-bold text-[#b88e2f]">
                                    Số điện thoại
                                </h2>
                                <p>{siteInfo!.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-primary" />
                            <div>
                                <h2 className="text-lg font-bold text-[#b88e2f]">
                                    Địa chỉ Email
                                </h2>
                                <p>{siteInfo!.email}</p>
                            </div>
                        </div>
                    </aside>
                    <main className=" flex-1 flex-col justify-start items-start w-full">
                        <h2 className="text-2xl font-bold mb-4 text-center text-[#d0ad50] hover:text-[#b88e2f]">
                            FURNORA - TINH HOA NỘI THẤT, ĐẲNG CẤP VƯƠN XA!
                        </h2>
                        <p className="text-muted-foreground mb-8 text-center">
                            👉 Để biết thêm thông tin về sản phẩm và dịch vụ,
                            đừng ngần ngại liên hệ với chúng tôi. Đội ngũ
                            FURNORA luôn sẵn sàng hỗ trợ bạn!
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
                                            <FormLabel className="font-bold">
                                                Họ và tên:
                                            </FormLabel>
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
                                            <FormLabel className="font-bold">
                                                Địa chỉ Email:
                                            </FormLabel>
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
                                            <FormLabel className="font-bold">
                                                Số điện thoại:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+1 (555) 000-0000"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Chúng tôi sẽ chỉ liên hệ với bạn
                                                bằng số điện thoại trong trường
                                                hợp cần thiết.
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
                                            <FormLabel className="font-bold">
                                                Chủ đề:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Chủ đề là gì?"
                                                    className="italic"
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
                                            <FormLabel className="font-bold">
                                                {" "}
                                                Thắc mắc:
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Xin chào! Tôi muốn hỏi về..."
                                                    className="min-h-[100px] italic"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full font-bold">
                                    Gửi
                                </Button>
                            </form>
                        </Form>
                    </main>
                </div>
            )}
        </div>
    );
}
