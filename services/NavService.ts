import api from "@/api";
import { navLink } from "@/types";

export type navLinkWithId = navLink & {
    id: number;
    display_order: number;
};

export const getAllNavLinks = async (): Promise<
    navLinkWithId[] | { error: string }
> => {
    try {
        const response = await api.get("api/nav/routes.php");
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error fetching navigation links:", error);
        return { error: "Error fetching navigation links" };
    }
};

export const getNavLinkById = async (
    id: number
): Promise<navLinkWithId | { error: string }> => {
    try {
        const response = await api.get(`api/nav/routes.php?id=${id}`);
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching navigation link" };
    }
};

export const createNavLink = async (
    data: navLink
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/nav/routes.php", data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating navigation link" };
    }
};

export const updateNavLink = async (
    data: navLinkWithId
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/nav/routes.php", data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating navigation link" };
    }
};

export const deleteNavLink = async (
    id: number
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(`api/nav/routes.php?id=${id}`);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while deleting navigation link" };
    }
};

export const updateNavLinkOrder = async (
    links: navLinkWithId[]
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/nav/routes.php", links);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return {
            error: "An error occurred while updating navigation link order",
        };
    }
};
