import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const TopThreeVisa = () => {
    // Dummy data for "Top 3 Visa by Quantity"
    const visaData = [
        { name: 'Tourist Visa', value: 400 },
        { name: 'Business Visa', value: 300 },
        { name: 'Student Visa', value: 200 },
    ];

    // Dummy data for "Top 3 Most Visited Country"
    const countryData = [
        { name: 'France', value: 500 },
        { name: 'USA', value: 400 },
        { name: 'Japan', value: 300 },
    ];

    // Colors for the pie chart segments
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* First Pie Chart: Top 3 Visa by Quantity */}
            <div className="flex-1">
                <h2 className="text-center text-xl font-bold mb-4">Top 3 Visa by Quantity</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={visaData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {visaData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Second Pie Chart: Top 3 Most Visited Country */}
            <div className="flex-1">
                <h2 className="text-center text-xl font-bold mb-4">Top 3 Most Visited Country</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={countryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {countryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopThreeVisa;