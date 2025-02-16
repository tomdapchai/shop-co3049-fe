"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { ProductDetail, siteInfo } from "@/types";
import { getAllProduct } from "@/services/ProductService";
import { getSiteInfo } from "@/services/SiteInfoService";

interface ProductContextProps {
    products: ProductDetail[];
    siteInfo: siteInfo | null;
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
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        Promise.all([getAllProduct(), getSiteInfo()])
            .then(([productData, siteInfoData]) => {
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
            })
            .finally(() => setIsInitialized(true));
    }, []);

    if (!isInitialized) {
        return null; // Or a loading spinner
    }
    return (
        <ProductContext.Provider value={{ products, siteInfo }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
