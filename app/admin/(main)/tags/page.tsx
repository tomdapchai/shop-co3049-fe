"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    createTag,
    deleteTagName,
    getAllTags,
    updateTagName,
} from "@/services/TagService";
import { Tag } from "@/types";
import { create } from "domain";

export default function TagManagementPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTagName, setNewTagName] = useState("");
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllTags().then((data) => {
            if ("error" in data) {
                console.log(data.error);
            } else {
                // map the tag name to the tag object
                // @ts-ignore
                setTags(data.map((tag) => ({ tagName: tag })));
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const addTag = async () => {
        if (newTagName.trim()) {
            await createTag(newTagName.trim());
            setTags([...tags, { tagName: newTagName.trim() }]);
            setNewTagName("");
        }
    };

    const updateTag = async () => {
        if (editingTag && editingTag.tagName.trim()) {
            await updateTagName(editingTag.tagName, editingTag.tagName.trim());
            setTags(
                tags.map((tag) =>
                    tag.tagName === editingTag.tagName ? editingTag : tag
                )
            );
            setEditingTag(null);
        }
    };

    const deleteTag = async (id: string) => {
        await deleteTagName(id);
        setTags(tags.filter((tag) => tag.tagName !== id));
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Tag Management</h1>
            <div className="flex mb-5">
                <Input
                    type="text"
                    placeholder="New tag name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="mr-2"
                />
                <Button onClick={addTag}>
                    <Plus className="mr-2 h-4 w-4" /> Add Tag
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tag Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tags.map((tag) => (
                        <TableRow key={tag.tagName}>
                            <TableCell>{tag.tagName}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="mr-2">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Tag</DialogTitle>
                                        </DialogHeader>
                                        <Input
                                            type="text"
                                            value={editingTag?.tagName || ""}
                                            onChange={(e) =>
                                                setEditingTag({
                                                    ...editingTag!,
                                                    tagName: e.target.value,
                                                })
                                            }
                                            className="my-4"
                                        />
                                        <Button onClick={updateTag}>
                                            Update Tag
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => deleteTag(tag.tagName)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
