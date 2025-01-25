"use client";
import React from "react";
import IncomeCards from "../admin/cards/IncomeCards";
import VisaQuantityChart from "./charts/VisaQuantityChart";
import VisaIncomeChart from "./charts/VisaIncomeChart";
import VisaChartWithFilter from "./charts/VisaChartWithFilter";
import TopThreeVisa from "./charts/TopThreeVisa";

const DashData = () => {
  return (
    <section className="w-[100%]">
      {/* <IncomeCards /> */}
      <VisaQuantityChart />
      <VisaIncomeChart />
      {/* <TopThreeVisa /> */}
      <VisaChartWithFilter />
    </section>
  );
};

export default DashData;
