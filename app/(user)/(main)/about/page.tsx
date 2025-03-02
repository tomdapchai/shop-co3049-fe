"use client";
import React from "react";
import "./styles.css";
import { useProduct } from "@/context/ProductContext";
import { siteInfo } from "@/types";
import parser from "html-react-parser";
const page = () => {
    const { siteInfo } = useProduct();
    return (
        <div className="w-full relative h-full flex flex-col justify-center items-center space-y-10 my-10 px-10 ">
            <div className="xl:w-[1200px] lg:w-[1000px] md:w-[800px] max-md:w-full max-md:px-4 flex flex-col justify-center items-center p-4">
                {siteInfo && parser(siteInfo!.about)}
            </div>
        </div>
    );
};

export default page;
