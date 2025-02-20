import React from "react";
import { ClipLoader, FadeLoader, HashLoader } from "react-spinners";

const FullScreenSpinner = () => {
  return (
    <div className="fixed  top-[0%] left-[0%] w-full h-full bg-[#569bff38] z-50 flex justify-center align-center backdrop-blur-[10px]">
      <div className="flex justify-center items-center flex-col gap-4 top-[50%]">
        <HashLoader color="#4d006d" size={150} speedMultiplier={1} />
        <p>Adding ...</p>
      </div>
    </div>
  );
};

export default FullScreenSpinner;
