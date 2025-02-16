"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Image from "next/image";
import { ProductDetail } from "@/types";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
function ProductItem({ product }: { product: ProductDetail }) {
    const router = useRouter();
    return (
        <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => router.push(`/product/${product.slug}`)}>
            <Image
                src={product.images[0].src}
                alt={product.slug}
                width={80}
                height={80}
                className="rounded-md object-cover"
            />
            <span>{product.name}</span>
        </div>
    );
}

export function ProductSearch({ onClick }: { onClick?: () => void }) {
    const { products } = useProduct();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();
    const filteredProducts =
        query !== ""
            ? products.filter((product) =>
                  (
                      product.name.toLowerCase() +
                      product.tags.join(", ") +
                      product.overview +
                      product.slug
                  ).includes(query.toLowerCase())
              )
            : products.slice(0, 5);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Image
                        src={"/images/icons/search.svg"}
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
                <Command>
                    <CommandInput
                        placeholder="Type to search..."
                        value={query}
                        onValueChange={setQuery}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setOpen(false);
                                router.push(`/shop?query=${query}`);
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup heading="Products">
                            {filteredProducts.map((product) => (
                                <CommandItem
                                    key={product.slug}
                                    onSelect={() => setOpen(false)}
                                    onClick={onClick}>
                                    <ProductItem product={product} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
