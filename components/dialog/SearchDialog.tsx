"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ProductDetail } from "@/types";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

function ProductItem({
    product,
    onClick,
}: {
    product: ProductDetail;
    onClick?: () => void;
}) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${product.slug}`);
        if (onClick) onClick();
    };

    return (
        <Card
            className="cursor-pointer w-full hover:bg-gray-50 border-none shadow-none transition-colors"
            onClick={handleClick}>
            <CardContent className="p-3 flex items-center space-x-4">
                {product.images && product.images.length > 0 && (
                    <Image
                        src={product.images[0].src}
                        alt={product.slug}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                    />
                )}
                <span className="font-medium">{product.name}</span>
            </CardContent>
        </Card>
    );
}

export function ProductSearch({ onClick }: { onClick?: () => void }) {
    const { products } = useProduct();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<ProductDetail[]>(
        []
    );
    const router = useRouter();

    useEffect(() => {
        // Ensure we have products before filtering
        if (!products || products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        // If query is empty, show first 5 products
        if (query === "") {
            setFilteredProducts(products.slice(0, 5));
            return;
        }

        const lowerQuery = query.toLowerCase().trim();
        const filtered = products.filter((product) => {
            const searchText = [
                product.name?.toLowerCase() || "",
                product.tags ? product.tags.join(" ").toLowerCase() : "",
                product.overview?.toLowerCase() || "",
                product.slug?.toLowerCase() || "",
            ].join(" ");

            return searchText.includes(lowerQuery);
        });

        setFilteredProducts(filtered);
    }, [query, products]);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setOpen(false);
            router.push(`/shop?query=${query}`);
        }
    };

    const handleItemClick = () => {
        setOpen(false);
        if (onClick) onClick();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Image
                        src="/images/icons/search.svg"
                        alt="Search"
                        width={20}
                        height={20}
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Search Products</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Type to search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="mb-4"
                        autoFocus
                    />

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No products found.
                        </div>
                    )}

                    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                        {filteredProducts.map((product) => (
                            <div className="" key={product.slug}>
                                <ProductItem
                                    key={product.slug}
                                    product={product}
                                    onClick={handleItemClick}
                                />
                                <Separator />
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
