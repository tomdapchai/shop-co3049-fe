import { ShoppingCart, RefreshCcw, Shield, Phone } from "lucide-react";

export default function ServiceFeatures() {
    const features = [
        {
            icon: <ShoppingCart className="w-12 h-12 text-gray-600" />,
            title: "Giao Hàng & Lắp Đặt",
            subtitle: "Miễn Phí",
        },
        {
            icon: <RefreshCcw className="w-12 h-12 text-gray-600" />,
            title: "Đổi Trả 1 - 1",
            subtitle: "Miễn Phí",
        },
        {
            icon: <Shield className="w-12 h-12 text-gray-600" />,
            title: "Bảo Hành 2 Năm",
            subtitle: "Miễn Phí",
        },
        {
            icon: <Phone className="w-12 h-12 text-gray-600" />,
            title: "Tư Vấn Thiết Kế",
            subtitle: "Miễn Phí",
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">
                            {feature.title}
                        </h3>
                        <p className="text-gray-500">{feature.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
