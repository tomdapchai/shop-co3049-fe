import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    isEditing?: boolean;
}

export default function TagInput({
    tags,
    setTags,
    isEditing = false,
}: TagInputProps) {
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                        }
                    }}
                    placeholder="Add a tag"
                    disabled={!isEditing}
                />
                {isEditing && (
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            addTag();
                        }}>
                        Add
                    </Button>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                        {isEditing && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-4 w-4 p-0"
                                onClick={() => removeTag(tag)}>
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
