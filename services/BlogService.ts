import api from "@/api";
import { Blog, BlogTrue } from "@/types";

export const GetAllBlogs = async (): Promise<
    BlogTrue[] | { error: string }
> => {
    try {
        const response = await api.get("api/blog/routes.php");

        console.log("Backend Response:", response.data);
        const newResponse: BlogTrue[] = response.data.data.map((blog: any) => {
            return {
                blogId: blog.blogId,
                title: blog.title,
                content: blog.content,
                tags: JSON.parse(blog.tags),
                posted: blog.posted,
                contentOriginal: blog.content_original,
                overview: blog.overview,
                thumbnail: blog.thumbnail,
            };
        });

        return newResponse;
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching blogs" };
    }
};

export const GetBlogById = async (
    blogId: string
): Promise<BlogTrue | { error: string }> => {
    try {
        const response = await api.get(`api/blog/routes.php?blogId=${blogId}`);

        console.log("Backend Response:", response.data);
        const {
            title,
            content,
            tags,
            posted,
            content_original,
            overview,
            thumbnail,
        } = response.data.data;

        return {
            blogId,
            title,
            content,
            tags: JSON.parse(tags),
            posted,
            contentOriginal: content_original,
            overview,
            thumbnail,
        };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching blog" };
    }
};

export const CreateBlog = async (
    data: Blog
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/blog/routes.php", data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating blog" };
    }
};

export const UpdateBlog = async (
    blogId: string,
    data: Partial<Blog>
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/blog/routes.php?blogId=${blogId}`,
            data
        );

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating blog" };
    }
};

export const DeleteBlog = async (
    blogId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/blog/routes.php?blogId=${blogId}`
        );

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while deleting blog" };
    }
};
