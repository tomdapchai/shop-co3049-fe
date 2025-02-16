"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import parser from "html-react-parser";
import { GetBlogById } from "@/services/BlogService";
import { BlogTrue } from "@/types";
const page = () => {
    const params = useParams();
    const { blogId } = params;
    const [blog, setBlog] = useState<BlogTrue | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetBlogById(blogId as string).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            } else {
                setBlog(data);
            }
            setLoading(false);
        });
    }, [blogId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex justify-center items-center my-10">
            <div className="w-3/4">
                <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
                <div className="text-muted-foreground mb-4">{blog?.posted}</div>
                <div className="text-lg">
                    {blog ? parser(blog.content) : ""}
                </div>
            </div>
        </div>
    );
};

export default page;
