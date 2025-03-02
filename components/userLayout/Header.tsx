"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Separator } from "../ui/separator";
import ProductCartCard from "../card/ProductCartCard";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProductSearch } from "../dialog/SearchDialog";
import { updateCart } from "@/services/UserService";
import { useProduct } from "@/context/ProductContext";
import { category } from "@/types";
import ProductCategoriesMenu from "../ProductCategoriesMenu";
import ProductRoomsMenu from "../ProductRoomMenu";

const Header = () => {
    // const {userId} = useAuth();
    const { isLoggedIn, logoutUser, userId, user } = useAuth();
    const { categories, siteInfo, rooms, navLinks } = useProduct();
    const {
        cart,
        test,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearCartUser,
    } = useCart();
    console.log(test);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
    const headerIcons = [
        {
            alt: "Profile",
            src: "/images/icons/user.svg",
            url: `/profile/${userId}/detail`,
        },
    ];

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleLogout = async () => {
        await logoutUser()
            .then(() => {
                router.push("/");
                clearCart();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <header className="w-full flex justify-between p-4 sticky top-0 left-0 z-50 backdrop-blur-md border-b border-gray-400">
            <div className="flex justify-between items-center gap-2">
                <Link href="/">
                    <Image
                        src={siteInfo?.logo || "/images/logo.png"}
                        alt="logo"
                        width={50}
                        height={50}
                    />
                </Link>
                <h1 className="font-bold text-xl">Furnora</h1>
            </div>

            {isLargeScreen ? (
                <>
                    <div className="flex justify-between items-center gap-10">
                        {navLinks.map((link) =>
                            link.title !== "Products" &&
                            link.title !== "Rooms" ? (
                                <Link key={link.title} href={link.url}>
                                    <Button
                                        variant="link"
                                        className="font-bold">
                                        {link.title}
                                    </Button>
                                </Link>
                            ) : link.title === "Products" ? (
                                <ProductCategoriesMenu
                                    key={link.title}
                                    categories={categories}
                                />
                            ) : (
                                <ProductRoomsMenu
                                    key={link.title}
                                    rooms={rooms}
                                />
                            )
                        )}
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <ProductSearch />
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger className="flex items-center justify-start space-x-2">
                                <Image
                                    src={"/images/icons/cart.svg"}
                                    alt={"Cart"}
                                    width={20}
                                    height={20}
                                />
                                <span
                                    className={`${
                                        cart.length > 0
                                            ? "text-white text-sm bg-red-500 rounded-full w-5 h-5 flex justify-center items-center"
                                            : ""
                                    }`}>
                                    {cart.length}
                                </span>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Cart items</SheetTitle>
                                </SheetHeader>
                                {cart.length > 0 ? (
                                    <div className="flex flex-col justify-start items-start space-y-4 w-full">
                                        <div className="flex flex-col justify-start items-start space-y-2 w-full">
                                            {cart.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full">
                                                    <ProductCartCard
                                                        product={item}
                                                        onRemove={
                                                            removeFromCart
                                                        }
                                                        updateQuantity={
                                                            updateQuantity
                                                        }
                                                        index={index}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <Separator className="mt-2" />
                                        <div className="flex w-full justify-between items-center">
                                            <Link href="/cart">
                                                <Button
                                                    className="bg-sub hover:bg-[#b88e2f]/90"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }>
                                                    View Cart
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={
                                                    isLoggedIn
                                                        ? clearCartUser
                                                        : clearCart
                                                }
                                                className="bg-red-500 hover:bg-red-500/90">
                                                <p className="text-white">
                                                    Clear Cart
                                                </p>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-full justify-start items-start space-y-2">
                                        <p>There is no product selected</p>
                                        <Link href="/shop">
                                            <Button
                                                className="bg-sub hover:bg-[#b88e2f]/90"
                                                onClick={() => setOpen(false)}>
                                                <p className="text-main">
                                                    Continue Shopping
                                                </p>
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>

                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full flex justify-center items-center">
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src="/images/icons/user.svg"
                                                className="w-6 h-6"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link
                                            href={`/profile/${userId}/detail`}>
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem
                                            onClick={() => handleLogout()}>
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex justify-start items-center space-x-4">
                                <Link href={"/sign-in"}>
                                    <Button className="bg-sub hover:bg-[#b88e2f]/90 px-4 py-2 text-main">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={"/sign-up"}>
                                    <Button className="bg-main hover:bg-[#fff3e3]/90 px-4 py-2 text-sub">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                    <SheetTrigger>
                        <Image
                            src={"/images/icons/menu.svg"}
                            alt="Menu"
                            width={30}
                            height={30}
                        />
                    </SheetTrigger>
                    <SheetContent className="w-[250px] flex flex-col justify-between items-start ">
                        <div className="w-full">
                            <SheetHeader>
                                <SheetTitle className="text-xl">
                                    Menu
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col justify-start items-start">
                                    {navLinks.map((link) => (
                                        <div
                                            className="w-full"
                                            key={link.title}>
                                            <Link href={link.url}>
                                                <Button
                                                    variant="ghost"
                                                    className="font-bold text-md p-0 m-0">
                                                    {link.title}
                                                </Button>
                                            </Link>
                                            <Separator />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center gap-2 h-[20px]">
                                    <ProductSearch
                                        onClick={() =>
                                            setMobileSheetOpen(false)
                                        }
                                    />
                                    <div className="flex justify-start items-start space-x-2">
                                        <Image
                                            src={"/images/icons/cart.svg"}
                                            alt={"Cart"}
                                            width={20}
                                            height={20}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setMobileSheetOpen(false);
                                                router.push("/cart");
                                            }}
                                        />
                                        <span
                                            className={`${
                                                cart.length > 0
                                                    ? "text-white text-sm bg-red-500 rounded-full w-5 h-5 flex justify-center items-center"
                                                    : ""
                                            }`}>
                                            {cart.length}
                                        </span>
                                    </div>

                                    {isLoggedIn &&
                                        headerIcons.map((icon) => (
                                            <Link
                                                key={icon.alt}
                                                href={icon.url}
                                                onClick={() => {
                                                    setMobileSheetOpen(false);
                                                }}>
                                                <Button
                                                    size="icon"
                                                    variant="ghost">
                                                    <Image
                                                        src={icon.src}
                                                        alt={icon.alt}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </Button>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <SheetFooter className="w-full">
                            <div className="w-full flex justify-center items-center">
                                {isLoggedIn && (
                                    <Button
                                        onClick={() => handleLogout()}
                                        className="bg-sub hover:bg-[#b88e2f]/90 w-full">
                                        Log out
                                    </Button>
                                )}
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            )}
        </header>
    );
};

export default Header;
