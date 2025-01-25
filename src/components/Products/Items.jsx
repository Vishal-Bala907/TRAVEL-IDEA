"use client";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useSelector } from "react-redux";
import GridLoaderSpinner from "../spinner/GridLoaderSpinner";

const ItemsList = ({ filter }) => {
  const items = useSelector((state) => state.visas.visas);
  const count = useSelector((state) => state.visas.count);
  const [visaItems, setVisaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const filteredData =
      filter !== null ? items.filter((data) => data.tag === filter) : items;

    setVisaItems(filteredData);
    setLoading(false);
  }, [filter, items]);

  if (loading) {
    return <GridLoaderSpinner />;
  }

  if (!visaItems.length) {
    return <div>No Visas available</div>;
  }

  return (
    <div className="my-5 grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-4">
      {visaItems.slice(0, count).map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsList;
