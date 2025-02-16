"use client";
import { useState, useEffect } from "react";
import { Review } from "@/types";
import { User } from "@/types";
import { getAllUsers } from "@/services/UserService";
import { Order } from "@/types";
import { getAllOrders } from "@/services/OrderServices";
import { getAllReviews } from "@/services/ReviewService";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MAX_USERS_PER_PAGE = 50;

type DisplayUser = {
    userId: number;
    name: string | undefined;
    joinAt: string;
    numOrders: number;
    numReviews: number;
    totalOrderPayment: number;
    status: "active" | "banned";
};

const page = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [proccesedUser, setProccesedUser] = useState<DisplayUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("joinAt");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        getAllUsers().then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            } else {
                console.log("Users:", data);
                setUsers(data);
            }
        });
        getAllOrders().then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            } else {
                console.log("Orders:", data);
                setOrders(data);
            }
        });
        getAllReviews().then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            } else {
                console.log("Reviews:", data);
                setReviews(data);
            }
        });
    }, []);

    useEffect(() => {
        const proccessed = users.map((user) => {
            const userOrders = orders.filter(
                (order) => Number(order.userId) === Number(user.userId)
            );
            const userReviews = reviews.filter(
                (review) => Number(review.userId) === Number(user.userId)
            );
            return {
                userId: user.userId,
                name: user.name,
                joinAt: user.joinAt,
                numOrders: userOrders.length,
                numReviews: userReviews.length,
                totalOrderPayment: userOrders.reduce(
                    (acc, order) =>
                        acc + (order.status == "completed" ? order.total : 0),
                    0
                ),
                status: user.status,
            };
        });

        setProccesedUser(proccessed);
        setTotalPages(Math.ceil(proccessed.length / MAX_USERS_PER_PAGE));
    }, [users, orders, reviews]);

    const filteredUsers = proccesedUser
        .filter(
            (user) =>
                (user.userId.toString().includes(searchTerm) ||
                    user.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())) &&
                (filterStatus === "all" || user.status === filterStatus)
        )
        .sort((a, b) => {
            if (sortBy === "joinAt")
                return (
                    new Date(b.joinAt).getTime() - new Date(a.joinAt).getTime()
                );
            if (sortBy === "totalPayment")
                return b.totalOrderPayment - a.totalOrderPayment;
            if (sortBy === "totalOrder") return b.numOrders - a.numOrders;
            if (sortBy === "totalReview") return b.numReviews - a.numReviews;
            return 0;
        });

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * MAX_USERS_PER_PAGE,
        currentPage * MAX_USERS_PER_PAGE
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Search by User ID or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="joinAt">Join Date</SelectItem>
                            <SelectItem value="totalPayment">
                                Total Payment
                            </SelectItem>
                            <SelectItem value="totalOrder">
                                Total Orders
                            </SelectItem>
                            <SelectItem value="totalReview">
                                Total Reviews
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="banned">Banned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead>Total Payment</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.map((user) => (
                        <TableRow
                            key={user.userId}
                            onClick={() =>
                                router.push(`/admin/users/${user.userId}`)
                            }
                            className="cursor-pointer">
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                {new Date(user.joinAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{user.numOrders}</TableCell>
                            <TableCell>{user.numReviews}</TableCell>
                            <TableCell>
                                {formatPrice(user.totalOrderPayment)}
                            </TableCell>
                            <TableCell>{user.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            isActive={!(currentPage === 1)}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
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
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            isActive={!(currentPage === totalPages)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default page;
