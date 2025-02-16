import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function TagFilter({
    tags,
    selectedTags,
    onTagSelect,
}: {
    tags: string[];
    selectedTags: string[];
    onTagSelect: (tag: string) => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="max-w-[200px] justify-start">
                    {selectedTags.length > 0
                        ? `${selectedTags.length} selected`
                        : "Filter by tags"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                            {tags.map((tag) => (
                                <CommandItem
                                    key={tag}
                                    onSelect={() => onTagSelect(tag)}>
                                    <Check
                                        className={`mr-2 h-4 w-4 ${
                                            selectedTags.includes(tag)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    />
                                    {tag}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
