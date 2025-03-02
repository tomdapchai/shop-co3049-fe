"use client";

import { useState, useEffect } from "react";
import { ProductDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronDown } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import "./styles.css";

interface ProductComparisonProps {
    currentProduct: ProductDetail;
    products: ProductDetail[];
}

const ProductComparison = ({
    currentProduct,
    products,
}: ProductComparisonProps) => {
    const [selectedProducts, setSelectedProducts] = useState<ProductDetail[]>(
        []
    );
    const [availableProducts, setAvailableProducts] = useState<ProductDetail[]>(
        []
    );

    // Filter out the current product and limit to similar products (same tags)
    useEffect(() => {
        const filteredProducts = products
            .filter((p) => p.slug !== currentProduct.slug)
            // Prioritize products with matching tags
            .sort((a, b) => {
                const aMatchCount = a.tags.filter((tag) =>
                    currentProduct.tags.includes(tag)
                ).length;
                const bMatchCount = b.tags.filter((tag) =>
                    currentProduct.tags.includes(tag)
                ).length;
                return bMatchCount - aMatchCount;
            });

        setAvailableProducts(filteredProducts);
    }, [currentProduct, products]);

    const toggleProduct = (product: ProductDetail) => {
        if (selectedProducts.find((p) => p.slug === product.slug)) {
            setSelectedProducts(
                selectedProducts.filter((p) => p.slug !== product.slug)
            );
        } else {
            // Limit to 3 products for comparison
            if (selectedProducts.length < 3) {
                setSelectedProducts([...selectedProducts, product]);
            }
        }
    };

    // Calculate price difference as a percentage
    const getPriceDifference = (price: number) => {
        const diff =
            ((price - currentProduct.price) / currentProduct.price) * 100;
        return diff.toFixed(1);
    };

    return (
        <Card className="w-full mt-10">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Price Comparison</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Add Products{" "}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[300px]">
                            <ScrollArea className="h-[300px]">
                                {availableProducts.map((product) => (
                                    <DropdownMenuCheckboxItem
                                        key={product.slug}
                                        checked={selectedProducts.some(
                                            (p) => p.slug === product.slug
                                        )}
                                        onCheckedChange={() =>
                                            toggleProduct(product)
                                        }
                                        disabled={
                                            selectedProducts.length >= 3 &&
                                            !selectedProducts.some(
                                                (p) => p.slug === product.slug
                                            )
                                        }>
                                        <div className="flex w-full justify-start items-center gap-2">
                                            <Image
                                                src={product.images[0].src}
                                                alt={product.name}
                                                width={40}
                                                height={40}
                                            />
                                            {product.name}
                                        </div>
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Current Product */}
                    <div className="space-y-4">
                        <Card className="h-full border-2 border-sub bg-main/10">
                            <CardContent className="p-4 flex flex-col h-full">
                                <div className="text-lg font-semibold mb-2 text-center">
                                    Current Selection
                                </div>
                                <div className="relative h-32 w-full mb-4">
                                    <Image
                                        src={currentProduct.images[0].src}
                                        alt={currentProduct.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-semibold line-clamp-1">
                                    {currentProduct.name}
                                </h3>
                                <p className="text-lg font-bold text-sub mt-2">
                                    {formatPrice(currentProduct.price)}
                                </p>
                                <div className="mt-2 space-y-1 flex-grow">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Size Options:
                                        </span>
                                        <span>
                                            {currentProduct.size.length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Color Options:
                                        </span>
                                        <span>
                                            {currentProduct.color.length}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Comparison Products */}
                    {selectedProducts.map((product) => (
                        <div key={product.slug} className="space-y-4">
                            <Card className="h-full relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                                    onClick={() => toggleProduct(product)}>
                                    <X className="h-4 w-4" />
                                </Button>
                                <CardContent className="p-4 flex flex-col h-full">
                                    <div className="relative h-32 w-full mb-4">
                                        <Image
                                            src={product.images[0].src}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="hover:underline">
                                        <h3 className="font-semibold line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-lg font-bold">
                                            {formatPrice(Number(product.price))}
                                        </p>
                                        {product.price !==
                                            currentProduct.price && (
                                            <Badge
                                                className={
                                                    product.price >
                                                    currentProduct.price
                                                        ? "bg-red-500"
                                                        : "bg-green-500"
                                                }>
                                                {product.price >
                                                currentProduct.price
                                                    ? "+"
                                                    : ""}
                                                {getPriceDifference(
                                                    product.price
                                                )}
                                                %
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="mt-4 space-y-2 flex-grow">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Size Options:
                                            </span>
                                            <span>{product.size.length}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Color Options:
                                            </span>
                                            <span>{product.color.length}</span>
                                        </div>

                                        <div className="mt-2">
                                            <Link
                                                href={`/product/${product.slug}`}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full mt-2">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: 3 - selectedProducts.length }).map(
                        (_, index) => (
                            <div key={`empty-${index}`}>
                                <Card className="h-full border-dashed">
                                    <CardContent className="p-4 flex flex-col items-center justify-center h-full text-muted-foreground">
                                        <p>Select a product to compare</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    )}
                </div>

                {selectedProducts.length > 0 && (
                    <>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Feature Comparison
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left py-2">
                                                Feature
                                            </th>
                                            <th className="text-left py-2">
                                                Current Product
                                            </th>
                                            {selectedProducts.map((product) => (
                                                <th
                                                    key={`header-${product.slug}`}
                                                    className="text-left py-2">
                                                    {product.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2">Price</td>
                                            <td className="py-2 font-medium">
                                                {formatPrice(
                                                    currentProduct.price
                                                )}
                                            </td>
                                            {selectedProducts.map((product) => (
                                                <td
                                                    key={`price-${product.slug}`}
                                                    className="py-2 font-medium">
                                                    {formatPrice(
                                                        Number(product.price)
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="py-2">Colors</td>
                                            <td className="py-2">
                                                <div className=" flex justify-start items-center space-x-2">
                                                    {currentProduct.color.map(
                                                        (c) => (
                                                            <Button
                                                                key={c}
                                                                size="icon"
                                                                className="w-8 h-8 rounded-full select-none cursor-default"
                                                                style={{
                                                                    backgroundColor:
                                                                        c,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            {selectedProducts.map((product) => (
                                                <td
                                                    key={`colors-${product.slug}`}
                                                    className="py-2 ">
                                                    <div className="flex justify-start items-center space-x-2">
                                                        {product.color.map(
                                                            (c) => (
                                                                <Button
                                                                    key={c}
                                                                    size="icon"
                                                                    className="w-8 h-8 rounded-full select-none cursor-default"
                                                                    style={{
                                                                        backgroundColor:
                                                                            c,
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="py-2">Sizes</td>
                                            <td className="py-2">
                                                {currentProduct.size.join(", ")}
                                            </td>
                                            {selectedProducts.map((product) => (
                                                <td
                                                    key={`sizes-${product.slug}`}
                                                    className="py-2">
                                                    {product.size.join(", ")}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="py-2">Tags</td>
                                            <td className="py-2">
                                                {currentProduct.tags.join(", ")}
                                            </td>
                                            {selectedProducts.map((product) => (
                                                <td
                                                    key={`tags-${product.slug}`}
                                                    className="py-2">
                                                    {product.tags.join(", ")}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {selectedProducts.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                        Select products to compare with {currentProduct.name}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductComparison;
