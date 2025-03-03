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
import ImageUploader from "@/components/form/ImageUploader";
import { uploadToCDN } from "@/lib/utils";
import { roomSchema } from "@/lib/validation";
import { room } from "@/types";
import { UploadedImage } from "../blogs/create/page";
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    updateRoomOrder,
    roomWithId,
} from "@/services/RoomService";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function RoomManagement() {
    const { toast } = useToast();
    const [rooms, setRooms] = useState<roomWithId[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<roomWithId | null>(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const res = await getAllRooms();
        if ("error" in res) {
            toast({
                title: "Error fetching rooms",
                description: res.error,
                variant: "destructive",
            });
            return;
        }
        setRooms(res);
    };

    const handleAddRoom = async (newRoom: room) => {
        await createRoom(newRoom)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error creating room",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                fetchRooms(); // Refetch to get updated display_order
            })
            .finally(() => {
                setIsDialogOpen(false);
                toast({
                    title: "Room added",
                    description: `${newRoom.name} has been added successfully.`,
                });
            });
    };

    const handleEditRoom = async (updatedRoom: room) => {
        await updateRoom(updatedRoom)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error updating room",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setRooms(
                    rooms.map((room) =>
                        room.roomId === updatedRoom.roomId
                            ? { ...room, ...updatedRoom }
                            : room
                    )
                );
            })
            .finally(() => {
                setIsDialogOpen(false);
                setEditingRoom(null);
                toast({
                    title: "Room updated",
                    description: `${updatedRoom.name} has been updated successfully.`,
                });
            });
    };

    const handleDeleteRoom = async (roomId: string) => {
        await deleteRoom(roomId)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error deleting room",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setRooms(rooms.filter((room) => room.roomId !== roomId));
            })
            .finally(() => {
                toast({
                    title: "Room deleted",
                    description: "The room has been deleted successfully.",
                    variant: "destructive",
                });
            });
    };

    const openEditDialog = (room: roomWithId) => {
        setEditingRoom(room);
        setIsDialogOpen(true);
    };

    const handleMoveUp = async (index: number) => {
        if (index === 0) return;

        const newRooms = [...rooms];
        const movedRoom = {
            ...newRooms[index],
            displayOrder: newRooms[index - 1].displayOrder,
        };
        const previousRoom = {
            ...newRooms[index - 1],
            displayOrder: newRooms[index].displayOrder,
        };

        newRooms[index] = movedRoom;
        newRooms[index - 1] = previousRoom;

        // Sort by displayOrder to update visual order
        newRooms.sort((a, b) => a.displayOrder - b.displayOrder);

        setRooms(newRooms);

        // Update order in backend
        const orderData = [
            {
                roomId: movedRoom.roomId,
                displayOrder: movedRoom.displayOrder,
            },
            {
                roomId: previousRoom.roomId,
                displayOrder: previousRoom.displayOrder,
            },
        ];

        const result = await updateRoomOrder(orderData);
        if ("error" in result) {
            toast({
                title: "Error updating order",
                description: result.error,
                variant: "destructive",
            });
            fetchRooms(); // Reset to original order
        }
    };

    const handleMoveDown = async (index: number) => {
        if (index === rooms.length - 1) return;

        const newRooms = [...rooms];
        const movedRoom = {
            ...newRooms[index],
            displayOrder: newRooms[index + 1].displayOrder,
        };
        const nextRoom = {
            ...newRooms[index + 1],
            displayOrder: newRooms[index].displayOrder,
        };

        newRooms[index] = movedRoom;
        newRooms[index + 1] = nextRoom;

        // Sort by displayOrder to update visual order
        newRooms.sort((a, b) => a.displayOrder - b.displayOrder);

        setRooms(newRooms);

        // Update order in backend
        const orderData = [
            {
                roomId: movedRoom.roomId,
                displayOrder: movedRoom.displayOrder,
            },
            {
                roomId: nextRoom.roomId,
                displayOrder: nextRoom.displayOrder,
            },
        ];

        const result = await updateRoomOrder(orderData);
        if ("error" in result) {
            toast({
                title: "Error updating order",
                description: result.error,
                variant: "destructive",
            });
            fetchRooms(); // Reset to original order
        }
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const items = Array.from(rooms);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update displayOrder values
        const updatedItems = items.map((item, index) => ({
            ...item,
            displayOrder: index + 1,
        }));

        setRooms(updatedItems);

        // Send the updated order to the server
        const orderData = updatedItems.map((item) => ({
            roomId: item.roomId,
            displayOrder: item.displayOrder,
        }));

        const result2 = await updateRoomOrder(orderData);
        if ("error" in result2) {
            toast({
                title: "Error updating order",
                description: result2.error,
                variant: "destructive",
            });
            fetchRooms(); // Reset to original order
        }
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Room Management</CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => setEditingRoom(null)}
                                className="flex items-center gap-1">
                                <Plus className="h-4 w-4" /> Add Room
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingRoom ? "Edit Room" : "Add New Room"}
                                </DialogTitle>
                            </DialogHeader>
                            <RoomForm
                                onSubmit={
                                    editingRoom ? handleEditRoom : handleAddRoom
                                }
                                initialData={editingRoom}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="overflow-x-auto no-scrollbar">
                    <p className="text-sm text-gray-500 mb-4">
                        Drag and drop rooms to reorder them, or use the up/down
                        buttons. The order here will be reflected in the site
                        menu.
                    </p>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="rooms">
                            {(provided) => (
                                <Table className="no-scrollbar">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                style={{
                                                    width: "50px",
                                                }}></TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Room ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Order</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="no-scrollbar">
                                        {rooms.map((room, index) => (
                                            <Draggable
                                                key={room.roomId}
                                                draggableId={room.roomId}
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
                                                            <img
                                                                src={
                                                                    room.image ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={room.name}
                                                                className="h-10 w-10 rounded-md object-cover"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {room.roomId}
                                                        </TableCell>
                                                        <TableCell>
                                                            {room.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {room.displayOrder}
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
                                                                        rooms.length -
                                                                            1
                                                                    }>
                                                                    <MoveDown className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        openEditDialog(
                                                                            room
                                                                        )
                                                                    }>
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleDeleteRoom(
                                                                            room.roomId
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
}

interface RoomFormProps {
    onSubmit: (data: room) => void;
    initialData: room | null;
}

function RoomForm({ onSubmit, initialData }: RoomFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<z.infer<typeof roomSchema>>({
        resolver: zodResolver(roomSchema),
        defaultValues: initialData || {
            roomId: "",
            name: "",
            image: "",
        },
    });

    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
        initialData?.image
            ? [{ alt: initialData.name, src: initialData.image, file: null }]
            : []
    );
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const result = await uploadToCDN(file);

            if (typeof result === "string") {
                const newImage = {
                    alt: file.name,
                    src: result,
                    file: file,
                };
                setUploadedImages([newImage]);
                setValue("image", result);
            } else {
                console.error("Upload failed:", result.error);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageDelete = (src: string) => {
        setUploadedImages([]);
        setValue("image", "");
    };

    const handleUpdateAlt = (oldAlt: string, newAlt: string) => {
        setUploadedImages(
            uploadedImages.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="roomId">room ID</Label>
                <Input
                    id="roomId"
                    {...register("roomId")}
                    disabled={!!initialData}
                />
                {errors.roomId && (
                    <p className="text-sm text-destructive">
                        {errors.roomId.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Room Image</Label>
                <ImageUploader
                    uploadedImages={uploadedImages}
                    onUpload={handleImageUpload}
                    onDelete={handleImageDelete}
                    onUpdateAlt={handleUpdateAlt}
                    isMultiple={false}
                    isEditing={true}
                />
                <input type="hidden" {...register("image")} />
                {errors.image && (
                    <p className="text-sm text-destructive">
                        {errors.image.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={isUploading}>
                    {isUploading
                        ? "Uploading..."
                        : initialData
                        ? "Update room"
                        : "Add room"}
                </Button>
            </div>
        </form>
    );
}
