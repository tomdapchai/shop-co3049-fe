import api from "@/api";
import axios from "axios";
import {
    ImageDetail,
    ProductImageCreate,
    BlogImageCreate,
    Blog,
} from "@/types";
// upload image will be done via cdn, cloudinary (already had the code)
export const getAllImages = async (): Promise<
    ImageDetail[] | { error: string }
> => {
    try {
        const response = await api.get(`api/image/routes.php`);
        console.log("Backend Response:", response.data);
        const res: ImageDetail[] = response.data.data.map(
            (image: ImageDetail) => {
                return {
                    imageId: image.imageId,
                    src: image.src,
                };
            }
        );
        return res;
    } catch (error) {
        console.log("Error fetching images:", error);
        return { error: "Error fetching images" };
    }
};

export const getImageById = async (
    imageId: string
): Promise<ImageDetail | { error: string }> => {
    try {
        const response = await api.get(
            `api/image/routes.php?imageId=${imageId}`
        );
        console.log("Backend Response:", response.data);
        const res: ImageDetail = response.data;
        return res;
    } catch (error) {
        console.log("Error fetching image:", error);
        return { error: "Error fetching image" };
    }
};

export const getImagesFromProduct = async (
    slug: string
): Promise<ImageDetail[] | { error: string }> => {
    try {
        const response = await api.get(
            `api/image/routes.php?slug=${slug}&type=product`
        );
        console.log("Backend Response:", response.data);
        const res: ImageDetail[] = response.data.data;
        return res;
    } catch (error) {
        console.log("Error fetching image:", error);
        return { error: "Error fetching image" };
    }
};

export const getImagesFromBlog = async (
    blogId: string
): Promise<BlogImageCreate[] | { error: string }> => {
    try {
        const response = await api.get(
            `api/image/routes.php?blogId=${blogId}&type=blog`
        );
        console.log("Backend Response:", response.data);
        const res: BlogImageCreate[] = response.data.data;
        return res;
    } catch (error) {
        console.log("Error fetching image:", error);
        return { error: "Error fetching image" };
    }
};

export const createProductImage = async (
    slug: string,
    data: ProductImageCreate
) => {
    try {
        const response = await api.post(
            `api/image/routes.php?slug=${slug}&type=product`,
            data
        );
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating image:", error);
        return { error: "Error creating image" };
    }
};

export const createBlogImage = async (
    blogId: string,
    data: BlogImageCreate
) => {
    try {
        const response = await api.post(
            `api/image/routes.php?slug=${blogId}&type=blog`,
            data
        );
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating image:", error);
        return { error: "Error creating image" };
    }
};

export const createAboutImage = async (data: ImageDetail) => {
    try {
        const response = await api.post(
            `api/image/routes.php?type=about`,
            data
        );
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating image:", error);
        return { error: "Error creating image" };
    }
};

export const updateImageId = async (data: {
    imageId: string;
    newId: string;
}) => {
    try {
        const response = await api.put(
            `api/image/routes.php?type=imageId`,
            data
        );
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error updating image:", error);
        return { error: "Error updating image" };
    }
};

export const updateImageSrc = async (data: {
    imageId: string;
    newSrc: string;
}) => {
    try {
        const response = await api.put(`api/image/routes.php?type=src`, data);
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error updating image:", error);
        return { error: "Error updating image" };
    }
};

export const deleteImage = async (imageId: string) => {
    try {
        const response = await api.delete(
            `api/image/routes.php?imageId=${imageId}`
        );
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error deleting image:", error);
        return { error: "Error deleting image" };
    }
};
