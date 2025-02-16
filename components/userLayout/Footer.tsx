import { links } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Footer = () => {
    return (
        <div className="w-full flex justify-center items-center px-10 p-4 border-t border-t-gray-400">
            <div className="w-full flex flex-col justify-center items-start  ">
                <div className="w-full flex justify-between items-start py-4 gap-32">
                    <div className="flex flex-col gap-8 justify-start items-start">
                        <h1 className="font-bold text-xl">Furniro.</h1>
                        <p className="text-gray-400">
                            268 Ly Thuong Kiet, District 10, Ho Chi Minh city
                        </p>
                    </div>
                    <div className="flex justify-between gap-6 max-md:flex-col max-md:gap-2">
                        {links.map((link) => (
                            <Link key={link.title} href={link.url}>
                                <Button variant="link" className="font-bold">
                                    {link.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <Separator className="mb-4" />
                <div>&#169; 2024 HCMUT, All rights reserved</div>
            </div>
        </div>
    );
};

export default Footer;
