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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpDown } from "lucide-react";
import { getAllContacts, ContactReceive } from "@/services/ContactService";

const CONTACTS_PER_PAGE = 20;

type SortKey = "sendAt" | "contactId";

export default function ContactPage() {
    const [contacts, setContacts] = useState<ContactReceive[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedContact, setSelectedContact] =
        useState<ContactReceive | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>("sendAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllContacts().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                console.log("Contacts", data);
                setContacts(data);
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

    const sortContacts = (contactsToSort: typeof contacts) => {
        return [...contactsToSort].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    };

    const filteredContacts = contacts.filter((contact) =>
        (
            contact.name.toLowerCase() +
            contact.email +
            contact.message +
            contact.phoneNumber +
            contact.subject
        ).includes(searchQuery.toLowerCase())
    );

    const sortedContacts = sortContacts(filteredContacts);

    const paginatedContacts = sortedContacts.slice(
        (currentPage - 1) * CONTACTS_PER_PAGE,
        currentPage * CONTACTS_PER_PAGE
    );

    const totalPages = Math.ceil(sortedContacts.length / CONTACTS_PER_PAGE);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Contact Management</h1>
            <Input
                placeholder="Search contacts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                ID <SortButton column="contactId" />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>
                                Timestamp <SortButton column="sendAt" />
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedContacts.map((contact) => (
                            <TableRow key={contact.contactId}>
                                <TableCell>{contact.contactId}</TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.subject}</TableCell>
                                <TableCell>
                                    {new Date(contact.sendAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setSelectedContact(contact)
                                        }>
                                        View Details
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
            <Dialog
                open={!!selectedContact}
                onOpenChange={() => setSelectedContact(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contact Details</DialogTitle>
                        <DialogDescription>
                            Full information about the selected contact.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedContact && (
                        <div className="grid gap-4 py-4">
                            <div>
                                <h3 className="font-semibold">Sended At</h3>
                                <p>
                                    {new Date(
                                        selectedContact.sendAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Name</h3>
                                <p>{selectedContact.name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>{selectedContact.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Phone Number</h3>
                                <p>{selectedContact.phoneNumber || "N/A"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Subject</h3>
                                <p>{selectedContact.subject || "N/A"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Message</h3>
                                <p>{selectedContact.message}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
