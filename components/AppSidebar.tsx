"use client";
import {
    Calendar,
    Home,
    NotebookText,
    Search,
    Settings,
    Printer,
    PrinterCheck,
    User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: PrinterCheck,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: NotebookText,
    },
    {
        title: "Blogs",
        url: "/admin/blogs",
        icon: Printer,
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: User,
    },
    {
        title: "Reviews",
        url: "/admin/reviews",
        icon: Settings,
    },
    {
        title: "Images",
        url: "/admin/images",
        icon: Search,
    },
    {
        title: "Tags",
        url: "/admin/tags",
        icon: Calendar,
    },
    {
        title: "Contacts",
        url: "/admin/contacts",
        icon: Calendar,
    },
    {
        title: "Settings",
        url: "/admin/siteInfo",
        icon: Settings,
    },
];

export function AppSidebar() {
    const { logoutAdmin } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        logoutAdmin();
        router.push("/");
    };
    return (
        <Sidebar>
            <SidebarContent className="flex flex-col justify-between min-h-screen py-6 items-start w-full">
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-xl">
                        Nav
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col space-y-6 pt-6">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="">
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon className="hover:text-sub hover:bg-sub text-sub" />
                                            <Button
                                                variant="link"
                                                className="text-sub font-semibold text-lg p-0">
                                                {item.title}
                                            </Button>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="flex justify-center items-center w-full">
                    <Button
                        className="text-main w-3/4 bg-sub hover:bg-[#b88e2f]/90 "
                        onClick={() => handleLogout()}>
                        Log out
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
