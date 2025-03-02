"use client";
import { links } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { MapPin } from "lucide-react";
import { useProduct } from "@/context/ProductContext";
import Image from "next/image";

const Footer = () => {
    const { socials } = useProduct();
    return (
        <footer className="bg-white py-12 border-t w-full">
            <div className="container mx-auto px-4 md:px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-lg font-medium uppercase mb-4">
                            Nội Thất MOHO
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Nội Thất MOHO là thương hiệu đến từ Savimex với gần
                            40 năm kinh nghiệm trong việc sản xuất và xuất khẩu
                            nội thất đạt chuẩn quốc tế.
                        </p>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h3 className="text-lg font-medium uppercase mb-4">
                            Dịch Vụ
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-gray-900 transition-colors">
                                    Chính Sách Bán Hàng
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-gray-900 transition-colors">
                                    Chính Sách Giao Hàng & Lắp Đặt
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-gray-900 transition-colors">
                                    Chính Sách Bảo Hành & Bảo Trì
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-gray-900 transition-colors">
                                    Chính Sách Đổi Trả
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-gray-900 transition-colors">
                                    Khách Hàng Thân Thiết – MOHOmie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-gray-900 transition-colors">
                                    Chính Sách Đối Tác Bán Hàng
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Information */}
                    <div>
                        <h3 className="text-lg font-medium uppercase mb-4">
                            Thông Tin Liên Hệ
                        </h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex">
                                <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">
                                        [Khu Vực Tp. Hồ Chí Minh]
                                    </p>
                                    <p>
                                        162 HT17, P. Hiệp Thành, Q. 12, TP. HCM
                                        (Nằm trong khuôn viên công ty SAVIMEX
                                        phía sau bến xe buýt Hiệp Thành)
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <span className="font-medium mr-2">
                                            Hotline:
                                        </span>
                                        <Link
                                            href="tel:0971141140"
                                            className="hover:text-gray-900 transition-colors">
                                            0971 141 140
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p>
                                        S05.03-S18 khu The Rainbow | Vinhomes
                                        Grand Park, TP. Thủ Đức.
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <span className="font-medium mr-2">
                                            Hotline:
                                        </span>
                                        <Link
                                            href="tel:0931880424"
                                            className="hover:text-gray-900 transition-colors">
                                            0931 880 424
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Fanpage */}
                    <div>
                        <h3 className="text-lg font-medium uppercase mb-4">
                            Fanpage
                        </h3>
                        <div className="text-sm text-gray-600">
                            <p>Nội Thất MOHO</p>
                            {/* Placeholder for social media embed or links */}
                            <div className="mt-3 flex space-x-3">
                                {socials?.map((social) => (
                                    <Link
                                        href={social.info}
                                        key={social.id}
                                        className="w-10 h-10 rounded-full">
                                        <Image
                                            src={social.image}
                                            alt={social.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} Nội Thất Furnora. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
