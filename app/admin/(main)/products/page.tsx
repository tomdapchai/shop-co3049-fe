"use client";
import { useState, useEffect } from "react";
import AdminProductCard from "@/components/admin/AdminProductCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getAllProduct } from "@/services/ProductService";
import { ProductDetail } from "@/types";

export default function ProductsPage() {
    const [products, setProduct] = useState<ProductDetail[]>([]);
    useEffect(() => {
        getAllProduct().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                console.log("Products:", data);
                setProduct(data);
            }
        });
    }, []);
    const router = useRouter();
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-8">Product Management</h1>
            <Button
                className="mb-4"
                onClick={() => router.push("./products/create")}>
                Add Product
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <AdminProductCard
                        key={product.slug}
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                        image={product.images[0].src}
                        overview={product.overview}
                        rating={
                            product.reviews.length > 0
                                ? product.reviews.reduce(
                                      (acc, review) => acc + review.rating,
                                      0
                                  ) / product.reviews.length
                                : 0
                        }
                    />
                ))}
            </div>
        </div>
    );
}
