"use client";
import React from "react";
import { useProduct } from "@/context/ProductContext";
import { siteInfo } from "@/types";
import parser from "html-react-parser";
const page = () => {
    const { siteInfo } = useProduct();
    return (
        <div className="w-full relative h-full flex flex-col justify-center items-center space-y-10 my-10 max-md:p-4">
            <h1 className="text-3xl font-bold">About us</h1>
            {siteInfo && parser(siteInfo!.about)}
        </div>
    );
};

export default page;
