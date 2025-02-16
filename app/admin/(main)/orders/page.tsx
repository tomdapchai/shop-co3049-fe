"use client";
import { useState, useEffect } from "react";
import {
    getAllOrders,
    GetOrdersByUserId,
    updateOrderStatus,
} from "@/services/OrderServices";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import OrderCard from "@/components/card/OrderCard";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, formatDate } from "@/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ORDERS_PER_PAGE = 6;

const page = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllOrders().then((data) => {
            if ("error" in data) {
                console.log(data.error);
            } else {
                setFilteredOrders(data);
                setOrders(data);
            }
        });
    }, []);

    useEffect(() => {
        let result = [...orders];

        if (statusFilter !== "all") {
            result = result.filter((order) => order.status === statusFilter);
        }

        if (searchTerm) {
            result = result.filter((order) =>
                order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        result.sort((a, b) => {
            if (sortBy === "orderId") {
                return sortOrder === "asc"
                    ? a.orderId > b.orderId
                        ? 1
                        : -1
                    : b.orderId > a.orderId
                    ? 1
                    : -1;
            } else if (sortBy === "status") {
                return sortOrder === "asc"
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            } else {
                return sortOrder === "asc"
                    ? new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime();
            }
        });

        setFilteredOrders(result);
        setCurrentPage(1);
    }, [orders, statusFilter, sortBy, sortOrder, searchTerm]);

    const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(
        (order) => order.status === "completed"
    ).length;
    const pendingOrders = orders.filter(
        (order) => order.status === "pending"
    ).length;
    const cancelledOrders = orders.filter(
        (order) => order.status === "cancelled"
    ).length;

    const pageCount = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ORDERS_PER_PAGE,
        currentPage * ORDERS_PER_PAGE
    );

    const handleUpdateStatusOrder = async (orderId: string, status: string) => {
        await updateOrderStatus(orderId, status).then((res) => {
            if ("error" in res) {
                console.error("Error updating order status:", res.error);
            } else {
                console.log("Order status updated:", res.message);
                // set orders to the updated status order
                setOrders((prevOrders) => {
                    return prevOrders.map((order) => {
                        if (order.orderId === orderId) {
                            return { ...order, status };
                        }
                        return order;
                    });
                });
            }
        });
    };

    return (
        <div className="w-full space-y-6 my-6 pr-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard
                    title="Total Amount"
                    value={formatPrice(totalAmount)}
                />
                <MetricCard
                    title="Total Orders"
                    value={totalOrders.toString()}
                />
                <MetricCard
                    title="Order Status"
                    value={`${completedOrders} completed, ${pendingOrders} pending, ${cancelledOrders} cancelled`}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    placeholder="Search by Order ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:w-1/3"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="createdAt">Date</SelectItem>
                        <SelectItem value="orderId">Order ID</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }>
                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 items-start justify-start gap-4">
                {paginatedOrders.map((order) => (
                    <OrderCard
                        key={order.orderId}
                        order={order}
                        admin
                        onCancel={() =>
                            handleUpdateStatusOrder(order.orderId, "cancelled")
                        }
                        onComplete={() =>
                            handleUpdateStatusOrder(order.orderId, "completed")
                        }
                    />
                ))}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            isActive={!(currentPage === 1)}
                        />
                    </PaginationItem>
                    {[...Array(pageCount)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setCurrentPage(i + 1)}
                                isActive={currentPage === i + 1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, pageCount)
                                )
                            }
                            isActive={!(currentPage === pageCount)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

function MetricCard({ title, value }: { title: string; value: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

export default page;
