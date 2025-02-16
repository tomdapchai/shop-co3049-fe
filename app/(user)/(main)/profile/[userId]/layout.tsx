"use client";

import React from "react";
import Image from "next/image";
import logoImg from "@/public/images/logo.png";
import { Sidebar } from "@/components/profile/Sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-8 mb-10">
            <div className="flex-col w-full h-[400px] relative flex justify-center items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center bg-no-repeat filter blur-sm"></div>
                <div className="absolute inset-0 bg-white/10"></div>
                <Image src={logoImg} alt="Furniro" priority className="z-10" />
                <h1 className="relative z-10 font-bold text-6xl text-sub">
                    My Profile
                </h1>
            </div>
            <div className="flex  w-full bg-white rounded-lg shadow-md p-6 md:p-10 max-w-5xl mb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <Sidebar />
                    </div>
                    <div className="md:col-span-3">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
