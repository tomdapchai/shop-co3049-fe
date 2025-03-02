"use client";
import { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import { ProductDetail } from "@/types";

interface ForYouProps {
    products: ProductDetail[];
}

const ForYou = ({ products }: ForYouProps) => {
    const [suggestedProducts, setSuggestedProducts] = useState<ProductDetail[]>(
        []
    );

    useEffect(() => {
        const randomProducts = products.sort(() => 0.5 - Math.random());
        setSuggestedProducts(randomProducts.slice(0, 4));
    }, [products]);

    return (
        <div className="flex flex-col justify-center items-center w-full gap-8">
            <h1 className="font-bold text-3xl">Top picks for You</h1>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {suggestedProducts.map((product) => (
                    <ProductCard
                        key={product.name}
                        name={product.name}
                        overview={product.overview}
                        price={Number(product.price)}
                        image={product.images[0].src}
                        slug={product.slug}
                        size={product.size[0]}
                        color={product.color[0]}
                        rating={
                            product.reviews.length > 0
                                ? product.reviews.reduce((acc, review) => {
                                      return acc + review.rating;
                                  }, 0) / product.reviews.length
                                : 0
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default ForYou;
