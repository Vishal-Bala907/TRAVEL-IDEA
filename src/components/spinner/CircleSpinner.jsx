import React from "react";
import { FadeLoader } from "react-spinners";

const CircleSpinner = () => {
  return (
    <div className="w-[100%] flex justify-center my-4">
      <FadeLoader
        color="#331749"
        margin={20}
        size={30}
        speedMultiplier={1}
        width={20}
      />
    </div>
  );
};

export default CircleSpinner;
