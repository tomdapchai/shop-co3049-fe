"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coupon } from "@/types";
import { couponSchema } from "@/lib/validation";
import {
    getAllCoupons,
    getCouponByCode,
    updateCoupon,
    createCoupon,
    deleteCoupon,
} from "@/services/CouponService";

const CouponPage = () => {
    const { toast } = useToast();
    const [coupons, setCoupons] = useState<coupon[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<coupon | null>(null);

    useEffect(() => {
        getAllCoupons().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                setCoupons(data);
            }
        });
    }, []);

    const handleAddCoupon = async (data: coupon) => {
        await createCoupon(data)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error creating coupon",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setCoupons([...coupons, data]);
            })
            .finally(() => {
                setIsDialogOpen(false);
                toast({
                    title: "Coupon added",
                    description: `${data.code} has been added successfully.`,
                });
            });
    };

    const handleEditCoupon = async (data: coupon) => {
        await updateCoupon(data).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error updating coupon",
                    description: res.error,
                    variant: "destructive",
                });
                return;
            }
            setCoupons((prev) =>
                prev.map((coupon) =>
                    coupon.code === data.code ? data : coupon
                )
            );
            setIsDialogOpen(false);
        });
    };

    const handleDeleteCoupon = async (code: string) => {
        await deleteCoupon(code).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error deleting coupon",
                    description: res.error,
                    variant: "destructive",
                });
                return;
            }
            setCoupons((prev) => prev.filter((coupon) => coupon.code !== code));
            toast({
                title: "Coupon deleted",
                description: `Coupon with code ${code} has been deleted.`,
            });
        });
    };

    const openEditDialog = (coupon: coupon) => {
        setEditingCoupon(coupon);
        setIsDialogOpen(true);
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Coupon Management</CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => setEditingCoupon(null)}
                                className="flex items-center gap-1">
                                <Plus className="h-4 w-4" /> Add coupon
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCoupon
                                        ? "Edit coupon"
                                        : "Add New coupon"}
                                </DialogTitle>
                            </DialogHeader>
                            <CouponForm
                                onSubmit={
                                    editingCoupon
                                        ? handleEditCoupon
                                        : handleAddCoupon
                                }
                                initialData={editingCoupon}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="overflow-x-auto no-scrollbar">
                    <Table className="no-scrollbar">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Discount (%)</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="no-scrollbar">
                            {coupons.map((coupon) => (
                                <TableRow key={coupon.code}>
                                    <TableCell className="font-medium">
                                        {coupon.code}
                                    </TableCell>
                                    <TableCell>{coupon.discount}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    openEditDialog(coupon)
                                                }>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteCoupon(
                                                        coupon.code
                                                    )
                                                }>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default CouponPage;

interface CouponFormProps {
    onSubmit: (data: coupon) => void;
    initialData: coupon | null;
}

function CouponForm({ onSubmit, initialData }: CouponFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof couponSchema>>({
        resolver: zodResolver(couponSchema),
        defaultValues: initialData || {
            code: "",
            discount: 0,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                    id="code"
                    {...register("code")}
                    disabled={!!initialData}
                />
                {errors.code && (
                    <p className="text-sm text-destructive">
                        {errors.code.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    {...register("discount", { valueAsNumber: true })}
                />
                {errors.discount && (
                    <p className="text-sm text-destructive">
                        {errors.discount.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit">
                    {initialData ? "Update coupon" : "Add coupon"}
                </Button>
            </div>
        </form>
    );
}
