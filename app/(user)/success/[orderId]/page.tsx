"use client";
import { useState, useEffect } from "react";
import OrderCard from "@/components/card/OrderCard";
import { useParams } from "next/navigation";
import { Order } from "@/types";
import { getOderById } from "@/services/OrderServices";
const page = () => {
    const params = useParams();
    const { orderId } = params;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOderById(orderId as string).then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                console.log("Order:", data);
                setOrder(data);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col space-y-10 justify-center items-center">
            <h1 className="font-bold text-2xl text-sub">
                Order created successfully
            </h1>
            {order && <OrderCard order={order} />}
        </div>
    );
};

export default page;
