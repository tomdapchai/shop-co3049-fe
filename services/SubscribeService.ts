import api from "@/api";
import { subcriber } from "@/types";

export const getAllSubscribers = async (): Promise<
    subcriber[] | { error: string }
> => {
    try {
        const response = await api.get(`api/subscribe/routes.php`);
        console.log("Backend Response:", response.data);
        const res: subcriber[] = response.data.data.map((sub: any) => {
            return {
                id: sub.subcribe_id,
                email: sub.email,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching subscribers:", error);
        return { error: "Error fetching subscribers" };
    }
};

type subNoId = Omit<subcriber, "id">;

export const createSubscriber = async (
    data: subNoId
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post(`api/subscribe/routes.php`, data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating subscriber" };
    }
};

export const deleteSubscriber = async (
    subscriberId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/subscribe/routes.php?subscriberId=${subscriberId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while deleting subscriber" };
    }
};
