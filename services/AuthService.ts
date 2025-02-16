import api from "@/api";
export const Login = async (
    username: string,
    password: string
): Promise<{ message: string; status: string; userId: string }> => {
    const response = await api.post(`api/auth/login.php`, {
        username,
        password,
    });

    console.log("Backend Response:", response.data);

    return {
        status: response.data.status,
        message: response.data.message,
        userId: response.data.userId,
    };
};

export const Register = async (
    username: string,
    password: string
): Promise<{ message: string; status: string }> => {
    const response = await api.post("api/auth/register.php", {
        username,
        password,
    });

    console.log("Backend Response:", response.data);
    return {
        status: response.data.status,
        message: response.data.message,
    };
};
