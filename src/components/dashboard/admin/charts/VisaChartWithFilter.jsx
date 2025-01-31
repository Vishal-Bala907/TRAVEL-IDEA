"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDataByDate } from "../../../server/admin/admin";
import GridLoaderSpinner from "../../../spinner/GridLoaderSpinner";

function VisaChartWithFilter() {
  const [timeRange, setTimeRange] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantityData, setQuantityData] = useState([
    { name: "v1", quantity: 9000 },
  ]);
  const [incomeData, setIncomeData] = useState([{ name: "v1", income: 5000 }]);

  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };

  const [loading, setLoading] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(event.target.value);
    setLoading(true);
    getDataByDate(event.target.value)
      .then((data) => {
        console.log(data);

        const income = data.ICM;
        const quantity = data.QTY;

        // Prepare new data arrays for income and quantity
        const incomeArray = [];
        const quantityArray = [];

        // Populate income and quantity data
        for (const visaType in income) {
          incomeArray.push({ name: visaType, income: income[visaType] });
        }
        for (const visaType in quantity) {
          quantityArray.push({ name: visaType, quantity: quantity[visaType] });
        }

        // Update state with new data
        setIncomeData(incomeArray);
        setQuantityData(quantityArray);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return <GridLoaderSpinner />;
  }
  const chartData = [
    {
      title: "Quantity vs VisaType",
      data: quantityData,
      color: "#8884d8",
      dataKey: "quantity",
    },
    {
      title: "Income vs VisaType",
      data: incomeData,
      color: "#82ca9d",
      dataKey: "income",
    },
  ];

  return (
    <div className="p-6 font-sans">
      <h2 className="text-center text-gray-700 text-2xl mb-6">
        Visa Quantity and Visa Income vs Visa Type
      </h2>

      <Box display="flex" justifyContent="center" mb={4} gap={2}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded p-2"
        />
      </Box>

      <div className="flex gap-6 justify-between flex-wrap">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[300px] bg-white rounded-lg shadow-lg p-4"
          >
            <h3 className="text-center text-gray-600 mb-4">{item.title}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={item.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={item.dataKey}
                  stroke={item.color}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisaChartWithFilter;
