"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogImageCreate, BlogTrue } from "@/types";
import parse from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
export function BlogCard({ blog, thumb }: { blog: BlogTrue; thumb: string }) {
    const router = useRouter();
    return (
        <Card className="w-full">
            <CardHeader className="p-4">
                <CardTitle className="text-2xl">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-[400px] line-clamp-3 mb-6">
                {/* <div className="aspect-video w-full bg-muted mb-2" /> */}
                <Image
                    src={thumb}
                    alt={thumb.slice(10, 20)}
                    width={400}
                    height={400}
                />
                <div className="text-sm text-muted-foreground line-clamp-3">
                    {parse(blog.content)}
                </div>
            </CardContent>
            <CardFooter className="w-full flex flex-col justify-start items-start space-y-4">
                <div className="p-4 pt-0 flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Button
                    variant="link"
                    onClick={() => router.push(`/admin/blogs/${blog.blogId}`)}>
                    Details
                </Button>
            </CardFooter>
        </Card>
    );
}
