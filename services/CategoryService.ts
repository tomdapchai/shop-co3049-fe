import api from "@/api";
import { category } from "@/types";

export const getAllCategories = async (): Promise<
    category[] | { error: string }
> => {
    try {
        const response = await api.get("api/category/routes.php");
        console.log("Backend Response:", response.data);
        const res: category[] = response.data.data.map((category: any) => {
            return {
                categoryId: category.category_id,
                name: category.name,
                image: category.image,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching categories:", error);
        return { error: "Error fetching categories" };
    }
};

export const getCategoryById = async (
    categoryId: string
): Promise<category | { error: string }> => {
    try {
        const response = await api.get(
            `api/category/routes.php?categoryId=${categoryId}`
        );
        console.log("Backend Response:", response.data);
        const { category_id, ...rest } = response.data.data;
        return {
            categoryId: category_id,
            ...rest,
        };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching category" };
    }
};

export const createCategory = async (
    data: category
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/category/routes.php", data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating category" };
    }
};

export const updateCategory = async (
    data: category
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/category/routes.php", data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating category" };
    }
};

export const deleteCategory = async (
    categoryId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/category/routes.php?categoryId=${categoryId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting category:", error);
        return { error: "Error deleting category" };
    }
};
