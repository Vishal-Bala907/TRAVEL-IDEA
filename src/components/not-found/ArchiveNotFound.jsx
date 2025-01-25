import React from "react";

const ArchiveNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-red-500">Archive Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">
          Sorry, there are no archived visas available at the moment.
        </p>
      </div>
    </div>
  );
};

export default ArchiveNotFound;
