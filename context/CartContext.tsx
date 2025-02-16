"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    use,
} from "react";
import { productOrderTrue } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";
import { updateCart } from "@/services/UserService";
import { clear } from "console";
interface CartContextProps {
    test: string;
    cart: productOrderTrue[];
    addToCart: (data: Partial<productOrderTrue>) => void;
    removeFromCart: (index: number) => void;
    updateQuantity: (productIndex: number, quantity: number) => void;
    updateOrderDetails: (
        productId: string,
        updates: Partial<productOrderTrue>
    ) => void;
    clearCart: () => void;
    clearCartUser: () => void;
    getCartTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const DEFAULT_ORDER: Omit<
    productOrderTrue,
    | "productId"
    | "productName"
    | "productImage"
    | "productPrice"
    | "size"
    | "color"
> = {
    quantity: 1,
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

interface CartProviderProps {
    children: React.ReactNode;
}

const STORAGE_KEY = "cart";

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const [cart, setCart] = useState<productOrderTrue[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const test = "test";
    const { toast } = useToast();

    // Initial load from localStorage - only runs once on mount
    useEffect(() => {
        if (typeof window !== "undefined" && !isInitialized) {
            try {
                const savedCart = localStorage.getItem(STORAGE_KEY);
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    if (Array.isArray(parsedCart)) {
                        setCart(parsedCart);
                    }
                }
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            } finally {
                setIsInitialized(true);
            }
        }
    }, []); // Empty dependency array for initialization only

    // Handle localStorage updates and backend sync
    useEffect(() => {
        // Strict conditions to prevent unnecessary updates
        if (!isInitialized || typeof window === "undefined") return;

        // Debounce the localStorage update
        const timeoutId = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
            } catch (error) {
                console.error("Error saving cart to localStorage:", error);
                toast({
                    title: "Error saving cart",
                    description:
                        "Your cart changes might not persist after page refresh",
                    variant: "destructive",
                });
            }

            // Only sync with backend if user is logged in and cart has items
            if (isLoggedIn && user?.userId && cart.length > 0) {
                updateCart(user.userId.toString(), cart).catch((error) => {
                    console.error("Error updating cart in backend:", error);
                    toast({
                        title: "Error updating cart",
                        description: "Failed to sync cart with server",
                        variant: "destructive",
                    });
                });
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [cart, isInitialized, isLoggedIn, user?.userId]); // Removed toast from dependencies

    // Handle cart merge on login
    useEffect(() => {
        const shouldMergeCart =
            isInitialized &&
            isLoggedIn &&
            user?.userId &&
            Array.isArray(user.cart) &&
            user.cart.length > 0;

        if (!shouldMergeCart) return;

        setCart((currentCart) => {
            // Create a map of existing items for faster lookup
            const existingItems = new Map(
                currentCart.map((item) => [
                    `${item.productId}-${item.color}-${item.size}`,
                    item,
                ])
            );

            const mergedCart = [...currentCart];
            let hasChanges = false;

            user.cart.forEach((serverItem) => {
                const itemKey = `${serverItem.productId}-${serverItem.color}-${serverItem.size}`;
                const existingItem = existingItems.get(itemKey);

                if (existingItem) {
                    // Update existing item only if quantities are different
                    if (existingItem.quantity !== serverItem.quantity) {
                        const index = mergedCart.findIndex(
                            (item) =>
                                item.productId === serverItem.productId &&
                                item.color === serverItem.color &&
                                item.size === serverItem.size
                        );
                        if (index !== -1) {
                            mergedCart[index] = {
                                ...existingItem,
                                quantity:
                                    existingItem.quantity + serverItem.quantity,
                            };
                            hasChanges = true;
                        }
                    }
                } else {
                    // Add new item
                    mergedCart.push(serverItem);
                    hasChanges = true;
                }
            });

            return hasChanges ? mergedCart : currentCart;
        });
    }, [isInitialized, isLoggedIn, user?.userId, user?.cart]); // Strict dependencies

    const addToCart = (data: Partial<productOrderTrue>) => {
        try {
            if (!data.productId) {
                throw new Error("Product ID is required");
            }

            setCart((currentCart) => {
                const existingProductIndex = currentCart.findIndex(
                    (item) =>
                        item.productId === data.productId &&
                        item.color === data.color &&
                        item.size === data.size
                );
                if (existingProductIndex >= 0) {
                    const updatedCart = [...currentCart];
                    updatedCart[existingProductIndex] = {
                        ...updatedCart[existingProductIndex],
                        quantity:
                            updatedCart[existingProductIndex].quantity +
                            (data.quantity || DEFAULT_ORDER.quantity),
                    };
                    return updatedCart;
                } else {
                    const newOrder: productOrderTrue = {
                        ...DEFAULT_ORDER,
                        ...data,
                        productId: data.productId!,
                        productName: data.productName!,
                        productImage: data.productImage!,
                        productPrice: data.productPrice!,
                        size: data.size!,
                        color: data.color!,
                    };
                    return [...currentCart, newOrder];
                }
            });
            toast({
                title: "Item added to cart",
                description: "Item added to cart successfully",
                variant: "default",
                className: "bg-sub border-none",
            });
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast({
                title: "Error adding item to cart",
                description: "An error occurred while adding item to cart",
                variant: "destructive",
            });
        }
    };

    const removeFromCart = (index: number) => {
        try {
            setCart((currentCart) => {
                const newCart = [...currentCart];
                newCart.splice(index, 1);
                return newCart;
            });
            toast({
                title: "Item removed from cart",
                description: "Item removed from cart successfully",
                variant: "destructive",
            });
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const updateQuantity = (productIndex: number, quantity: number) => {
        try {
            setCart((currentCart) => {
                const updatedCart = currentCart.map((item, index) =>
                    productIndex === index
                        ? { ...item, quantity: Math.max(1, quantity) }
                        : item
                );
                return updatedCart;
            });
            toast({
                title: "Quantity updated",
                description: "Quantity updated successfully",
                variant: "default",
                className: "bg-main border-none",
            });
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const updateOrderDetails = (
        productId: string,
        updates: Partial<productOrderTrue>
    ) => {
        try {
            setCart((currentCart) => {
                return currentCart.map((item) =>
                    item.productId === productId
                        ? { ...item, ...updates }
                        : item
                );
            });
        } catch (error) {
            console.error("Error updating order details:", error);
        }
    };

    const clearCart = () => {
        try {
            setCart([]);
            if (typeof window !== "undefined") {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const clearCartUser = () => {
        try {
            setCart([]);
            if (typeof window !== "undefined") {
                localStorage.removeItem(STORAGE_KEY);
            }
            if (isLoggedIn && user) {
                updateCart(user.userId.toString(), []);
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Don't render anything until we've initialized the cart from localStorage
    if (!isInitialized && typeof window !== "undefined") {
        return null;
    }

    return (
        <CartContext.Provider
            value={{
                test,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateOrderDetails,
                clearCart,
                clearCartUser,
                getCartTotal,
            }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
