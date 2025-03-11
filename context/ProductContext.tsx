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

interface LoadingStates {
    products: boolean;
    siteInfo: boolean;
    categories: boolean;
    socials: boolean;
    advertisement: boolean;
    extensions: boolean;
    rooms: boolean;
    navLinks: boolean;
}

interface ProductContextProps {
    products: ProductDetail[];
    siteInfo: siteInfo | null;
    categories: category[];
    socials: socialMedia[];
    advertisement: advertisement | null;
    isAdShown: boolean;
    setIsAdShown: React.Dispatch<React.SetStateAction<boolean>>;
    extensions: extension[];
    rooms: room[];
    navLinks: navLinkWithId[];
    loadingStates: LoadingStates;
    isLoading: boolean; // Overall loading state (for backward compatibility)
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
    // Data states
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [siteInfo, setSiteInfo] = useState<siteInfo | null>(null);
    const [categories, setCategories] = useState<category[]>([]);
    const [socials, setSocials] = useState<socialMedia[]>([]);
    const [advertisement, setAdvertisement] = useState<advertisement | null>(
        null
    );
    const [extensions, setExtensions] = useState<extension[]>([]);
    const [rooms, setRooms] = useState<room[]>([]);
    const [navLinks, setNavLinks] = useState<navLinkWithId[]>([]);

    // UI states
    const [isAdShown, setIsAdShown] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Individual loading states
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
    const [loadingSiteInfo, setLoadingSiteInfo] = useState<boolean>(true);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [loadingSocials, setLoadingSocials] = useState<boolean>(true);
    const [loadingAdvertisement, setLoadingAdvertisement] =
        useState<boolean>(true);
    const [loadingExtensions, setLoadingExtensions] = useState<boolean>(true);
    const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
    const [loadingNavLinks, setLoadingNavLinks] = useState<boolean>(true);

    // Overall loading state (calculated from individual states)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Function to fetch products
        const fetchProducts = async () => {
            try {
                const data = await getAllProduct();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoadingProducts(false);
            }
        };

        const fetchSiteInfo = async () => {
            try {
                const data = await getSiteInfo();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setSiteInfo(data);
                }
            } catch (error) {
                console.error("Error fetching site info:", error);
            } finally {
                setLoadingSiteInfo(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchSocials = async () => {
            try {
                const data = await getAllSocialMedia();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setSocials(data);
                }
            } catch (error) {
                console.error("Error fetching socials:", error);
            } finally {
                setLoadingSocials(false);
            }
        };

        const fetchAdvertisement = async () => {
            try {
                const data = await getAdvertisement();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setAdvertisement(data);
                }
            } catch (error) {
                console.error("Error fetching advertisement:", error);
            } finally {
                setLoadingAdvertisement(false);
            }
        };

        const fetchExtensions = async () => {
            try {
                const data = await getAllExtensions();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setExtensions(data);
                }
            } catch (error) {
                console.error("Error fetching extensions:", error);
            } finally {
                setLoadingExtensions(false);
            }
        };

        const fetchRooms = async () => {
            try {
                const data = await getAllRooms();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setRooms(data);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoadingRooms(false);
            }
        };

        const fetchNavLinks = async () => {
            try {
                const data = await getAllNavLinks();
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setNavLinks(data);
                }
            } catch (error) {
                console.error("Error fetching nav links:", error);
            } finally {
                setLoadingNavLinks(false);
            }
        };

        fetchProducts();
        fetchSiteInfo();
        fetchCategories();
        fetchSocials();
        fetchAdvertisement();
        fetchExtensions();
        fetchRooms();
        fetchNavLinks();

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        const allLoaded =
            !loadingProducts &&
            !loadingSiteInfo &&
            !loadingCategories &&
            !loadingSocials &&
            !loadingAdvertisement &&
            !loadingExtensions &&
            !loadingRooms &&
            !loadingNavLinks;

        if (allLoaded) {
            setIsLoading(false);
        }
    }, [
        loadingProducts,
        loadingSiteInfo,
        loadingCategories,
        loadingSocials,
        loadingAdvertisement,
        loadingExtensions,
        loadingRooms,
        loadingNavLinks,
    ]);

    // Compile loading states
    const loadingStates: LoadingStates = {
        products: loadingProducts,
        siteInfo: loadingSiteInfo,
        categories: loadingCategories,
        socials: loadingSocials,
        advertisement: loadingAdvertisement,
        extensions: loadingExtensions,
        rooms: loadingRooms,
        navLinks: loadingNavLinks,
    };

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
                loadingStates, // Provide individual loading states
                isLoading, // Keep backward compatibility
            }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
