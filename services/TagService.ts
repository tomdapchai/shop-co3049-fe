import api from "@/api";
import axios from "axios";
import { Tag } from "@/types";
export const getAllTags = async (): Promise<Tag[] | { error: string }> => {
    try {
        const response = await api.get("api/tag/routes.php");
        console.log("Backend Response:", response.data);
        const res: Tag[] = response.data.data.map((tag: any) => tag.tag_name);
        return res;
    } catch (error) {
        console.log("Error fetching tags:", error);
        return { error: "Error fetching tags" };
    }
};

export const getTagById = async (
    tagName: string
): Promise<Tag | { error: string }> => {
    try {
        const response = await api.get(`api/tag/routes.php?tagName=${tagName}`);
        console.log("Backend Response:", response.data);
        const tag = response.data.data;
        return tag.tag_name;
    } catch (error) {
        console.log("Error fetching tag:", error);
        return { error: "Error fetching tag" };
    }
};

export const createTag = async (
    tagName: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/tag/routes.php", {
            tagName,
        });
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error creating tag:", error);
        return { error: "Error creating tag" };
    }
};

export const updateTagName = async (
    tagName: string,
    newTagName: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/tag/routes.php", {
            tagName,
            newTagName,
        });
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating tag:", error);
        return { error: "Error updating tag" };
    }
};

export const deleteTagName = async (
    tagName: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/tag/routes.php?tagName=${tagName}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting tag:", error);
        return { error: "Error deleting tag" };
    }
};
