import api from "@/api";
import { coupon } from "@/types";

export const getAllCoupons = async (): Promise<
    coupon[] | { error: string }
> => {
    try {
        const response = await api.get("api/coupon/routes.php");
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error fetching coupons:", error);
        return { error: "Error fetching coupons" };
    }
};

export const getCouponByCode = async (
    code: string
): Promise<coupon | { error: string }> => {
    try {
        const response = await api.get(`api/coupon/routes.php?code=${code}`);
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching coupon" };
    }
};

export const createCoupon = async (
    data: coupon
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/coupon/routes.php", data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating coupon" };
    }
};

export const updateCoupon = async (
    data: coupon
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/coupon/routes.php", data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating coupon" };
    }
};

export const deleteCoupon = async (
    code: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(`api/coupon/routes.php?code=${code}`);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting coupon:", error);
        return { error: "Error deleting coupon" };
    }
};

export const validateCoupon = async (
    code: string
): Promise<{ valid: boolean; discount: number } | { error: string }> => {
    try {
        const response = await api.post(
            "api/coupon/routes.php?action=validate",
            { code }
        );
        console.log("Backend Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.log("Error validating coupon:", error);
        return { error: "Invalid coupon code" };
    }
};
