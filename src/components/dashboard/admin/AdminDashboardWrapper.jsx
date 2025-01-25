"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashData from "./DashData";
import Pending from "./Pending";
import New from "./New";
import Completed from "./Completed";

const AdminDashboardWrapper = () => {
  const [selected, setSelected] = useState("charts");
  return (
    <div className="flex flex-col   lg:flex-row  justify-start align-center">
      <Sidebar setSelected={setSelected} />
      {selected === "charts" ? (
        <DashData />
      ) : selected === "pending" ? (
        <Pending />
      ) : selected === "new" ? (
        <New />
      ) : selected === "completed" ? (
        <Completed />
      ) : null}
      {/* <DashData /> */}
    </div>
  );
};

export default AdminDashboardWrapper;
