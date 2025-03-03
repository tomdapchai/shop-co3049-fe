"use client";

import { useEffect, useState } from "react";
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
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { subcriber } from "@/types";
import {
    getAllSubscribers,
    deleteSubscriber,
    subcribeReceive,
} from "@/services/SubscribeService";
import { ArrowUpDown } from "lucide-react";

const SUBSCRIBERS_PER_PAGE = 20;

type SortKey = "sendAt" | "id";

const page = () => {
    const [subcribers, setSubcribers] = useState<subcribeReceive[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [sortKey, setSortKey] = useState<SortKey>("sendAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        getAllSubscribers().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                console.log("Subcribers", data);
                setSubcribers(data);
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleSort = (key: SortKey) => {
        setSortKey(key);
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const SortButton = ({ column }: { column: SortKey }) => (
        <Button
            variant="ghost"
            onClick={() => handleSort(column)}
            className="h-8 w-8 p-0">
            <span className="sr-only">Sort by {column}</span>
            <ArrowUpDown className="h-4 w-4" />
        </Button>
    );

    const sortSubcribers = (subcribersToSort: typeof subcribers) => {
        return [...subcribersToSort].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    };

    const filteredSubcribers = subcribers.filter((subcriber) =>
        subcriber.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedSubcribers = sortSubcribers(filteredSubcribers);

    const paginatedContacts = sortedSubcribers.slice(
        (currentPage - 1) * SUBSCRIBERS_PER_PAGE,
        currentPage * SUBSCRIBERS_PER_PAGE
    );

    const totalPages = Math.ceil(
        sortedSubcribers.length / SUBSCRIBERS_PER_PAGE
    );

    const handleDelete = async (id: string) => {
        const response = await deleteSubscriber(id);
        if ("error" in response) {
            console.error(response.error);
        } else {
            console.log(response.message);
            setSubcribers(
                subcribers.filter((subcriber) => subcriber.id !== id)
            );
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Subcribers Mangement</h1>
            <Input
                placeholder="Search subcribers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                ID <SortButton column="id" />
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>
                                Timestamp <SortButton column="sendAt" />
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedContacts.map((subcriber) => (
                            <TableRow key={subcriber.id}>
                                <TableCell>{subcriber.id}</TableCell>
                                <TableCell>{subcriber.email}</TableCell>
                                <TableCell>
                                    {new Date(
                                        subcriber.sendAt
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="bg-red-500 hover:bg-red-500/90"
                                        onClick={() =>
                                            handleDelete(subcriber.id)
                                        }>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        );
                                    }}
                                />
                            </PaginationItem>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === page}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(page);
                                        }}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        );
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default page;
