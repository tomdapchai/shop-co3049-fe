import api from "@/api";
import { room } from "@/types";

export const getAllRooms = async (): Promise<room[] | { error: string }> => {
    try {
        const response = await api.get("api/room/routes.php");
        console.log("Backend Response:", response.data);
        const res: room[] = response.data.data.map((room: any) => {
            return {
                roomId: room.room_id,
                name: room.name,
                image: room.image,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching categories:", error);
        return { error: "Error fetching categories" };
    }
};

export const getRoomById = async (
    roomId: string
): Promise<room | { error: string }> => {
    try {
        const response = await api.get(`api/room/routes.php?roomId=${roomId}`);
        console.log("Backend Response:", response.data);
        const { room_id, ...rest } = response.data.data;
        return {
            roomId: room_id,
            ...rest,
        };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while fetching room" };
    }
};

export const createRoom = async (
    data: room
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/room/routes.php", data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while creating room" };
    }
};

export const updateRoom = async (
    data: room
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put("api/room/routes.php", data);

        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error:", error);
        return { error: "An error occurred while updating room" };
    }
};

export const deleteRoom = async (
    roomId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/room/routes.php?roomId=${roomId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting room:", error);
        return { error: "Error deleting room" };
    }
};
