import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageInput, setPageInput] = useState(currentPage + 1); // 1-based page input

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= totalPages) {
      setPageInput(value);
    }
  };

  const handleInputBlur = () => {
    if (pageInput > 0 && pageInput <= totalPages) {
      onPageChange(pageInput - 1); // Adjust to 0-based index
    } else {
      setPageInput(currentPage + 1); // Reset to current page if input is out of range
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
      >
        Previous
      </button>

      <input
        type="number"
        value={pageInput}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="w-16 p-2 text-center border rounded"
        min={1}
        max={totalPages}
      />
      <span>of {totalPages}</span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
