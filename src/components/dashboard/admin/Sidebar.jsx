"use client";
import React from "react";
import "./global.css";

const Sidebar = ({ setSelected }) => {
  return (
    <div className="">
      {/* Sidebar */}
      <div
        className={` bg-gray-800 text-white flex lg:w-64 lg:justify-start lg:h-screen justify-center  lg:align-top sm:align-center h-fit  p-4  top-0 left-0  lg:flex-col flex-row sm:w-full `}
      >
        <ul className=" flex lg:flex-col flex-row lg:justify-center lg:align-center">
          <li
            onClick={() => {
              setSelected("charts");
            }}
            className="lg:mb-4 hover:bg-gray-700 rounded p-2"
          >
            <button>Sales</button>
          </li>
          <li
            onClick={() => {
              setSelected("pending");
            }}
            className="lg:mb-4 hover:bg-gray-700 rounded p-2"
          >
            <button>Pending</button>
          </li>
          <li
            onClick={() => {
              setSelected("new");
            }}
            className="lg:mb-4 hover:bg-gray-700 rounded p-2"
          >
            <button>New</button>
          </li>
          <li
            onClick={() => {
              setSelected("completed");
            }}
            className="lg:mb-4 hover:bg-gray-700 rounded p-2"
          >
            <button>Completed</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
