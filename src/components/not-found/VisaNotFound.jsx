import React from "react";

const VisaNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Image */}
      <img
        src="/img/general/Writer's block-rafiki.svg" // Replace with your image path
        alt="Visa Not Found"
        className="w-64 h-64 object-contain"
      />

      {/* Message */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-800">
        Visa Not Found
      </h1>
      <p className="mt-2 text-gray-600 text-center">
        We're sorry, but the visa information you’re looking for could not be
        found. Please try again or contact support for assistance.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/contact-support")} // Redirect to support or home
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Contact Support
      </button>
    </div>
  );
};

export default VisaNotFound;
