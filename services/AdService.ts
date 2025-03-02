import api from "@/api";
import { advertisement } from "@/types";

export const getAdvertisement = async (): Promise<
    advertisement | { error: string }
> => {
    try {
        const response = await api.get("api/advertisement/routes.php");
        console.log("Backend Response:", response.data);
        const { id, enable, ...rest } = response.data.data;
        return { enable: enable == 0 ? false : true, ...rest };
    } catch (error) {
        console.log("Error fetching advertisement:", error);
        return { error: "Error fetching advertisement" };
    }
};

export const updateAdvertisement = async (
    data: advertisement
): Promise<{ message: string } | { error: string }> => {
    try {
        console.log("Data:", data);
        const response = await api.put("api/advertisement/routes.php", data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating category" };
    }
};
