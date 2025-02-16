import React from "react";
import parse from "html-react-parser";

type BlogPreviewProps = {
    content: string;
};

export default function BlogPreview({ content }: BlogPreviewProps) {
    return <div className="prose max-w-none">{parse(content)}</div>;
}
