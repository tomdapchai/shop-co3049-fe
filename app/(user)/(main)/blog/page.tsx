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
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Blog</h1>
                <p className="text-muted-foreground text-xl">
                    {new Date().toISOString().split("T")[0]}
                </p>
            </header>
            <div className="flex flex-col md:flex-row gap-8">
                <main className="flex-1 space-y-8">
                    {paginatedPosts.map((post, index) => (
                        <Card
                            key={index}
                            className="flex flex-col overflow-hidden">
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
                                <p className="text-md text-muted-foreground">
                                    <Image
                                        src="/images/icons/admin.svg"
                                        alt="user-icon"
                                        width={20}
                                        height={20}
                                        className="inline-block m-1 w-6"
                                    />
                                    {"admin"} |
                                    <Image
                                        src="/images/icons/calendar.svg"
                                        alt="calendar-icon"
                                        width={20}
                                        height={20}
                                        className="inline-block m-1 w-6"
                                    />
                                    {post.posted} |
                                    <Image
                                        src="/images/icons/tag.svg"
                                        alt="calendar-icon"
                                        width={20}
                                        height={20}
                                        className="inline-block m-1 w-6"
                                    />
                                    {
                                        // @ts-ignore
                                        post.tags.join(", ")
                                    }
                                </p>
                                <CardHeader className="px-0">
                                    <CardTitle className="text-2xl font-bold">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>

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
                <aside className="w-full md:w-1/3 space-y-8">
                    <div>
                        <Input
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Categories</h2>
                        <ul className="space-y-2">
                            <li>Crafts</li>
                            <li>Design</li>
                            <li>Inspiration</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                        <ul className="space-y-2">
                            <li>Going all-in with millennial design</li>
                            <li>Exploring new ways of decorating</li>
                            <li>Handmade pieces that took time to make</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
