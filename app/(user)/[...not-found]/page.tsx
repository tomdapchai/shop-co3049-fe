import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const page = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link href="/">
                <Button
                    variant="default"
                    className="bg-sub hover:bg-[#b88e2f]/90">
                    Go back home
                </Button>
            </Link>
        </div>
    );
};

export default page;
