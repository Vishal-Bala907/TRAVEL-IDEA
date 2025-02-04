"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Item = ({ item }) => {
  // const imgPath = `${process.env.NEXT_PUBLIC_BASE_URL}/${item.bannerImage}`;
  const router = useRouter();
  const handleStartClick = (item) => {
    router.push(`/checkout/${item.countyName}`);
  };
  return (
    <div
      className="bg-white rounded-lg  hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition duration-200 transform "
      onClick={() => handleStartClick(item)}
    >
      <div className="relative">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.bannerImage}`} // Replace with the actual image path
          alt="UAE"
          height={200}
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg w-[100%] max-h-[200px]"
        />
        {/* <div className="absolute top-2 right-2 bg-yellow-200 text-black px-2 py-1 rounded-xl text-xs">
          1954 issued recently
        </div> */}
      </div>

      <div className="mt-4 px-3 border-b-2 flex flex-row justify-between">
        <h2 className="text-black text-lg font-bold">{item.countyName}</h2>
        <span className="text-black">{item.visaType}</span>
      </div>

      <div className="flex justify-between align-center px-3 pb-2 bg-[#ffc21d] rounded-sm">
        <div className="mt-2 text-black">
          <p className="text-3xl font-bold text-blue-800">₹{item.visaFee}</p>
          <p className="text-sm">+₹{item.serviceFee} (Fees+Tax)</p>
        </div>

        <div className="mt-4">
          <p className="text-black">Get Visa in</p>
          <p className="text-black font-bold">✈ {item.waitingTime} days</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
