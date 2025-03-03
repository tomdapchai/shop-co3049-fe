import api from "@/api";
import { room } from "@/types";

export interface roomWithId extends room {
    displayOrder: number;
}

export const getAllRooms = async (): Promise<
    roomWithId[] | { error: string }
> => {
    try {
        const response = await api.get("api/room/routes.php");
        console.log("Backend Response:", response.data);
        const res: roomWithId[] = response.data.data.map((room: any) => {
            return {
                roomId: room.room_id,
                name: room.name,
                image: room.image,
                displayOrder: room.display_order,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching rooms:", error);
        return { error: "Error fetching rooms" };
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

export const updateRoomOrder = async (
    rooms: { roomId: string; displayOrder: number }[]
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post(
            "api/room/routes.php?action=reorder",
            rooms
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating room order:", error);
        return { error: "Error updating room order" };
    }
};
