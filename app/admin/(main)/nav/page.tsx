"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    MoveUp,
    MoveDown,
    GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { navLink } from "@/types";
import { navLinkSchema } from "@/lib/validation";
import {
    getAllNavLinks,
    createNavLink,
    updateNavLink,
    deleteNavLink,
    updateNavLinkOrder,
    navLinkWithId,
} from "@/services/NavService";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const NavManagement = () => {
    const { toast } = useToast();
    const [navLinks, setNavLinks] = useState<navLinkWithId[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNavLink, setEditingNavLink] = useState<navLinkWithId | null>(
        null
    );

    useEffect(() => {
        fetchNavLinks();
    }, []);

    const fetchNavLinks = async () => {
        const data = await getAllNavLinks();
        if ("error" in data) {
            console.error(data.error);
            toast({
                title: "Error",
                description: data.error,
                variant: "destructive",
            });
        } else {
            setNavLinks(data);
        }
    };

    const handleAddNavLink = async (data: navLink) => {
        const result = await createNavLink(data);
        if ("error" in result) {
            toast({
                title: "Error creating navigation link",
                description: result.error,
                variant: "destructive",
            });
            return;
        }

        setIsDialogOpen(false);
        toast({
            title: "Navigation link added",
            description: `"${data.title}" has been added successfully.`,
        });
        fetchNavLinks();
    };

    const handleEditNavLink = async (data: navLinkWithId) => {
        const result = await updateNavLink(data);
        if ("error" in result) {
            toast({
                title: "Error updating navigation link",
                description: result.error,
                variant: "destructive",
            });
            return;
        }

        setNavLinks(
            navLinks.map((link) =>
                link.id === data.id ? { ...link, ...data } : link
            )
        );
        setIsDialogOpen(false);
        toast({
            title: "Navigation link updated",
            description: `"${data.title}" has been updated successfully.`,
        });
    };

    const handleDeleteNavLink = async (id: number) => {
        const result = await deleteNavLink(id);
        if ("error" in result) {
            toast({
                title: "Error deleting navigation link",
                description: result.error,
                variant: "destructive",
            });
            return;
        }

        setNavLinks(navLinks.filter((link) => link.id !== id));
        toast({
            title: "Navigation link deleted",
            description: "Navigation link has been deleted successfully.",
        });
    };

    const openEditDialog = (navLink: navLinkWithId) => {
        setEditingNavLink(navLink);
        setIsDialogOpen(true);
    };

    const handleMoveUp = async (index: number) => {
        if (index === 0) return;

        const newLinks = [...navLinks];
        const movedLink = {
            ...newLinks[index],
            display_order: newLinks[index - 1].display_order,
        };
        const previousLink = {
            ...newLinks[index - 1],
            display_order: newLinks[index].display_order,
        };

        newLinks[index] = movedLink;
        newLinks[index - 1] = previousLink;

        // Sort by display_order to update visual order
        newLinks.sort((a, b) => a.display_order - b.display_order);

        setNavLinks(newLinks);

        // Update order in backend
        const result = await updateNavLinkOrder([movedLink, previousLink]);
        if ("error" in result) {
            toast({
                title: "Error updating order",
                description: result.error,
                variant: "destructive",
            });
            fetchNavLinks(); // Reset to original order
        }
    };

    const handleMoveDown = async (index: number) => {
        if (index === navLinks.length - 1) return;

        const newLinks = [...navLinks];
        const movedLink = {
            ...newLinks[index],
            display_order: newLinks[index + 1].display_order,
        };
        const nextLink = {
            ...newLinks[index + 1],
            display_order: newLinks[index].display_order,
        };

        newLinks[index] = movedLink;
        newLinks[index + 1] = nextLink;

        // Sort by display_order to update visual order
        newLinks.sort((a, b) => a.display_order - b.display_order);

        setNavLinks(newLinks);

        // Update order in backend
        const result = await updateNavLinkOrder([movedLink, nextLink]);
        if ("error" in result) {
            toast({
                title: "Error updating order",
                description: result.error,
                variant: "destructive",
            });
            fetchNavLinks(); // Reset to original order
        }
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const items = Array.from(navLinks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update display_order values
        const updatedItems = items.map((item, index) => ({
            ...item,
            display_order: index + 1,
        }));

        setNavLinks(updatedItems);

        // Send the updated order to the server
        const result2 = await updateNavLinkOrder(updatedItems);
        if ("error" in result2) {
            toast({
                title: "Error updating order",
                description: result2.error,
                variant: "destructive",
            });
            fetchNavLinks(); // Reset to original order
        }
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Navigation Links Management</CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => setEditingNavLink(null)}
                                className="flex items-center gap-1">
                                <Plus className="h-4 w-4" /> Add Navigation Link
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingNavLink
                                        ? "Edit Navigation Link"
                                        : "Add New Navigation Link"}
                                </DialogTitle>
                            </DialogHeader>
                            <NavLinkForm
                                onSubmit={
                                    editingNavLink
                                        ? handleEditNavLink
                                        : handleAddNavLink
                                }
                                initialData={editingNavLink}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="overflow-x-auto no-scrollbar">
                    <p className="text-sm text-gray-500 mb-4">
                        Drag and drop navigation links to reorder them, or use
                        the up/down buttons. The order here will be reflected in
                        the site navigation from left to right.
                    </p>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="navLinks">
                            {(provided) => (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                style={{
                                                    width: "50px",
                                                }}></TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>URL</TableHead>
                                            <TableHead>Order</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {navLinks.map((link, index) => (
                                            <Draggable
                                                key={link.id.toString()}
                                                draggableId={link.id.toString()}
                                                index={index}>
                                                {(provided) => (
                                                    <TableRow
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}>
                                                        <TableCell>
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="cursor-move">
                                                                <GripVertical className="h-4 w-4" />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {link.title}
                                                        </TableCell>
                                                        <TableCell>
                                                            {link.url}
                                                        </TableCell>
                                                        <TableCell>
                                                            {link.display_order}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleMoveUp(
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        index ===
                                                                        0
                                                                    }>
                                                                    <MoveUp className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleMoveDown(
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        index ===
                                                                        navLinks.length -
                                                                            1
                                                                    }>
                                                                    <MoveDown className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        openEditDialog(
                                                                            link
                                                                        )
                                                                    }>
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleDeleteNavLink(
                                                                            link.id
                                                                        )
                                                                    }>
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </TableBody>
                                </Table>
                            )}
                        </Droppable>
                    </DragDropContext>
                </CardContent>
            </Card>
        </div>
    );
};

interface NavLinkFormProps {
    onSubmit: (data: any) => void;
    initialData: navLinkWithId | null;
}

function NavLinkForm({ onSubmit, initialData }: NavLinkFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof navLinkSchema>>({
        resolver: zodResolver(navLinkSchema),
        defaultValues: initialData
            ? {
                  title: initialData.title,
                  url: initialData.url,
              }
            : {
                  title: "",
                  url: "",
              },
    });

    const submitForm = (data: z.infer<typeof navLinkSchema>) => {
        if (initialData) {
            onSubmit({
                ...data,
                id: initialData.id,
                display_order: initialData.display_order,
            });
        } else {
            onSubmit(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                    <p className="text-sm text-destructive">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" {...register("url")} />
                {errors.url && (
                    <p className="text-sm text-destructive">
                        {errors.url.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit">
                    {initialData
                        ? "Update Navigation Link"
                        : "Add Navigation Link"}
                </Button>
            </div>
        </form>
    );
}

export default NavManagement;
