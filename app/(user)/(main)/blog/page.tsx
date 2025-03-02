"use client";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SearchInput } from "@/components/ui/searchinput";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { GetAllBlogs } from "@/services/BlogService";
import { useEffect, useState } from "react";
import { Blog, BlogImageCreate, BlogTrue, ImageDetail } from "@/types";
import { getImagesFromBlog } from "@/services/ImageService";
import parser from "html-react-parser";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
// todo: implement pagination

type BlogWithThumb = BlogTrue & {
    thumb: {
        imageId: string;
        src: string;
    };
};

const MAX_BLOGS_PER_PAGE = 3;
export default function BlogPage() {
    const [posts, setPosts] = useState<BlogTrue[]>([]);
    const [thumbs, setThumbs] = useState<BlogImageCreate[]>([]);
    const [postsWithThumbs, setPostsWithThumbs] = useState<BlogWithThumb[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        GetAllBlogs().then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            } else {
                setPosts(data);
            }
        });
    }, []);

    // after getting all the blogs, get the thumbs
    useEffect(() => {
        if (posts.length > 0) {
            setTotalPages(Math.ceil(posts.length / MAX_BLOGS_PER_PAGE));
            Promise.all(
                posts.map(async (post) => {
                    await getImagesFromBlog(post.blogId).then((data) => {
                        if ("error" in data) {
                            console.error(data.error);
                            return;
                        } else {
                            const thumb = data.filter(
                                (thumb) => thumb.isThumbnail == true
                            );
                            console.log("Thumbs:", thumb);
                            setThumbs((prev) => [...prev, ...thumb]);
                        }
                    });
                })
            );
        }
    }, [posts]);

    useEffect(() => {
        // start combining the posts with the thumbs by index
        if (
            posts.length > 0 &&
            thumbs.length > 0 &&
            posts.length === thumbs.length
        ) {
            const combined = posts.map((post, index) => {
                return {
                    ...post,
                    thumb: thumbs[index],
                };
            });
            console.log("Combined:", combined);
            setPostsWithThumbs(combined);
            setLoading(false);
        }
    }, [thumbs]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredPosts = postsWithThumbs.filter((post) =>
        (post.title.toLowerCase() + post.tags.join(" ")).includes(
            searchTerm.toLowerCase()
        )
    );

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * MAX_BLOGS_PER_PAGE,
        currentPage * MAX_BLOGS_PER_PAGE
    );

    return (
        <div className="container mx-auto px-4 py-4">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Blog</h1>
                <p className="text-muted-foreground text-xl">
                    {new Date().toISOString().split("T")[0]}
                </p>
            </header>
            <div className="flex flex-col md:flex-row gap-6">
                <main className="flex-1 space-y-8">
                    <div className="w-full flex justify-center items-center">
                        <Input
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[600px] border-2 border-slate-500 rounded-lg p-2"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {paginatedPosts.map((post, index) => (
                            <Card
                                key={index}
                                className="flex flex-col overflow-hidden cursor-pointer"
                                onClick={() => {
                                    router.push(`/blog/${post.blogId}`);
                                }}>
                                <div className="relative h-[300px]">
                                    <Image
                                        src={paginatedPosts[index].thumb.src}
                                        alt={paginatedPosts[index].title}
                                        fill
                                        className="object-cover"
                                        style={{ filter: "blur(2px)" }}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                                <CardContent className="py-6 px-10">
                                    <CardHeader className="px-0 py-2 text-2xl font-bold">
                                        <CardTitle>{post.title}</CardTitle>
                                    </CardHeader>
                                    <div className="w-full flex justify-start items-center text-sm text-muted-foreground">
                                        <p>
                                            <Image
                                                src="/images/icons/admin.svg"
                                                alt="user-icon"
                                                width={20}
                                                height={20}
                                                className="inline-block m-1 w-6"
                                            />
                                            {"admin"} |
                                        </p>

                                        <p>
                                            <Image
                                                src="/images/icons/calendar.svg"
                                                alt="calendar-icon"
                                                width={20}
                                                height={20}
                                                className="inline-block m-1 w-6"
                                            />
                                            {post.posted}
                                        </p>
                                    </div>
                                    <CardDescription className="text-md">
                                        {post?.overview}
                                    </CardDescription>
                                    <Button
                                        variant="link"
                                        className="text-md mt-4 px-0"
                                        onClick={() => {
                                            router.push(`/blog/${post.blogId}`);
                                        }}>
                                        Read More
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    isActive={!(currentPage === 1)}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(i + 1)}
                                        isActive={currentPage === i + 1}>
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    isActive={!(currentPage === totalPages)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </main>
            </div>
        </div>
    );
}
