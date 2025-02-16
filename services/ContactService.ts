import api from "@/api";
import { Contact } from "@/types";

export const getAllContacts = async (): Promise<
    Contact[] | { error: string }
> => {
    try {
        const response = await api.get("api/contact/routes.php");
        console.log("Backend Response:", response.data);
        let res: Contact[] = [];
        if (response.data.data.length > 0) {
            res = response.data.data.map((contact: any) => {
                return {
                    contactId: contact.contactId,
                    name: contact.name,
                    email: contact.email,
                    phoneNumber: contact.phone_number,
                    subject: contact.subject,
                    message: contact.message,
                };
            });
        }
        return res;
    } catch (error) {
        console.log("Error fetching contacts:", error);
        return { error: "Error fetching contacts" };
    }
};

export const getContactById = async (
    contactId: string
): Promise<Contact | { error: string }> => {
    try {
        const response = await api.get(
            `api/contact/routes.php?contactId=${contactId}`
        );
        console.log("Backend Response:", response.data);
        const contact = response.data.data;
        return {
            contactId: contact.contactId,
            name: contact.name,
            email: contact.email,
            phoneNumber: contact.phone_number,
            subject: contact.subject,
            message: contact.message,
        };
    } catch (error) {
        console.log("Error fetching contact:", error);
        return { error: "Error fetching contact" };
    }
};

export const createContact = async (
    contact: Partial<Contact>
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.post("api/contact/routes.php", contact);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error creating contact:", error);
        return { error: "Error creating contact" };
    }
};

export const updateContact = async (
    contactId: string,
    contact: Partial<Contact>
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(
            `api/contact/routes.php?contactId=${contactId}`,
            contact
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating contact:", error);
        return { error: "Error updating contact" };
    }
};

export const deleteContact = async (
    contactId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/contact/routes.php?contactId=${contactId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting contact:", error);
        return { error: "Error deleting contact" };
    }
};
