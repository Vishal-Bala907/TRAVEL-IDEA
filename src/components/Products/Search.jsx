"use client";
import React, { useEffect, useState } from "react";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import "../style.css";
import { useForm } from "react-hook-form";
import AutofillCountry from "../admin/AutofillCountry";
import { useRouter } from "next/navigation";

const Search = ({ setFilter }) => {
  const [selected, setSelectedButton] = useState("all");
  const {
    control,
    watch,
    formState: { errors },
  } = useForm();
  const selectedCountry = watch("country");
  const router = useRouter();
  // useEffect(() => {}, [selectedCountry?.label]);
  // Watch the selected country
  const handleSearch = () => {
    if (selectedCountry?.label) {
      router.push(`/checkout/${selectedCountry?.label}`);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center gap-4 flex-wrap">
      <div className="w-full sm:w-1/2 max-w-[300px]">
        <div className="b-5 items-center md:mb-0 md:max-w-[384px]">
          <div
            className="relative z-20 flex h-12 items-center justify-between rounded-full border bg-white drop-shadow lg:h-14"
            id="inputDiv"
          >
            <figure className="flex w-1/6 max-w-[80px] items-center justify-center">
              <BiSolidPlaneTakeOff
                style={{
                  color: "blue",
                }}
              />
            </figure>

            <AutofillCountry
              sx={{ m: 0, width: "265px" }}
              control={control}
              name="country"
              errors={errors}
              className="w-[265px] flex-grow bg-transparent font-mono text-xs font-light text-gray-300 placeholder-gray-400 outline-none md:text-sm xl:text-base"
            />
            {/* <input
              className="flex-grow bg-transparent font-mono text-xs font-light text-gray-300 placeholder-gray-400 outline-none md:text-sm xl:text-base"
              type="text"
              placeholder="Where to, captain?"
            /> */}
            <div className="flex w-1/6 justify-end pr-1">
              <figure className="relative h-9 w-9 cursor-pointer lg:h-11 lg:w-11">
                <FaSearch
                  className="searchIcon"
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className=" no-scrollbar flex w-fit items-center justify-end gap-x-3 overflow-auto overflow-x-auto max-lg:justify-start">
        <button
          onClick={() => {
            setSelectedButton("all");
            setFilter(null);
          }}
          className={` hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868] ${selected === "all" ? "border-[#0058D8]" : ""}
      `}
        >
          All
        </button>
        <button
          onClick={() => {
            setSelectedButton("popular");
            setFilter("Popular");
          }}
          className={`hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868] ${
           selected === "popular" ? "border-[#0058D8]" : ""
         }
      `}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setSelectedButton("visaInWeek");
            setFilter("Visa in a week");
          }}
          className={`hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868]
        ${selected === "visaInWeek" ? "border-[#0058D8]" : ""}
      `}
        >
          Visa in a week
        </button>
        <button
          onClick={() => {
            setSelectedButton("easyVisa");
            setFilter("Easy Visa");
          }}
          className={`hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight bg-white
   
        ${selected === "easyVisa" ? "border-[#0058D8]" : ""}
      `}
        >
          Easy Visa
        </button>
        <button
          onClick={() => {
            setSelectedButton("season");
            setFilter("Season");
          }}
          className={`hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868]
        ${selected === "season" ? "border-[#0058D8]" : ""}
      `}
        >
          Season
        </button>
        <button
          onClick={() => {
            setSelectedButton("schengenVisa");
            setFilter("Schengen Visa");
          }}
          className={`hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
        bg-white text-[#686868]
        ${selected === "schengenVisa" ? "border-[#0058D8]" : ""}
      `}
        >
          Schengen Visa
        </button>
        <button
          onClick={() => {
            setSelectedButton("visaFree");
            setFilter("Visa Free");
          }}
          className={`hover:bg-blue-500 hover:text-white transition duration-200
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
        bg-white  text-[#686868]
        ${selected === "visaFree" ? "border-[#0058D8]" : ""}
      `}
        >
          Visa Free
        </button>
      </div>
    </div>
  );
};

export default Search;
