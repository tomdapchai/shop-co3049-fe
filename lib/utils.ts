import { Order, productOrderTrue, User } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
    });
};

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(date);
}

export const sortProducts = (products: any[], sortBy: string) => {};

export function convertToReact(input: string): string {
    const rules = [
        {
            regex: /HEADLINE<([^>]+)>/g,
            replace: '<h1 class="text-2xl font-bold mb-4">$1</h1>',
        },
        {
            regex: /SECTION<([^>]+)>/g,
            replace: '<h2 class="text-lg font-bold mb-2">$1</h2>',
        },
        {
            regex: /LINK<([^,]+),\s*([^>]+)>/g,
            replace:
                '<a href="$2" class="text-black hover:text-slate-500 underline">$1</a>',
        },
        {
            regex: /IMG<([^,]+),\s*([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,
            // @ts-ignore
            replace: (_, alt, src, width, height) =>
                `<div class="w-full flex justify-center items-center">
            <Image src="${src}" alt="${alt}" ${
                    width ? `width="${width}"` : ""
                } ${
                    height ? `height="${height}"` : ""
                } class="rounded-lg" /></div>`,
        },
        {
            regex: /P<([^>]+)>/g,
            // Custom logic for line breaks
            // @ts-ignore
            replace: (_, content) => {
                // @ts-ignore
                const lines = content.split(/\n/).map((line) => line.trim());
                const formattedLines = lines.join("<br/>");
                return `<p class="text-base text-black">${formattedLines}</p>`;
            },
        },
    ];

    let converted = input;
    for (const rule of rules) {
        // @ts-ignore
        converted = converted.replace(rule.regex, rule.replace);
    }

    return `<div class="w-full flex flex-col justify-center items-start">${converted}</div>`;
}

export const uploadToCDN = async (
    file: File
): Promise<string | { error: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yxg1dfzu");

    try {
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await res.json();
        if (data.secure_url) {
            return data.secure_url; // Return the secure URL for the uploaded image
        } else {
            console.error("Cloudinary error response:", data);
            return { error: "Invalid response from Cloudinary" };
        }
    } catch (error) {
        console.error("Upload error:", error);
        return { error: "Upload error" };
    }
};

export type ColStatistic = {
    date: string;
    total: number;
};

export type PieStatistic = {
    status: "completed" | "pending" | "cancelled";
    total: number;
};

export type LineStatistic = {
    date: string;
    totalOrder: number;
    totalRevenue: number;
    totalUser: number;
};

export function lastOrdersPeriodDays(
    total: Order[],
    p: number,
    type: "col" | "pie"
): ColStatistic[] | PieStatistic[] {
    const currentDate = new Date();

    if (type === "col") {
        const statistics: ColStatistic[] = [];

        for (let i = p; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);

            const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            const ordersForDate = total.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (
                    orderDate.getDate() === date.getDate() &&
                    orderDate.getMonth() === date.getMonth() &&
                    orderDate.getFullYear() === date.getFullYear()
                );
            });

            statistics.push({
                date: formattedDate,
                total: ordersForDate.length,
            });
        }

        return statistics;
    } else {
        const statusCounts: Record<string, number> = {
            completed: 0,
            pending: 0,
            cancelled: 0,
        };

        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - p);

        total.forEach((order) => {
            const orderDate = new Date(order.createdAt);
            if (orderDate >= startDate && orderDate <= currentDate) {
                statusCounts[order.status] =
                    (statusCounts[order.status] || 0) + 1;
            }
        });

        return Object.entries(statusCounts).map(([status, total]) => ({
            status: status as "completed" | "pending" | "cancelled",
            total,
        }));
    }
}

export function lastUsersPeriodDays(total: User[], p: number): ColStatistic[] {
    const currentDate = new Date();
    const statistics: ColStatistic[] = [];

    for (let i = p; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);

        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const usersForDate = total.filter((user) => {
            const userDate = new Date(user.joinAt);
            return (
                userDate.getDate() === date.getDate() &&
                userDate.getMonth() === date.getMonth() &&
                userDate.getFullYear() === date.getFullYear()
            );
        });

        statistics.push({
            date: formattedDate,
            total: usersForDate.length,
        });
    }

    return statistics;
}

export function lastRevenuePeriodDays(
    total: Order[],
    p: number
): ColStatistic[] {
    const currentDate = new Date();
    const statistics: ColStatistic[] = [];

    for (let i = p; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);

        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const ordersForDate = total.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return (
                orderDate.getDate() === date.getDate() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear()
            );
        });

        const totalRevenue = ordersForDate.reduce(
            (acc, order) =>
                acc + (order.status === "completed" ? order.total : 0),
            0
        );

        statistics.push({
            date: formattedDate,
            total: totalRevenue / 1000,
        });
    }

    return statistics;
}

export function lastStatsPeriodDays(
    orders: Order[],
    users: User[],
    period: number
): LineStatistic[] {
    const currentDate = new Date();
    const statistics: LineStatistic[] = [];

    for (let i = period; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);

        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const ordersForDate = orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return (
                orderDate.getDate() === date.getDate() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear()
            );
        });

        const usersForDate = users.filter((user) => {
            const userDate = new Date(user.joinAt);
            return (
                userDate.getDate() === date.getDate() &&
                userDate.getMonth() === date.getMonth() &&
                userDate.getFullYear() === date.getFullYear()
            );
        });

        const totalRevenue = ordersForDate.reduce(
            (acc, order) =>
                acc + (order.status === "completed" ? order.total : 0),
            0
        );

        statistics.push({
            date: formattedDate,
            totalOrder: ordersForDate.length,
            totalRevenue: totalRevenue / 10000000,
            totalUser: usersForDate.length,
        });
    }

    return statistics;
}
