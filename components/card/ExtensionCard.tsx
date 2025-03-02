import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";
import { extension } from "@/types";

interface ExtensionCardProps {
    extension: extension;
    onInstall: (id: string) => void;
    onUninstall: (id: string) => void;
    onToggle: (id: string, enabled: boolean) => void;
    onConfigure?: (extension: extension) => void;
    isInstalling: boolean;
    isUninstalling: boolean;
}

export function ExtensionCard({
    extension,
    onInstall,
    onUninstall,
    onToggle,
    onConfigure,
    isInstalling,
    isUninstalling,
}: ExtensionCardProps) {
    const { id, name, description, installed, enabled } = extension;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter className="flex justify-between items-center">
                {installed ? (
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id={`switch-${id}`}
                                    checked={enabled}
                                    onCheckedChange={(checked) =>
                                        onToggle(id, checked)
                                    }
                                />
                                <label
                                    htmlFor={`switch-${id}`}
                                    className="text-sm">
                                    {enabled ? "Enabled" : "Disabled"}
                                </label>
                            </div>
                            {onConfigure && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onConfigure(extension)}
                                    title="Configure">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <Button
                            onClick={() => {
                                onUninstall(id);
                            }}>
                            {isUninstalling ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b text-slate-300"></div>
                            ) : (
                                "Uninstall"
                            )}
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => onInstall(id)}>
                        {isInstalling ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b text-slate-300"></div>
                        ) : (
                            "Install"
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
