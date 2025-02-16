import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
export interface productOrderTrue {
    productId: string;
    quantity: number;
    color: string;
    size: string;
    productName: string;
    productImage: string;
    productPrice?: number;
}

interface ProductCartCardProps {
    product: productOrderTrue;
    onRemove: (index: number) => void;
    updateQuantity: (productIndex: number, newQuantity: number) => void;
    index: number;
}

export default function ProductCartCard({
    product,
    onRemove,
    updateQuantity,
    index,
}: ProductCartCardProps) {
    const handleQuantityChange = (amount: number) => {
        const newQuantity = Math.max(1, product.quantity + amount);
        updateQuantity(index, newQuantity);
    };

    return (
        <Card className="w-full">
            <CardContent className="p-4 w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center space-x-4 w-full">
                        <div className="relative w-20 h-20">
                            <Image
                                src={product.productImage}
                                alt={product.productName}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <p className="font-bold text-lg">
                                {product.quantity} x {product.productName}
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Size: {product.size}, Color: {product.color}
                            </p>
                            {product.productPrice && (
                                <p className="font-semibold">
                                    {formatPrice(product.productPrice)}
                                </p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityChange(-1)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-medium">
                                    {product.quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityChange(1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => onRemove(index)}>
                        <X className="h-10 w-10" />
                        <span className="sr-only">Remove item</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
