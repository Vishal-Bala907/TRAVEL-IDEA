import React from "react";
import { FaDollarSign, FaGlobe, FaPlane } from "react-icons/fa";
import { MdOutlineWork, MdSchool } from "react-icons/md";

const previousWeek = {
  income: "23000",
  countryName: "India",
  visaType: "Tourist Visa",
};
const previousMonth = {
  income: "230000",
  countryName: "USA",
  visaType: "Student Visa",
};
const previousYear = {
  income: "2300000",
  countryName: "Israel",
  visaType: "Work Visa",
};

const IncomeCards = () => {
  return (
    <div className="flex justify-center align-center gap-4 p-4">
      {/* Card 1: Previous Week */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-md w-64">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaPlane className="text-blue-600" />
          Previous Week
        </h3>
        <p className="mb-1">
          <FaDollarSign className="inline text-green-600" />{" "}
          <strong>Income:</strong> ₹{previousWeek.income}
        </p>
        <p className="mb-1">
          <FaGlobe className="inline text-blue-600" /> <strong>Country:</strong>{" "}
          {previousWeek.countryName}
        </p>
        <p>
          <FaPlane className="inline text-purple-600" />{" "}
          <strong>Visa Type:</strong> {previousWeek.visaType}
        </p>
      </div>

      {/* Card 2: Previous Month */}
      <div className="bg-green-100 p-6 rounded-lg shadow-md w-64">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <MdSchool className="text-green-600" />
          Previous Month
        </h3>
        <p className="mb-1">
          <FaPlane className="inline text-purple-600" />{" "}
          <strong>Income:</strong> ₹{previousMonth.income}
        </p>
        <p className="mb-1">
          <FaGlobe className="inline text-blue-600" /> <strong>Country:</strong>{" "}
          {previousMonth.countryName}
        </p>
        <p>
          <MdSchool className="inline text-orange-600" />{" "}
          <strong>Visa Type:</strong> {previousMonth.visaType}
        </p>
      </div>

      {/* Card 3: Previous Year */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-64">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <MdOutlineWork className="text-yellow-600" />
          Previous Year
        </h3>
        <p className="mb-1">
          <FaDollarSign className="inline text-green-600" />{" "}
          <strong>Income:</strong> ₹{previousYear.income}
        </p>
        <p className="mb-1">
          <FaGlobe className="inline text-blue-600" /> <strong>Country:</strong>{" "}
          {previousYear.countryName}
        </p>
        <p>
          <FaPlane className="inline text-purple-600" />{" "}
          <strong>Visa Type:</strong> {previousYear.visaType}
        </p>
      </div>
    </div>
  );
};

export default IncomeCards;
