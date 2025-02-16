"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/public/images/logo.png";
import AddressForm from "@/components/form/AddressForm";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/services/OrderServices";
import * as z from "zod";
import { addressFormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
export default function CheckoutPage() {
    const { cart, clearCart, clearCartUser } = useCart();
    const { userId, isLoggedIn } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + item.productPrice * item.quantity;
        }, 0);
    };

    const handleSubmit = async (data: z.infer<typeof addressFormSchema>) => {
        // Here you would typically send the order data to your backend
        const { streetAddress, city, province, ...rest } = data;
        console.log("Order submitted:", {
            userId,
            ...rest,
            address: `${streetAddress}, ${city}, ${province}`,
            products: cart,
            total: calculateTotal(),
        });

        await createOrder({
            userId: isLoggedIn ? userId : null,
            ...rest,
            address: `${streetAddress}, ${city}, ${province}`,
            products: cart,
            total: calculateTotal(),
        })
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error",
                        description:
                            "An error occurred while placing the order.",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Order placed successfully!",
                        description:
                            "We've received your order and will process it shortly.",
                    });
                    const orderId = res.orderId;
                    router.push(`/success/${orderId}`);
                }
            })
            .finally(() => {
                if (!isLoggedIn) clearCart();
                else clearCartUser();
            });
        // Show a success message to the user

        // You might want to clear the cart or redirect the user after a successful order
        // clearCart()
        // router.push('/order-confirmation')
    };

    return (
        <div
            id="checkout-container"
            className="w-full h-full flex flex-col space-y-6">
            <div className="flex flex-col w-full h-[400px] relative justify-center items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center bg-no-repeat filter blur-sm"></div>
                <div className="absolute inset-0 bg-white/10"></div>
                <Image src={logoImg} alt="Furniro" priority className="z-10" />
                <h1 className="relative z-10 font-bold text-6xl text-sub">
                    Checkout
                </h1>
            </div>
            <div className="bg-white rounded w-full px-8 pt-6 pb-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="w-full md:px-12 md:py-12">
                        <h2 className="text-3xl font-bold mb-6">
                            Billing details
                        </h2>
                        <AddressForm onSubmit={handleSubmit} />
                    </div>
                    <div className="w-full px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-24 bg-white rounded-md md:max-w-3xl">
                        <div className="grid grid-cols-2 mb-4">
                            <div className="text-left">
                                <h2 className="text-lg sm:text-xl font-bold">
                                    Product
                                </h2>
                            </div>
                            <div className="text-right">
                                <h2 className="text-lg sm:text-xl font-bold">
                                    Subtotal
                                </h2>
                            </div>
                        </div>
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row justify-between mb-2">
                                <span className="text-gray-400 mb-1 sm:mb-0">
                                    {item.productName}
                                    <span className="px-2 text-sm font-normal text-gray-700">
                                        x {item.quantity}
                                    </span>
                                </span>

                                <span className="text-gray-700 font-medium">
                                    {formatPrice(
                                        item.productPrice * item.quantity
                                    )}
                                </span>
                            </div>
                        ))}
                        <div className="flex justify-between pt-2">
                            <span className="text-gray-700">Total</span>
                            <span className="text-yellow-500 font-extrabold text-lg">
                                {formatPrice(calculateTotal())}
                            </span>
                        </div>

                        <div className="text-sm text-gray-600 mt-4">
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account, and for other purposes described in
                            our{" "}
                            <Link
                                href="/privacy-policy"
                                className="underline font-extrabold">
                                privacy policy
                            </Link>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
