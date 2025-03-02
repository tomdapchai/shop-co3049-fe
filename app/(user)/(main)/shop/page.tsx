"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { ProductView, ProductDetail } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/card/ProductCard";
import { getAllProduct } from "@/services/ProductService";
import { useProduct } from "@/context/ProductContext";

const page = () => {
    const { products } = useProduct();
    const [sortBy, setSortBy] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState<ProductDetail[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);
    /* const totalPages = Math.ceil(mockProducts.length / productsPerPage); */
    const [indexOfFirstProduct, setIndexOfFirstProduct] = useState(0);
    const [indexOfLastProduct, setIndexOfLastProduct] = useState(0);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        undefined
    );
    const [query, setQuery] = useState("");
    const [searchParams] = useSearchParams();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [queryProducts, setQueryProducts] = useState<ProductDetail[]>([]);
    useEffect(() => {
        // fetch products
        if (searchParams) setQuery(searchParams[1]);
    }, []);

    useEffect(() => {
        if (query && query !== "") {
            const filtered = products.filter((product) =>
                (
                    product.name.toLowerCase() +
                    product.tags.join(", ") +
                    product.overview +
                    product.slug
                ).includes(query.toLowerCase())
            );
            setQueryProducts(filtered);
        } else {
            setQueryProducts(products);
        }
    }, [query]);

    useEffect(() => {
        setTotalPages(Math.ceil(queryProducts.length / productsPerPage));
    }, [queryProducts]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        const last = currentPage * productsPerPage;
        const first = last - productsPerPage;
        setIndexOfLastProduct(last);
        setIndexOfFirstProduct(first);
        setCurrentProducts(queryProducts.slice(first, last));
        console.log("Current products: ", currentProducts);
    }, [currentPage, queryProducts]);

    useEffect(() => {
        //sort products
        console.log("Sort by: ", sortBy);
        if (sortBy == "price") {
            const sorted = [...queryProducts].sort((a, b) => {
                return sortOrder === "asc"
                    ? Number(a.price) - Number(b.price)
                    : Number(b.price) - Number(a.price);
            });
            setQueryProducts(sorted);
        } else if (sortBy == "rating") {
            const sorted = [...queryProducts].sort((a, b) => {
                return sortOrder === "asc"
                    ? b.reviews.length > 0
                        ? b.reviews.reduce(
                              (acc, review) => acc + review.rating,
                              0
                          ) / b.reviews.length
                        : 0 - a.reviews.length > 0
                        ? a.reviews.reduce(
                              (acc, review) => acc + review.rating,
                              0
                          ) / a.reviews.length
                        : 0
                    : a.reviews.length > 0
                    ? a.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                      ) / a.reviews.length
                    : 0 - b.reviews.length > 0
                    ? b.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                      ) / b.reviews.length
                    : 0;
            });
            setQueryProducts(sorted);
        }
    }, [sortBy, sortOrder]);
    return (
        <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full flex flex-col">
                <div className="w-full h-[400px] relative flex justify-center items-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center bg-no-repeat filter blur-sm"></div>
                    <div className="absolute inset-0 bg-white/10"></div>
                    <h1 className="relative z-10 font-bold text-6xl text-sub">
                        Shop
                    </h1>
                </div>

                <div className="bg-main flex justify-between h-fit py-4 px-6 items-center">
                    <div className="flex justify-between gap-2 items-center h-fit">
                        <p>
                            Showing {indexOfFirstProduct + 1} -{" "}
                            {indexOfLastProduct} of {queryProducts.length}{" "}
                            products
                        </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        {searchParams && searchParams[1] && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setQuery("");
                                    // reset the url - remove the query part
                                    window.history.replaceState(
                                        {},
                                        "",
                                        window.location.pathname
                                    );
                                }}>
                                Clear search
                            </Button>
                        )}
                        <Select value={selectedValue} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent className="p-2">
                                <SelectItem value="price">Price</SelectItem>
                                <SelectItem value="rating">Rating</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setSortOrder(
                                    sortOrder === "asc" ? "desc" : "asc"
                                )
                            }>
                            {sortOrder === "asc" ? "Ascending" : "Descending"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full px-4 py-8 flex justify-center items-center flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {currentProducts.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            overview={product.overview}
                            price={Number(product.price)}
                            slug={product.slug}
                            image={product.images[0].src}
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
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1)
                                        paginate(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i + 1}>
                                <PaginationLink
                                    href="#"
                                    className={`${
                                        currentPage === i + 1
                                            ? "bg-sub hover:bg-[#b88e2f]/90 hover:text-main text-main"
                                            : "bg-main hover:bg-[#fff3e3]/90 hover:text-sub text-sub"
                                    }`}
                                    isActive={currentPage === i + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        paginate(i + 1);
                                    }}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages)
                                        paginate(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default page;
