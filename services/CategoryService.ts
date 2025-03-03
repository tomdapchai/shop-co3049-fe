import api from "@/api";
import { category } from "@/types";

export const getAllCategories = async (): Promise<
    categoryWithId[] | { error: string }
> => {
    try {
        const response = await api.get("api/category/routes.php");
        console.log("Backend Response:", response.data);
        const res: categoryWithId[] = response.data.data.map((category: any) => {
            return {
                categoryId: category.category_id,
                name: category.name,
                image: category.image,
                displayOrder: category.display_order,
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
): Promise<categoryWithId | { error: string }> => {
    try {
        const response = await api.get(
            `api/category/routes.php?categoryId=${categoryId}`
        );
        console.log("Backend Response:", response.data);
        const { category_id, display_order, ...rest } = response.data.data;
        return {
            categoryId: category_id,
            displayOrder: display_order,
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

export const updateCategoryOrder = async (
    categories: { categoryId: string; displayOrder: number }[]
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post(
            "api/category/routes.php?action=reorder",
            categories
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating order:", error);
        return { error: "Error updating category order" };
    }
};

export type categoryWithId = category & { displayOrder: number };
