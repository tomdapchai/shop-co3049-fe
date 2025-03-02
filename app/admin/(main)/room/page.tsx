"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
} from "@/services/RoomService";

export default function RoomManagement() {
    const { toast } = useToast();
    const [rooms, setRooms] = useState<room[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<room | null>(null);

    useEffect(() => {
        getAllRooms().then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error fetching rooms",
                    description: res.error,
                    variant: "destructive",
                });
                return;
            }
            setRooms(res);
        });
    }, []);

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
                setRooms([...rooms, newRoom]);
            })
            .finally(() => {
                setIsDialogOpen(false);
                toast({
                    title: "room added",
                    description: `${newRoom.name} has been added successfully.`,
                });
            });
    };

    const handleEditRoom = async (room: room) => {
        await updateRoom(room)
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
                    rooms.map((cat) =>
                        cat.roomId === room.roomId ? room : cat
                    )
                );
            })
            .finally(() => {
                setIsDialogOpen(false);
                setEditingRoom(null);
                toast({
                    title: "Room updated",
                    description: `${room.name} has been updated successfully.`,
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
                setRooms(rooms.filter((cat) => cat.roomId !== roomId));
            })
            .finally(() => {
                toast({
                    title: "room deleted",
                    description: "The room has been deleted successfully.",
                    variant: "destructive",
                });
            });
    };

    const openEditDialog = (room: room) => {
        setEditingRoom(room);
        setIsDialogOpen(true);
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
                                <Plus className="h-4 w-4" /> Add room
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingRoom ? "Edit room" : "Add New room"}
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
                    <Table className="no-scrollbar">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>room ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="no-scrollbar">
                            {rooms.map((room) => (
                                <TableRow key={room.roomId}>
                                    <TableCell>
                                        <img
                                            src={
                                                room.image || "/placeholder.svg"
                                            }
                                            alt={room.name}
                                            className="h-10 w-10 rounded-md object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>{room.roomId}</TableCell>
                                    <TableCell>{room.name}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    openEditDialog(room)
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
                            ))}
                        </TableBody>
                    </Table>
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
