"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { ProductDetail, siteInfo } from "@/types";
import { getAllProduct } from "@/services/ProductService";
import { getSiteInfo } from "@/services/SiteInfoService";
import { getAllCategories } from "@/services/CategoryService";
import { getAllRooms } from "@/services/RoomService";
import { getAllSocialMedia } from "@/services/SocialService";
import { getAdvertisement } from "@/services/AdService";
import {
    category,
    socialMedia,
    advertisement,
    extension,
    room,
    navLink,
} from "@/types";
import { getAllExtensions } from "@/services/ExtensionService";
import { getAllNavLinks, navLinkWithId } from "@/services/NavService";

interface ProductContextProps {
    products: ProductDetail[];
    siteInfo: siteInfo | null;
    categories: category[];
    socials: socialMedia[];
    advertisement: advertisement;
    isAdShown: boolean;
    setIsAdShown: React.Dispatch<React.SetStateAction<boolean>>;
    extensions: extension[];
    rooms: room[];
    navLinks: navLinkWithId[];
}

const ProductContext = createContext<ProductContextProps | undefined>(
    undefined
);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

interface ProductProviderProps {
    children: React.ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [siteInfo, setSiteInfo] = useState<siteInfo | null>(null);
    const [categories, setCategories] = useState<category[]>([]);
    const [socials, setSocials] = useState<socialMedia[]>([]);
    const [advertisement, setAdvertisement] = useState<advertisement>();
    const [isAdShown, setIsAdShown] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [extensions, setExtensions] = useState<extension[]>([]);
    const [rooms, setRooms] = useState<room[]>([]);
    const [navLinks, setNavLinks] = useState<navLinkWithId[]>([]);
    useEffect(() => {
        Promise.all([
            getAllProduct(),
            getSiteInfo(),
            getAllCategories(),
            getAllSocialMedia(),
            getAdvertisement(),
            getAllExtensions(),
            getAllRooms(),
            getAllNavLinks(),
        ])
            .then(
                ([
                    productData,
                    siteInfoData,
                    categoryData,
                    socialData,
                    adData,
                    extensionData,
                    roomData,
                    navLinkData,
                ]) => {
                    if ("error" in productData) {
                        console.error(productData.error);
                    } else {
                        setProducts(productData);
                    }
                    if ("error" in siteInfoData) {
                        console.error(siteInfoData.error);
                    } else {
                        setSiteInfo(siteInfoData);
                    }
                    if ("error" in categoryData) {
                        console.error(categoryData.error);
                    } else {
                        setCategories(categoryData);
                    }
                    if ("error" in socialData) {
                        console.error(socialData.error);
                    } else {
                        setSocials(socialData);
                    }
                    if ("error" in adData) {
                        console.error(adData.error);
                    } else {
                        setAdvertisement(adData);
                    }
                    if ("error" in extensionData) {
                        console.error(extensionData.error);
                    } else {
                        setExtensions(extensionData);
                    }
                    if ("error" in roomData) {
                        console.error(roomData.error);
                    } else {
                        setRooms(roomData);
                    }
                    if ("error" in navLinkData) {
                        console.error(navLinkData.error);
                    } else {
                        setNavLinks(navLinkData);
                    }
                }
            )
            .finally(() => setIsInitialized(true));
    }, []);

    if (!isInitialized || !advertisement) {
        return null; // Or a loading spinner
    }
    return (
        <ProductContext.Provider
            value={{
                products,
                siteInfo,
                categories,
                socials,
                advertisement,
                isAdShown,
                setIsAdShown,
                extensions,
                rooms,
                navLinks,
            }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
