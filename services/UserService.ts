import api from "@/api";
import { CartItem, User } from "@/types";
export const getAllUsers = async (): Promise<User[] | { error: string }> => {
    try {
        const response = await api.get(`api/user/routes.php`);
        console.log("Backend Response:", response.data);
        const res: User[] = response.data.data.map((user: any) => {
            return {
                userId: Number(user.userId),
                name: user.username ? user.username : "",
                email: user.email ? user.email : "",
                phoneNumber: user.phone_number ? user.phone_number : "",
                address:
                    user.street && user.city
                        ? {
                              street: user.street,
                              city: user.city,
                          }
                        : { street: "", city: "" },
                cart: user.cart ? JSON.parse(user.cart) : [],
                status: user.status,
                joinAt: user.joinAt,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching users:", error);
        return { error: "Error fetching users" };
    }
};

export const getUserById = async (
    userId: string
): Promise<User | { error: string }> => {
    try {
        const response = await api.get(`api/user/routes.php?userId=${userId}`);
        console.log("Backend Response:", response.data);
        const user = response.data.data;
        return {
            userId: Number(user.userId),
            username: user.username,
            name: user.name ? user.name : "",
            email: user.email ? user.email : "",
            phoneNumber: user.phone_number ? user.phone_number : "",
            address:
                user.street && user.city
                    ? {
                          street: user.street,
                          city: user.city,
                      }
                    : { street: "", city: "" },
            cart: user.cart ? JSON.parse(user.cart) : [],
            status: user.status,
            joinAt: user.joinAt,
        };
    } catch (error) {
        console.log("Error fetching user:", error);
        return { error: "Error fetching user" };
    }
};

export const getUserByUsername = async (
    username: string
): Promise<User | { error: string }> => {
    try {
        const response = await api.get(
            `api/user/routes.php?username=${username}`
        );
        console.log("Backend Response:", response.data);
        const user = response.data.data;
        return {
            userId: Number(user.userId),
            username: user.username,
            name: user.name ? user.name : "",
            email: user.email ? user.email : "",
            phoneNumber: user.phone_number ? user.phone_number : "",
            address:
                user.street && user.city
                    ? {
                          street: user.street,
                          city: user.city,
                      }
                    : { street: "", city: "" },
            cart: user.cart ? JSON.parse(user.cart) : [],
            status: user.status,
            joinAt: user.joinAt,
        };
    } catch (error) {
        console.log("Error fetching user:", error);
        return { error: "Error fetching user" };
    }
};

export type UserInfo = Omit<User, "userId" | "cart" | "status" | "username">;
export const updateUserInfo = async (
    userId: string,
    data: Partial<UserInfo>
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(`api/user/routes.php?userId=${userId}`, {
            email: data.email,
            name: data.name,
            phone_number: data.phoneNumber,
            street: data.address ? data.address.street : "",
            city: data.address ? data.address.city : "",
        });
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating user:", error);
        return { error: "Error updating user" };
    }
};

export const updateUsername = async (
    userId: string,
    data: { username: string; newUsername: string }
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/user/routes.php?updateType=username&userId=${userId}`,
            data
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating user:", error);
        return { error: "Error updating username" };
    }
};

export const updateUserPassword = async (
    userId: string,
    data: { password: string; newPassword: string }
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/user/routes.php?updateType=password&userId=${userId}`,
            data
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating user:", error);
        return { error: "Error updating password" };
    }
};

export const adminUpdateUserPassword = async (
    userId: string,
    data: {
        newPassword: string;
    }
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/user/routes.php?updateType=adminPassword&userId=${userId}`,
            data
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating user:", error);
        return { error: "Error updating password" };
    }
};

export const deleteUser = async (
    userId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/user/routes.php?userId=${userId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting user:", error);
        return { error: "Error deleting user" };
    }
};

export const updateUserStatus = async (
    userId: string,
    status: "banned" | "active"
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post(
            `api/user/routes.php?type=${status}&userId=${userId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating user status:", error);
        return { error: "Error updating user status" };
    }
};

export const updateCart = async (
    userId: string,
    cart: CartItem[]
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/user/routes.php?updateType=cart&userId=${userId}`,
            cart
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating cart:", error);
        return { error: "Error updating cart" };
    }
};
// userCart will be done last
