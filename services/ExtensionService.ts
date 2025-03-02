import api from "@/api";
import { extension } from "@/types";

export const getAllExtensions = async (): Promise<
    extension[] | { error: string }
> => {
    try {
        const response = await api.get("api/extension/routes.php");
        console.log("Backend Response:", response.data);
        // Map backend fields to frontend fields
        const mappedData = response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            installed: item.status_install,
            enabled: item.status_enable,
        }));
        return mappedData;
    } catch (error) {
        console.log("Error fetching extensions:", error);
        return { error: "Error fetching extensions" };
    }
};

export const getExtensionById = async (
    extensionId: string
): Promise<extension | { error: string }> => {
    try {
        const response = await api.get(
            `api/extension/routes.php?extensionId=${extensionId}`
        );
        console.log("Backend Response:", response.data);
        // Map backend fields to frontend fields
        const mappedData = {
            id: response.data.data.id,
            name: response.data.data.name,
            description: response.data.data.description,
            installed: response.data.data.status_install,
            enabled: response.data.data.status_enable,
        };
        return mappedData;
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching extension" };
    }
};

export const updateExtensionStatus = async (
    data: Partial<extension>
): Promise<{ message: string } | { error: string }> => {
    try {
        // Map frontend fields to backend fields
        const backendData = {
            id: data.id,
            status_install: data.installed,
            status_enable: data.enabled,
        };
        const response = await api.put("api/extension/routes.php", backendData);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating extension status" };
    }
};
