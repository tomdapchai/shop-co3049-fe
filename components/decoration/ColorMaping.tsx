import React from "react";

export const colorMapping = {
    black: "rgb(0, 0, 0)",
    yellow: "rgb(255, 255, 0)",
    violet: "rgb(138, 43, 226)",
    blue: "rgb(0, 0, 255)",
    green: "rgb(0, 128, 0)",
};

export const ColorMapping: React.FC = () => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Color Mapping</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Object.entries(colorMapping).map(([color, rgb]) => (
                    <div key={color} className="flex items-center space-x-2">
                        <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: rgb }}></div>
                        <span className="capitalize">{color}</span>
                        <span className="text-sm text-gray-500">{rgb}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
