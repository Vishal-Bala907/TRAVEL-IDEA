"use client";
import React, { useState } from "react";
import Filter from "../../../components/manage/Filter";
import ManageProdList from "../../../components/manage/ManageProdList";
import { useSelector } from "react-redux";

const Page = () => {
  const items = useSelector((state) => state.visas.visas || []); // Fallback for safety
  const [filter, setFilter] = useState(null); // Default filter is null (show all)

  return (
    <div>
      <section>
        {/* Pass the setFilter function to update filters dynamically */}
        <Filter setFilter={setFilter} />
        {/* Display all visas initially and apply filters dynamically */}
        <ManageProdList filter={filter} visas={items} />
      </section>
    </div>
  );
};

export default Page;
