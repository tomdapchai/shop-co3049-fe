import api from "@/api";
import { socialMedia } from "@/types";

export const getAllSocialMedia = async (): Promise<
    socialMedia[] | { error: string }
> => {
    try {
        const response = await api.get("api/social/routes.php");
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error fetching social media:", error);
        return { error: "Error fetching social media" };
    }
};

export const updateSocialMedia = async (
    data: socialMedia
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/social/routes.php", data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating social media" };
    }
};

export const deleteSocialMedia = async (
    socialId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/social/routes.php?socialId=${socialId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while deleting social media" };
    }
};

export const createSocialMedia = async (
    data: socialMedia
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/social/routes.php", data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating social media" };
    }
};

export const getSocialMediaById = async (
    socialId: string
): Promise<socialMedia | { error: string }> => {
    try {
        const response = await api.get(
            `api/social/routes.php?socialId=${socialId}`
        );
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching social media" };
    }
};
