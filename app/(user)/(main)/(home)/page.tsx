"use client";
import { Button } from "@/components/ui/button";
import { categoryImages } from "@/lib/constants";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProductCard from "@/components/card/ProductCard";
import Slideshow from "@/components/Slideshow";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllProduct } from "@/services/ProductService";
import { Product, ProductDetail, ProductView } from "@/types";
import { useProduct } from "@/context/ProductContext";
import { AdvertisementPopup } from "@/components/userLayout/AdvertisePop";
import { Input } from "@/components/ui/input";
import { SubscribeForm } from "@/components/form/SubscribeForm";
import ForYou from "@/components/decoration/ForYou";
import ProductReviewCarousel from "@/components/decoration/FeedbackCarousel";
import { Separator } from "@radix-ui/react-separator";
import ServiceFeatures from "@/components/userLayout/ServiceFeatures";

const page = () => {
    const { products, advertisement, siteInfo, isAdShown, extensions } =
        useProduct();
    const [productImages, setProductImages] = useState<ProductDetail[]>([]);
    useEffect(() => {
        setProductImages(products.slice(0, 8));
    }, []);
    const router = useRouter();
    return (
        <div
            style={{
                background: siteInfo?.themeColor || "#ffffff",
            }}
            className="w-full h-full flex flex-col gap-10 pb-8">
            {advertisement.enable &&
                extensions.find((ex) => ex.id == "advertisement")?.enabled &&
                !isAdShown && (
                    <AdvertisementPopup advertisement={advertisement} />
                )}
            <section
                style={{
                    backgroundImage: `url(${
                        siteInfo?.homeBanner || "/images/banner.jpg"
                    })`,
                }}
                className="bg-cover bg-bottom bg-no-repeat h-screen flex justify-end items-center max-md:justify-center">
                <div className="flex flex-col bg-main space-y-8 w-[600px] max-md:w-[400px] max-sm:w-[300px] rounded-lg md:mr-40 p-10">
                    <div className="flex flex-col gap-4">
                        <p className="text-black font-bold text-lg">
                            New Arrival
                        </p>
                        <h1 className="text-7xl text-sub max-md:text-3xl font-bold">
                            Discover Our New Collection
                        </h1>
                        <p className="font-bold">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                    </div>

                    <Button
                        className="bg-sub rounded-none px-12 py-10 w-fit hover:bg-[#b88e2f]/90"
                        onClick={() => router.push("/shop")}>
                        <p className="text-xl">Shop Now</p>
                    </Button>
                </div>
            </section>

            {/* For you */}
            {extensions.find((ex) => ex.id == "products-for-you")?.enabled && (
                <section className="flex flex-col justify-center items-center w-full gap-14 max-md:p-4">
                    <ForYou products={products} />
                </section>
            )}

            <section className="flex flex-col justify-center items-center w-full gap-14 max-md:p-4">
                <div className="flex justify-center items-center flex-col">
                    <h1 className="font-bold text-3xl">Browse The Range</h1>
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>

                <div className="md:grid md:grid-cols-3 gap-6 max-md:flex max-md:flex-col md:mx-6">
                    {categoryImages.map((category) => (
                        <div
                            key={category.alt}
                            className="flex flex-col justify-center items-center space-y-4">
                            <Image
                                key={category.title}
                                src={category.src}
                                alt={category.alt}
                                width={600}
                                height={600}
                                className="rounded-xl max-md:w-[300px] max-md:h-[300px]"
                            />
                            <p className="font-bold">{category.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex flex-col justify-center items-center w-full gap-16">
                <h1 className="font-bold text-4xl">Our Products</h1>
                <div className="flex flex-col justify-center items-center w-full gap-8">
                    <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {productImages.map((product) => (
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
                                        ? product.reviews.reduce(
                                              (acc, review) => {
                                                  return acc + review.rating;
                                              },
                                              0
                                          ) / product.reviews.length
                                        : 0
                                }
                            />
                        ))}
                    </div>
                    <Link href="/shop" className="">
                        <Button className="bg-main hover:bg-[#fff3e3]/70 px-10 py-6 shadow-lg border border-[#b88e2f]">
                            <p className="text-sub font-bold">
                                Explore more...
                            </p>
                        </Button>
                    </Link>
                </div>
            </section>

            {extensions.find((ex) => ex.id == "image-gallery")?.enabled && (
                <section className="flex flex-col justify-center items-center w-full gap-8 bg-main px-4 py-6">
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <p className="font-bold text-gray-400 text-lg">
                            Share your setup with
                        </p>
                        <h1 className="font-bold text-3xl">
                            #FurnoraFurniture
                        </h1>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <Slideshow />
                    </div>
                </section>
            )}

            {extensions.find((ex) => ex.id == "feedback-carousel")?.enabled && (
                <section className="flex flex-col justify-center items-center w-full ">
                    <ProductReviewCarousel products={products} />
                </section>
            )}

            <Separator className="border-b-2" />
            <section className="flex flex-col justify-center items-center w-full bg-white">
                <SubscribeForm />
            </section>
        </div>
    );
};

export default page;
