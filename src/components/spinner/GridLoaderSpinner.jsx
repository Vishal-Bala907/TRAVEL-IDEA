import React from "react";
import { GridLoader } from "react-spinners";

const GridLoaderSpinner = () => {
  return (
    <div className="w-[100%] flex justify-center my-4">
      <GridLoader
        color="#331749"
        margin={20}
        size={30}
        speedMultiplier={1}
        width={20}
      />
    </div>
  );
};

export default GridLoaderSpinner;
