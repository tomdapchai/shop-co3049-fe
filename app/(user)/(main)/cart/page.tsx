"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import ProductCartCard from "@/components/card/ProductCartCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
const page = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const router = useRouter();
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + item.productPrice * item.quantity;
        }, 0);
    };

    return (
        <div className="container mx-auto py-8 max-md:px-8">
            <h1 className="text-3xl font-bold mb-8">My Cart</h1>
            {cart.length === 0 ? (
                <div className="flex flex-col justify-start items-start space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">
                        Your cart is empty
                    </h2>
                    <Button
                        variant="secondary"
                        className="bg-sub hover:bg-[#b88e2f]/90"
                        onClick={() => router.push("/shop")}>
                        <p className="text-main">Continue Shopping</p>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3 flex flex-col justify-start items-end space-y-6">
                        <div className="space-y-4 w-full">
                            {cart.map((item, index) => (
                                <ProductCartCard
                                    key={index}
                                    product={item}
                                    onRemove={removeFromCart}
                                    updateQuantity={updateQuantity}
                                    index={index}
                                />
                            ))}
                        </div>
                        <Button
                            variant="secondary"
                            className="bg-red-500 hover:bg-red-500/90"
                            onClick={clearCart}>
                            <p className="text-white">Clear Cart</p>
                        </Button>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden md:block"
                    />
                    <div className="w-full md:w-1/3 mt-8 md:mt-0">
                        <div className="bg-background p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                Order Summary
                            </h2>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg">Total:</span>
                                <span className="text-2xl font-bold">
                                    {formatPrice(calculateTotal())}
                                </span>
                            </div>
                            <Button
                                className="w-full bg-sub hover:bg-[#b88e2f]/90"
                                size="lg"
                                onClick={() => router.push("/checkout")}>
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
