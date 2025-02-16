"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Review } from "@/types";
import { User } from "@/types";
import {
    getUserById,
    updateUserStatus,
    updateUserInfo,
    updateUserPassword,
    updateUsername,
} from "@/services/UserService";
import { Order } from "@/types";
import { GetOrdersByUserId } from "@/services/OrderServices";
import { getAllReviews } from "@/services/ReviewService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import UserOrderHistory from "@/components/admin/UserOrderHistory";
import { Badge } from "@/components/ui/badge";
import { ProductDetail } from "@/types";
import { getAllProduct } from "@/services/ProductService";
import ReviewOverallCard from "@/components/card/ReviewOverallCard";
import UserInfoOverall from "@/components/admin/UserInfoOverall";
const page = () => {
    const params = useParams();
    const { userId } = params;
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<ProductDetail[]>([]);
    useEffect(() => {
        getUserById(userId as string).then((data) => {
            if ("error" in data) {
                console.log(data.error);
            } else {
                setUser(data);
            }
        });

        GetOrdersByUserId(userId as string).then((data) => {
            if ("error" in data) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });

        getAllReviews().then((data) => {
            if ("error" in data) {
                console.log(data.error);
            } else {
                const userReviews = data.filter(
                    (review) => review.userId == userId
                );
                setReviews(userReviews);
            }
        });

        setIsLoading(false);
    }, []);

    useEffect(() => {
        getAllProduct().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                // only take products available in user's reviews
                const userReviewProducts = data.filter((product) => {
                    return reviews
                        .map((review) => review.productId)
                        .includes(product.slug);
                });
                setProducts(userReviewProducts);
            }
        });
    }, [reviews]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="w-full flex flex-col justify-start items-center p-6 space-y-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>User ID: {user.userId}</p>
                    <p>Username: {user.username}</p>
                    <Badge
                        className={`${
                            user.status == "active"
                                ? "bg-green-400"
                                : "bg-red-400"
                        }`}>
                        {user.status}
                    </Badge>
                </CardContent>
            </Card>
            <div className="w-full flex justify-center items-center">
                <Tabs defaultValue="order" className="w-full">
                    <TabsList>
                        <TabsTrigger value="order">
                            Orders ({orders.length})
                        </TabsTrigger>
                        <TabsTrigger value="review">
                            Reviews ({reviews.length})
                        </TabsTrigger>
                        <TabsTrigger value="personal">
                            Personal Info
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="order">
                        {orders && <UserOrderHistory orders={orders} />}
                    </TabsContent>
                    <TabsContent value="review">
                        {reviews && (
                            <ReviewOverallCard
                                reviews={reviews}
                                products={products}
                                admin
                            />
                        )}
                    </TabsContent>
                    <TabsContent value="personal">
                        <UserInfoOverall user={user} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default page;
