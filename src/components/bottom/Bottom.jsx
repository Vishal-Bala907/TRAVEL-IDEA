"use client";
import React from "react";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import "../style.css";

const Bottom = () => {
  return (
    <div className="relative mx-10 mb-14 mt-14 flex flex-col justify-between rounded-3xl border border-stone-200 bg-[#F6F5EE] px-6 pb-5 pt-5 md:mx-auto md:w-4/5 md:flex-row md:items-center md:px-14 md:pb-14 md:pt-10">
      <div className="">
        <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
          Ready to get started? Enter your travel destination
        </h3>
        <h3 className="mb-6 mt-1 text-base font-medium leading-loose text-slate-500 md:text-lg">
          Know your visa process • Get document checklist • FREE Sign up!
        </h3>
        <div className="b-5 items-center md:mb-0 w-11/12 md:w-full">
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
            <input
              className="flex-grow bg-transparent font-mono text-xs font-light text-gray-300 placeholder-gray-400 outline-none md:text-sm xl:text-base"
              type="text"
              placeholder="Where to, captain?"
            />
            <div className="flex w-1/6 justify-end pr-1">
              <figure className="relative h-9 w-9 cursor-pointer lg:h-11 lg:w-11">
                <FaSearch className="searchIcon" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full flex-col gap-y-4 md:mt-0 md:max-w-[200px]">
        <div className="rounded-2xl bg-[#EAE8D7] px-6 py-3 font-bold">
          <span>Faster than 10-min grocery delivery</span>
        </div>
        <div className="rounded-2xl bg-[#E3E0C6] px-6 py-3 font-bold">
          <span>Safer than a state-run bank</span>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
