"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getCountryWiseVisa } from "../server/basic/basic";

const VisaCard = ({ name }) => {
  const [visaItems, setVisaItems] = useState([]);

  //setVisaItems(useSelector((state) => state.visas.visas));
  // var visaItems ='';
  // console.log(
  //   "redux data",
  //   useSelector((state) => state.visas.visas)
  // );
  const [filteredVisaItems, setFilteredVisaItems] = useState([]);
  useEffect(() => {
    getCountryWiseVisa(name)
      .then((data) => {
        setVisaItems(data);
        console.log("data", data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [name]);
  // Filter visa items when `visaItems` or `name` changes
  useEffect(() => {
    const filter = visaItems.filter((item) => item.countyName === name);
    setFilteredVisaItems(filter);
  }, [visaItems, name]);

  const [selectedType, setSelectedType] = useState("ALL");

  // Apply additional filtering based on `selectedType`
  const displayedVisas = filteredVisaItems.filter((item) => {
    if (selectedType === "ALL") return true;
    return item.visaType === selectedType;
  });

  return (
    <section className="flex w-full justify-center bg-[#F5F9FF] py-8">
      <div className="relative mx-6 w-full max-w-[800px] md:w-11/12">
        <div className="my-6 flex w-full justify-center gap-x-3 px-5 py-3 text-gray-500">
          <div
            className={`min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm ${
              selectedType === "ALL"
                ? "bg-[#093258] text-white"
                : "bg-slate-400 text-white"
            }`}
            onClick={() => setSelectedType("ALL")}
          >
            All
          </div>

          {visaItems.map((key, value) => (
            <div
              key={value}
              className={`hover:bg-blue-800 hover:text-white transition duration-200 min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm ${
                selectedType === key.visaType
                  ? "bg-[#093258] text-white"
                  : "bg-slate-400 text-white"
              }`}
              onClick={() => setSelectedType(key.visaType)}
            >
              {key.visaType}
            </div>
          ))}
        </div>
        <div className="relative flex flex-col gap-y-3 md:gap-y-6">
          <section
            className="flex h-fit flex-col rounded-2xl bg-[#F5F9FF] text-left shadow-lg
            border border-visa-card-bg gap-10"
          >
            {displayedVisas.map((data, idx) => (
              <Card key={idx} data={data} />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default VisaCard;
