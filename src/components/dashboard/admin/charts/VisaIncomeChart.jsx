"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import { getAllICMData } from "../../../server/admin/admin";

// // Sample data for the charts
// const dataPreviousWeek = [
//   { name: "v1", income: 900 },
//   { name: "v2", income: 3000 },
//   { name: "v3", income: 2000 },
//   { name: "v4", income: 2780 },
//   { name: "v5", income: 1890 },
//   { name: "v6", income: 2390 },
//   { name: "v7", income: 8890 },
// ];

// const dataPreviousMonth = [
//   { name: "v1", income: 5000 },
//   { name: "v2", income: 4000 },
//   { name: "v3", income: 3000 },
//   { name: "v4", income: 5780 },
//   { name: "v5", income: 2890 },
//   { name: "v6", income: 3390 },
//   { name: "v7", income: 490 },
// ];

// const dataPreviousYear = [
//   { name: "v1", income: 6000 },
//   { name: "v2", income: 5000 },
//   { name: "v3", income: 4000 },
//   { name: "v4", income: 4780 },
//   { name: "v5", income: 3890 },
//   { name: "v6", income: 4390 },
//   { name: "v7", income: 8900 },
// ];

function VisaIncomeChart() {
  const [timeRange, setTimeRange] = useState("");
  // Sample data for different time ranges
  const [dataPreviousWeek, setDataPreviousWeek] = useState([
    { name: "v1", income: 90 },
  ]);

  const [dataPreviousMonth, setDataPreviousMonth] = useState([
    { name: "v1", income: 5000 },
  ]);

  const [dataPreviousYear, setDataPreviousYear] = useState([
    { name: "v1", income: 6000 },
  ]);

  useEffect(() => {
    getAllICMData()
      .then((data) => {
        // console.log(data);

        const monthData = data.month;
        const weekData = data.week;
        const yearData = data.year;

        // Prepare new data arrays for income and quantity
        const monthArray = [];
        const weekArray = [];
        const yearArray = [];

        // Populate income and quantity data
        for (const visaType in monthData) {
          monthArray.push({
            name: visaType,
            income: monthData[visaType],
          });
        }
        for (const visaType in weekData) {
          weekArray.push({ name: visaType, income: weekData[visaType] });
        }
        for (const visaType in yearData) {
          yearArray.push({ name: visaType, income: yearData[visaType] });
        }

        // Update state with new data
        setDataPreviousWeek(weekArray);
        setDataPreviousMonth(monthArray);
        setDataPreviousYear(yearArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };

  const chartData = [
    { title: "Previous Week", data: dataPreviousWeek, color: "#8884d8" },
    { title: "Previous Month", data: dataPreviousMonth, color: "#82ca9d" },
    { title: "Previous Year", data: dataPreviousYear, color: "#ff7300" },
  ];

  return (
    <div className="p-6 font-sans">
      <h2 className="text-center text-gray-700 text-2xl mb-6">
        Visa Income vs Visa Type
      </h2>

      {/* Time Range Selector (Commented Out)
      <Box display="flex" justifyContent="center" mb={4}>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel id="time-range-label">Time Range</InputLabel>
          <Select
            labelId="time-range-label"
            value={timeRange}
            onChange={handleChange}
            label="Time Range"
          >
            <MenuItem value="previous-week">Previous Week</MenuItem>
            <MenuItem value="previous-month">Previous Month</MenuItem>
            <MenuItem value="previous-year">Previous Year</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      <div className="flex gap-6 flex-col justify-between flex-wrap">
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
                  dataKey="income"
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

export default VisaIncomeChart;
