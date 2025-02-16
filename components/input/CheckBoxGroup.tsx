import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

interface CheckboxGroupProps {
    name: string;
    items: { id: string; label: string }[];
    control: any;
    isEditing?: boolean;
}

export function CheckboxGroup({
    name,
    items,
    control,
    isEditing = false,
}: CheckboxGroupProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => (
                <FormField
                    key={item.id}
                    control={control}
                    name={name}
                    render={({ field }) => {
                        return (
                            <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([
                                                      ...field.value,
                                                      item.id,
                                                  ])
                                                : field.onChange(
                                                      field.value?.filter(
                                                          (value: string) =>
                                                              value !== item.id
                                                      )
                                                  );
                                        }}
                                        disabled={!isEditing}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    {item.label}
                                </FormLabel>
                            </FormItem>
                        );
                    }}
                />
            ))}
        </div>
    );
}
