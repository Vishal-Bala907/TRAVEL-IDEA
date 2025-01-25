"use client"
import React from "react";
import not_found from "../../../public/img/general/not_found.jpg";
import { useRouter } from "next/navigation";

const VisaHistoryNotFound = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="text-center p-10 bg-white shadow-2xl rounded-lg">
                <img src='/img/general/not_found.jpg' alt="Not Found" className="w-1/5 mx-auto mb-6 rounded-md shadow-lg"/>
                <h1 className="text-4xl font-extrabold text-red-600">Visa History Not Found</h1>
                <p className="text-xl text-gray-700 mt-4">
                    Sorry, there are no Visa History available at the moment.
                </p>
                <button className="mt-8 px-5 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
                onClick={()=>{router.push("/")}}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default VisaHistoryNotFound;
