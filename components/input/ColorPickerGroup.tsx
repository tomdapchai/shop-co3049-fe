import * as React from "react";
import { Button } from "@/components/ui/button";
import { ColorPicker as AntdColorPicker } from "antd";
import { X } from "lucide-react";
import { FormControl } from "@/components/ui/form";

interface ColorPickerProps {
    name: string;
    value: string[];
    onChange: (colors: string[]) => void;
    isEditing?: boolean;
}

export function ColorPickerGroup({
    name,
    value = [],
    onChange,
    isEditing = false,
}: ColorPickerProps) {
    const [selectedColor, setSelectedColor] = React.useState<string>("#1677ff");
    const [colors, setColors] = React.useState<string[]>(value || []);

    // Update parent form when colors change
    React.useEffect(() => {
        onChange(colors);
    }, [colors, onChange]);

    const handleAddColor = () => {
        if (!selectedColor) return;

        // Avoid duplicates
        if (!colors.includes(selectedColor)) {
            setColors([...colors, selectedColor]);
        }
    };

    const handleRemoveColor = (colorToRemove: string) => {
        setColors(colors.filter((color) => color !== colorToRemove));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end gap-4">
                <FormControl>
                    <AntdColorPicker
                        disabled={!isEditing}
                        value={selectedColor}
                        onChange={(color) =>
                            setSelectedColor(color.toHexString())
                        }
                        showText
                    />
                </FormControl>

                <Button
                    type="button"
                    onClick={handleAddColor}
                    disabled={!isEditing}
                    size="sm">
                    Add Color
                </Button>
            </div>

            {colors.length > 0 && (
                <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color, index) => (
                            <div
                                key={`${color}-${index}`}
                                className="flex items-center gap-1 p-2 border rounded-md">
                                <div
                                    className="h-6 w-6 rounded-full border"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-sm font-medium">
                                    {color}
                                </span>
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-5 w-5 p-0 rounded-full"
                                        onClick={() =>
                                            handleRemoveColor(color)
                                        }>
                                        <X className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
