import axios from "axios";
import api from "@/api";
import { Order, OrderCreate } from "@/types";

export const GetOrdersByUserId = async (
    userId: string
): Promise<Order[] | { error: string }> => {
    try {
        const response = await api.get(`api/order/routes.php?userId=${userId}`);
        console.log("Backend Response:", response.data);
        let res: Order[] = [];
        if (response.data.length > 0) {
            res = response.data.map((order: Order) => {
                return {
                    orderId: order.orderId,
                    products: order.products.map((product) => {
                        return {
                            productId: product.productId,
                            quantity: product.quantity,
                            color: product.color,
                            size: product.size,
                            productName: product.productName,
                            productImage: product.productImage,
                            productPrice: product.productPrice,
                        };
                    }),
                    status: order.status,
                    createdAt: order.createdAt,
                    completedAt: order.completedAt,
                    userId: order.userId,
                    phone_number: order.phone_number,
                    address: order.address,
                    total: Number(order.total),
                    name: order.name,
                    discount: order.discount
                        ? Number(order.discount)
                        : undefined,
                };
            });
        }

        return res;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { error: "Error fetching orders" };
    }
};

export const getAllOrders = async (): Promise<Order[] | { error: string }> => {
    try {
        const response = await api.get(`api/order/routes.php`);
        console.log("Backend Response:", response.data);
        const res: Order[] = response.data.map((order: Order) => {
            return {
                orderId: order.orderId,
                products: order.products.map((product) => {
                    return {
                        productId: product.productId,
                        quantity: product.quantity,
                        color: product.color,
                        size: product.size,
                        productName: product.productName,
                        productImage: product.productImage,
                        productPrice: product.productPrice,
                    };
                }),
                status: order.status,
                createdAt: order.createdAt,
                completedAt: order.completedAt,
                userId: order.userId,
                phone_number: order.phone_number,
                address: order.address,
                total: Number(order.total),
                name: order.name,
                discount: order.discount ? Number(order.discount) : undefined,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching orders:", error);
        return { error: "Error fetching orders" };
    }
};

export const getOderById = async (
    orderId: string
): Promise<Order | { error: string }> => {
    try {
        const response = await api.get(
            `api/order/routes.php?orderId=${orderId}`
        );
        console.log("Backend Response:", response.data);
        const res: Order = {
            orderId: response.data.orderId,
            products: response.data.products.map((product: any) => {
                return {
                    productId: product.productId,
                    quantity: product.quantity,
                    color: product.color,
                    size: product.size,
                    productName: product.productName,
                    productImage: product.productImage,
                    productPrice: product.productPrice,
                };
            }),
            status: response.data.status,
            createdAt: response.data.createdAt,
            completedAt: response.data.completedAt,
            userId: response.data.userId,
            phone_number: response.data.phone_number,
            address: response.data.address,
            total: Number(response.data.total),
            name: response.data.name,
            discount: response.data.discount
                ? Number(response.data.discount)
                : undefined,
        };
        return res;
    } catch (error) {
        console.log("Error fetching orders:", error);
        return { error: "Error fetching orders" };
    }
};

export const createOrder = async (
    data: OrderCreate
): Promise<{ orderId: string } | { error: string }> => {
    try {
        const response = await api.post(`api/order/routes.php`, data);
        console.log("Backend Response:", response.data);
        return { orderId: response.data.orderId };
    } catch (error) {
        console.log("Error creating order:", error);
        return { error: "Error creating order" };
    }
};

export const updateOrderStatus = async (
    orderId: string,
    status: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/order/routes.php?orderId=${orderId}&status=${status}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating order status:", error);
        return { error: "Error updating order status" };
    }
};

export const updateOrder = async (
    orderId: string,
    data: OrderCreate
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/order/routes.php?orderId=${orderId}`,
            data
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error update order:", error);
        return { error: "Error update order" };
    }
};

export const deleteOrder = async (
    orderId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/order/routes.php?orderId=${orderId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting order:", error);
        return { error: "Error deleting order" };
    }
};
