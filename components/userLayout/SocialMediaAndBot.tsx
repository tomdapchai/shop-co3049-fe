"use client";
import { socialMedia } from "@/types";
import { useProduct } from "@/context/ProductContext";
import Image from "next/image";
import ChatWindow from "../chatbot/ChatWindow";
interface Props {
    socialMedia: socialMedia[];
}

const SocialMediaAndBot = () => {
    const { socials } = useProduct();

    return (
        <div className="fixed right-6 bottom-6">
            <div className="flex flex-col justify-start items-start space-y-2 bg-transparent">
                {socials.map((media) => {
                    return (
                        <a
                            key={media.id}
                            className="w-12 h-12 rounded-full cursor-pointer shadow-xl border-2"
                            href={media.info}
                            target="_blank"
                            rel="noreferrer">
                            <Image
                                src={media.image}
                                alt={media.name}
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SocialMediaAndBot;
