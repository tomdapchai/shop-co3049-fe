import React from "react";
import SignIn from "@/components/form/SignIn";
const page = () => {
    return (
        <div className="w-full flex justify-center items-center h-full">
            <SignIn type="admin" />
        </div>
    );
};

export default page;
