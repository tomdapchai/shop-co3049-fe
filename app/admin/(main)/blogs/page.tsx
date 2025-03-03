"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/card/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BlogImageCreate, BlogTrue } from "@/types";
import { GetAllBlogs } from "@/services/BlogService";
import { getImagesFromBlog } from "@/services/ImageService";
import { useRouter } from "next/navigation";
const ITEMS_PER_PAGE = 5;

export default function BlogManagement() {
    const [blogs, setBlogs] = useState<BlogTrue[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [thumbs, setThumbs] = useState<BlogImageCreate[]>([]);
    const router = useRouter();

    const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

    useEffect(() => {
        GetAllBlogs()
            .then((data) => {
                if ("error" in data) {
                    console.log(data.error);
                } else {
                    console.log("Blogs:", data);
                    setBlogs(data);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    // useEffect(() => {
    //     if (blogs.length > 0) {
    //         Promise.all(
    //             blogs.map(async (post) => {
    //                 await getImagesFromBlog(post.blogId).then((data) => {
    //                     if ("error" in data) {
    //                         console.error(data.error);
    //                         return;
    //                     } else {
    //                         const thumb = data.filter(
    //                             (thumb) => thumb.isThumbnail == true
    //                         );

    //                         setThumbs((prev) => [...prev, ...thumb]);
    //                     }
    //                 });
    //             })
    //         ).then(() => setIsLoading(false));
    //     }
    // }, [blogs]);

    // useEffect(() => {
    //     console.log(thumbs);
    // }, [thumbs]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filteredBlogs = blogs
        .filter((blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((blog) =>
            selectedTag === "all" || selectedTag === ""
                ? true
                : blog.tags.includes(selectedTag)
        )
        .sort((a, b) =>
            sortOrder === "asc"
                ? new Date(a.posted).getTime() - new Date(b.posted).getTime()
                : new Date(b.posted).getTime() - new Date(a.posted).getTime()
        );

    const pageCount = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const paginatedBlogs = filteredBlogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Blog Management</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:w-1/3"
                />
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="md:w-1/3">
                        <SelectValue placeholder="Filter by tag" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All tags</SelectItem>
                        {allTags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                                {tag}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={sortOrder}
                    onValueChange={(value: "asc" | "desc") =>
                        setSortOrder(value)
                    }>
                    <SelectTrigger className="md:w-1/3">
                        <SelectValue placeholder="Sort by date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="desc">Newest first</SelectItem>
                        <SelectItem value="asc">Oldest first</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    className="bg-sub hover:bg-sub"
                    onClick={() => {
                        router.push("/admin/blogs/create");
                    }}>
                    Create new blog
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {paginatedBlogs.map((blog, index) => (
                    <BlogCard
                        key={blog.blogId}
                        blog={blog}
                        thumb={blog.thumbnail}
                    />
                ))}
            </div>

            <div className="flex justify-between items-center">
                <Button
                    onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {pageCount}
                </span>
                <Button
                    onClick={() =>
                        setCurrentPage((page) => Math.min(pageCount, page + 1))
                    }
                    disabled={currentPage === pageCount}>
                    Next
                </Button>
            </div>
        </div>
    );
}
