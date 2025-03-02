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
} from "@/services/SubscribeService";

const SUBSCRIBERS_PER_PAGE = 20;

const page = () => {
    const [subcribers, setSubcribers] = useState<subcriber[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

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

    const filteredSubcribers = subcribers.filter((subcriber) =>
        subcriber.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedContacts = filteredSubcribers.slice(
        (currentPage - 1) * SUBSCRIBERS_PER_PAGE,
        currentPage * SUBSCRIBERS_PER_PAGE
    );

    const totalPages = Math.ceil(
        filteredSubcribers.length / SUBSCRIBERS_PER_PAGE
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
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedContacts.map((subcriber) => (
                            <TableRow key={subcriber.id}>
                                <TableCell>{subcriber.id}</TableCell>
                                <TableCell>{subcriber.email}</TableCell>
                                <TableCell>
                                    <Button
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
