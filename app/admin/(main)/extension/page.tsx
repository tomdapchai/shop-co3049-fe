"use client";

import { useEffect, useState } from "react";
import { ExtensionCard } from "@/components/card/ExtensionCard";
import { ConfigDialog } from "@/components/form/ExtensionConfig";
import { extension } from "@/types";
import {
    getAllExtensions,
    updateExtensionStatus,
    getExtensionById,
} from "@/services/ExtensionService";

export default function Extensions() {
    const [extensions, setExtensions] = useState<extension[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedExtension, setSelectedExtension] =
        useState<extension | null>(null);
    const [installingIds, setInstallingIds] = useState<string[]>([]);
    const [uninstallingIds, setUninstallingIds] = useState<string[]>([]);

    useEffect(() => {
        getAllExtensions().then((data) => {
            if ("error" in data) {
                console.log("Error fetching extensions:", data.error);
            } else {
                setExtensions(data);
            }
        });
    }, []);

    const handleInstall = async (id: string) => {
        setInstallingIds((prev) => [...prev, id]);
        await setTimeout(async () => {
            setExtensions(
                extensions.map((ext) =>
                    ext.id === id
                        ? { ...ext, installed: true, enabled: false }
                        : ext
                )
            );
            await updateExtensionStatus({
                id,
                installed: true,
                enabled: false,
            });
            setInstallingIds((prev) => prev.filter((item) => item !== id));
        }, 5000);
    };

    const handleUninstall = async (id: string) => {
        setUninstallingIds((prev) => [...prev, id]);
        await setTimeout(async () => {
            await updateExtensionStatus({
                id,
                installed: false,
                enabled: false,
            })
                .then(() => {
                    setExtensions(
                        extensions.map((ext) =>
                            ext.id === id
                                ? { ...ext, installed: false, enabled: false }
                                : ext
                        )
                    );
                })
                .finally(() => {
                    setUninstallingIds((prev) =>
                        prev.filter((item) => item !== id)
                    );
                });
        }, 3000);
    };

    const handleToggle = async (id: string, enabled: boolean) => {
        await updateExtensionStatus({ id, enabled, installed: true }).then(
            () => {
                setExtensions(
                    extensions.map((ext) =>
                        ext.id === id ? { ...ext, enabled } : ext
                    )
                );
            }
        );
    };

    const openConfigDialog = (extension: extension) => {
        setSelectedExtension(extension);
        setIsDialogOpen(true);
    };

    const closeConfigDialog = () => {
        setIsDialogOpen(false);
        setSelectedExtension(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Extensions</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {extensions.map((extension) => (
                    <ExtensionCard
                        key={extension.id}
                        extension={extension}
                        onInstall={handleInstall}
                        onToggle={handleToggle}
                        onUninstall={handleUninstall}
                        isInstalling={installingIds.includes(extension.id)}
                        isUninstalling={uninstallingIds.includes(extension.id)}
                        onConfigure={
                            extension.id === "price-comparison" ||
                            extension.id === "products-for-you" ||
                            extension.id === "image-gallery" ||
                            extension.id === "feedback-carousel"
                                ? undefined
                                : openConfigDialog
                        }
                    />
                ))}
            </div>

            <ConfigDialog
                isOpen={isDialogOpen}
                extension={selectedExtension}
                onClose={closeConfigDialog}
            />
        </div>
    );
}
