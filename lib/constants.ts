import { navLink } from "@/types";

export const links: navLink[] = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Products",
        url: "/shop",
    },
    {
        title: "Rooms",
        url: "/shop",
    },
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Contact",
        url: "/contact",
    },
    {
        title: "Blog",
        url: "/blog",
    },
];

export const sizeOptions = [
    { id: "compact", label: "Compact" },
    { id: "standard", label: "Standard" },
    { id: "large", label: "Large" },
    { id: "oversized", label: "Oversized" },
];

export const colorOptions = [
    { id: "black", label: "Black" },
    { id: "yellow", label: "Yellow" },
    { id: "violet", label: "Violet" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
];

export const categoryImages = [
    {
        title: "Dining",
        src: "/images/categories/categories-1.png",
        alt: "dining",
    },
    {
        title: "Living",
        src: "/images/categories/categories-2.png",
        alt: "living",
    },
    {
        title: "Bedroom",
        src: "/images/categories/categories-3.png",
        alt: "bedroom",
    },
];
