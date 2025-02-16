import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice, formatDate } from "@/lib/utils";
import { Order } from "@/types";
import { Button } from "../ui/button";

interface OrderCardProps {
    order: Order;
    admin?: boolean;
    onComplete?: () => void;
    onCancel?: () => void;
}

export default function OrderCard({
    order,
    admin = false,
    onComplete = () => {},
    onCancel = () => {},
}: OrderCardProps) {
    return (
        <Card className="w-full max-w-4xl min-w-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                    Order #{order.orderId}
                </CardTitle>
                <Badge
                    variant={
                        order.status === "completed" ? "default" : "secondary"
                    }
                    className={`${
                        order.status === "completed"
                            ? "bg-green-500"
                            : order.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                    }`}>
                    {order.status}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p>Customer: {order.name}</p>
                            <p>Phone: {order.phone_number}</p>
                        </div>
                        <div>
                            <p className="break-words">
                                Address: {order.address}
                            </p>
                            <p>
                                Created: {formatDate(new Date(order.createdAt))}
                            </p>
                            {order.completedAt && (
                                <p>
                                    Completed:{" "}
                                    {formatDate(new Date(order.completedAt))}
                                </p>
                            )}
                        </div>
                    </div>
                    <ScrollArea className="min-h-[120px] max-h-[250px] w-full rounded-md border overflow-y-auto">
                        <div className="flex flex-wrap max-md:flex-col gap-4 p-4">
                            {order.products.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 bg-secondary/10 p-2 rounded-md w-[calc(50%-2rem)] max-md:w-fit">
                                    <div className="relative w-[60px] h-[60px] flex-shrink-0">
                                        <Image
                                            src={product.productImage}
                                            alt={product.productName}
                                            fill
                                            className="object-cover rounded-md"
                                            sizes="60px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate">
                                            {product.productName}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {product.color}, Size:{" "}
                                            {product.size}
                                        </p>
                                        <p className="text-xs">
                                            Qty: {product.quantity}
                                        </p>
                                        <p className="text-xs font-semibold">
                                            {formatPrice(
                                                product.productPrice *
                                                    product.quantity
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="flex justify-between items-center pt-4 border-t">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">
                            {formatPrice(order.total)}
                        </span>
                    </div>
                </div>
            </CardContent>
            {admin && order.status == "pending" && (
                <CardFooter className="w-full flex justify-end items-center space-x-4">
                    <Button
                        className="bg-red-400 hover:bg-red-400/90"
                        onClick={onCancel}>
                        {" "}
                        Order cancel
                    </Button>
                    <Button
                        className="bg-sub text-main hover:bg-[#b88e2f]/90"
                        onClick={onComplete}>
                        Order complete
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
