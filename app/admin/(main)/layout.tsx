import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="relative w-full h-full flex flex-col justify-between ">
                <div className="flex min-w-full flex-grow">
                    <SidebarTrigger />
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default layout;
