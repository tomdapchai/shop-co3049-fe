import api from "@/api";
import { siteInfo } from "@/types";

export const getSiteInfo = async (): Promise<siteInfo | { error: string }> => {
    try {
        const response = await api.get("api/siteInfo/routes.php");
        console.log("Backend Response:", response.data.data);
        const { about, about_original, address, email, phone_number } =
            response.data.data;
        return {
            about,
            aboutOriginal: about_original,
            address,
            email,
            phoneNumber: phone_number,
        };
    } catch (error) {
        console.log("Error fetching site info:", error);
        return { error: "Error fetching site info" };
    }
};

export const updateSiteInfo = async (
    info: siteInfo
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/siteInfo/routes.php", info);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating site info:", error);
        return { error: "Error updating site info" };
    }
};
