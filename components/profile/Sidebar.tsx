"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "detail", label: "Account detail" },
    { href: "orders-history", label: "Orders history" },
    { href: "security", label: "Security" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="space-y-2">
            {navItems.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    variant={pathname.includes(item.href) ? "default" : "ghost"}
                    className={`${
                        pathname.includes(item.href)
                            ? "bg-sub hover:bg-[#b88e2f]/90 text-main"
                            : ""
                    } w-full justify-start`}>
                    <Link href={item.href}>{item.label}</Link>
                </Button>
            ))}
        </nav>
    );
}
