"use client";
import React, { useState, useEffect } from "react";
import "../../app/globals.css";

const Howitworks = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1.5
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="w-full bg-white px-8 py-10 text-center md:px-32 md:py-16">
        <h2 className="mt-6 font-lexend text-2xl font-extrabold leading-7 text-sky-950 md:mt-10 md:text-5xl md:leading-10">
          How it works
        </h2>
        <h3 className="my-2 font-lexend  leading-tight text-gray-400 md:my-8 md:text-xl font-bold">
          Everything visa at one place, service fee <br /> starting from only
          ₹499.
        </h3>
        <div className="mt-14 flex flex-col items-center justify-center gap-x-20 md:mt-24 md:flex-row">
          <img
            src="/img/gif/home-explanation.gif"
            alt="explanation gif"
            className="md:w-2/5"
          />
          <div className="mt-7 flex items-center gap-x-5 md:mt-0 md:w-3/5 md:gap-x-10">
            <div className="w-1 self-stretch rounded bg-gray-200 md:h-80 md:w-2">
              <div
                className="rounded bg-[#038B00] transition-all duration-500 ease-in-out h-1/5"
                style={{ height: `${progress}%` }}
              ></div>
            </div>
            <div className="pt-3">
              <h3
                className={`mb-5 text-left font-lexend text-sm font-semibold md:mb-8 md:text-2xl ${
                  progress >= 20 ? "text-grey-800" : "text-grey-400"
                }`}
              >
                Fill Out Your Details &amp; Pay
              </h3>
              <h3
                className={`mb-5 text-left font-lexend text-sm font-semibold md:mb-8 md:text-2xl ${
                  progress >= 40 ? "text-gray-800" : "text-gray-400"
                }`}
              >
                Speedy Documentation with AI
              </h3>
              <h3
                className={`mb-5 text-left font-lexend text-sm font-semibold  md:mb-8 md:text-2xl ${
                  progress >= 60 ? "text-gray-800" : "text-gray-400"
                } `}
              >
                Expert &amp; AI Double Check for a Perfect Application
              </h3>
              <h3
                className={`mb-5 text-left font-lexend text-sm font-semibold  md:mb-8 md:text-2xl ${
                  progress >= 80 ? "text-gray-800" : "text-gray-400"
                }  `}
              >
                Sit Back as We Deliver Your Visa on Time. Your Worry-Free
                Journey Begins!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howitworks;
