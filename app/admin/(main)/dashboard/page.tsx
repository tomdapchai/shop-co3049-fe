"use client";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProductDetail } from "@/types";
import { getAllProduct } from "@/services/ProductService";
import { getAllOrders } from "@/services/OrderServices";
import { getAllUsers } from "@/services/UserService";
import { getAllReviews } from "@/services/ReviewService";
import { Order, User, Review } from "@/types";
import {
    ColStatistic,
    PieStatistic,
    lastOrdersPeriodDays,
    lastUsersPeriodDays,
    lastRevenuePeriodDays,
    LineStatistic,
    lastStatsPeriodDays,
    formatPrice,
} from "@/lib/utils";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { Pie, PieChart, Cell, LabelList } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
type overview = {
    title: string;
    value: string;
    subValue?: string;
};

const pieChartConfig = {
    completed: {
        label: "Completed",
        color: "#4bf542",
    },
    pending: {
        label: "Pending",
        color: "hsl(48, 96%, 53%)", // Yellow
    },
    cancelled: {
        label: "Rejected",
        color: "hsl(0, 84%, 60%)", // Slightly red
    },
};

const lineChartConfig = {
    totalOrder: {
        label: "Total Orders",
        color: "hsl(220 70% 50%)",
    },
    totalUser: {
        label: "Total Users",
        color: "hsl(160 60% 45%)",
    },
    totalRevenue: {
        label: "Total Revenue",
        color: "hsl(30 80% 55%)",
    },
} satisfies ChartConfig;

const page = () => {
    const [overviewData, setOverviewData] = useState<overview[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [period, setPeriod] = useState<number>(7);
    const [orderColData, setOrderColData] = useState<ColStatistic[]>([]);
    const [orderPieData, setOrderPieData] = useState<PieStatistic[]>([]);
    const [userColData, setUserColData] = useState<ColStatistic[]>([]);
    const [revColData, setRevColData] = useState<ColStatistic[]>([]);
    const [lineChartData, setLineChartData] = useState<LineStatistic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        Promise.all([
            getAllProduct(),
            getAllOrders(),
            getAllUsers(),
            getAllReviews(),
        ]).then(([productData, orderData, userData, reviewData]) => {
            console.log(productData, orderData, userData);
            if ("error" in productData) {
                console.error(productData.error);
            } else {
                setProducts(productData);
            }
            if ("error" in orderData) {
                console.error(orderData.error);
            } else {
                setOrders(orderData);
            }
            if ("error" in userData) {
                console.error(userData.error);
            } else {
                setUsers(userData);
            }
            if ("error" in reviewData) {
                console.error(reviewData.error);
            } else {
                setReviews(reviewData);
            }
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        setOrderColData(
            lastOrdersPeriodDays(orders, period, "col") as ColStatistic[]
        );
        setOrderPieData(
            lastOrdersPeriodDays(orders, period, "pie") as PieStatistic[]
        );
        setUserColData(lastUsersPeriodDays(users, period) as ColStatistic[]);
        setRevColData(lastRevenuePeriodDays(orders, period) as ColStatistic[]);

        console.log("rev", lastRevenuePeriodDays(orders, period));

        setLineChartData(
            lastStatsPeriodDays(orders, users, period) as LineStatistic[]
        );

        console.log(
            "line",
            lastStatsPeriodDays(orders, users, period) as LineStatistic[]
        );

        setOverviewData([
            {
                title: "Total Orders",
                value: orders.length.toString(),
                subValue: `${
                    orders.filter((order) => order.status === "completed")
                        .length
                } completed, ${
                    orders.filter((order) => order.status === "pending").length
                } pending, ${
                    orders.filter((order) => order.status === "cancelled")
                        .length
                } cancelled`,
            },
            {
                title: "Total Revenue",
                value: formatPrice(
                    orders
                        .filter((order) => order.status === "completed")
                        .reduce((acc, cur) => acc + cur.total, 0)
                ),
            },
            {
                title: "Total Users",
                value: users.length.toString(),
                subValue: `${
                    users.filter((user) => user.status === "active").length
                } active, ${
                    users.filter((user) => user.status === "banned").length
                } banned`,
            },
            {
                title: "Total Products",
                value: products.length.toString(),
            },
            {
                title: "Total Reviews",
                value: reviews.length.toString(),
            },
        ]);
    }, [orders, users, products, period]);
    return (
        <div className="w-full flex h-full">
            <div className="p-6 flex flex-col space-y-4 w-full">
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <div className="w-full ">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {overviewData.map((item, index) => (
                            <Card key={index} className="">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {item.value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {item?.subValue}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <Select
                        value={period.toString()}
                        onValueChange={(value) => setPeriod(parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                                Last {period} days
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={orderColData}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="#adfa1d"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>
                                Last {period} days
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={userColData}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="#2563eb"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue (1000 VND)</CardTitle>
                            <CardDescription>
                                Last {period} days
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={revColData}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="#adfa1d"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders statuses</CardTitle>
                            <CardDescription>
                                Last {period} days
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={pieChartConfig}
                                className="mx-auto aspect-square h-[300px]">
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={orderPieData}
                                        dataKey="total"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        label>
                                        {orderPieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    pieChartConfig[entry.status]
                                                        .color
                                                }
                                            />
                                        ))}
                                        <LabelList
                                            dataKey="status"
                                            position="outside"
                                            className="fill-foreground"
                                            formatter={(
                                                value: keyof typeof pieChartConfig
                                            ) => pieChartConfig[value].label}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Completed:{" "}
                                {orderPieData.find(
                                    (d) => d.status === "completed"
                                )?.total || 0}
                            </div>
                            <div>
                                Pending:{" "}
                                {orderPieData.find(
                                    (d) => d.status === "pending"
                                )?.total || 0}
                            </div>
                            <div>
                                Cancelled:{" "}
                                {orderPieData.find(
                                    (d) => d.status === "cancelled"
                                )?.total || 0}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="grid grid-cols-1 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Orders, Revenue and User registered
                            </CardTitle>
                            <CardDescription>
                                Last {period} days
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={lineChartConfig}
                                className="h-[300px] w-full">
                                <LineChart
                                    accessibilityLayer
                                    data={lineChartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}>
                                    <CartesianGrid vertical={true} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={true}
                                        axisLine={true}
                                        tickMargin={8}
                                        tickFormatter={(value) =>
                                            value.slice(0, 10)
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Line
                                        dataKey="totalOrder"
                                        type="monotone"
                                        stroke="hsl(220 70% 50%)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        dataKey="totalUser"
                                        type="monotone"
                                        stroke="hsl(160 60% 45%)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        dataKey="totalRevenue"
                                        type="monotone"
                                        stroke="hsl(30 80% 55%)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter>
                            <div className="flex justify-between w-full text-sm text-muted-foreground">
                                <div>
                                    Total Orders:{" "}
                                    {lineChartData.reduce(
                                        (acc, cur) => acc + cur.totalOrder,
                                        0
                                    )}
                                </div>
                                <div>
                                    Total Users:{" "}
                                    {lineChartData.reduce(
                                        (acc, cur) => acc + cur.totalUser,
                                        0
                                    )}
                                </div>
                                <div>
                                    Total Revenue:{" "}
                                    {lineChartData.reduce(
                                        (acc, cur) => acc + cur.totalRevenue,
                                        0
                                    )}{" "}
                                    (10M VND)
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default page;
