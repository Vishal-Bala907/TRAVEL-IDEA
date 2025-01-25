"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
});

import "../../../public/fonts/fonts-css/nexa.css";

const Hero = () => {
  const [upperText, setUpperText] = useState({
    text: "smart",
    color: "#80C4E9",
    para: "dedicated visa experts",
    paraColor: "#b1f0f773",
    icon: "user",
  });
  const upperTexts = [
    {
      text: "smart",
      color: "#80C4E9",
      para: "dedicated visa experts",
      paraColor: "#b1f0f773",
      icon: "user",
    },
    {
      text: "fast",
      color: "#7E5CAD",
      para: "on time, every time",
      paraColor: "#7e5cad47",
      icon: "clocks",
    },
    {
      text: "gauranteed",
      color: "#16C47F",
      para: "99.9% approval rate",
      paraColor: "#16c47f36",
      icon: "check",
    },
  ];

  useEffect(() => {
    let index = 1;
    const interval = setInterval(() => {
      setUpperText(upperTexts[index]);
      if (index === 2) index = 0;
      else index++;
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const mainText = useRef();
  const para = useRef();

  useGSAP(() => {
    gsap.from([mainText.current, para.current], {
      opacity: 0,
      duration: 2,
      repeat: -1,
    });
  }, []);

  return (
    <main>
      <div className="mb-12 mt-10 flex flex-col items-center justify-between pl-6 pr-4 sm:flex-row md:mb-7 md:mt-6 md:gap-x-4 md:pl-12 md:pr-12 xl:pl-20 xl:pr-20">
        <div className="w-full text-center sm:text-left md:w-1/2">
          <h1 className="mb-2 text-center font-lexend text-lg font-normal text-slategray-200 sm:text-left">
            India’s most loved visa platform ❤️
          </h1>
          <div className="relative flex justify-center text-3xl font-bold md:justify-start md:text-5xl">
            <div className="NEXA-BOLD w-full text-[#252D3C]">
              <span>
                Visas made{" "}
                <b
                  ref={mainText}
                  style={{
                    color: `${upperText.color}`,
                  }}
                  className="font-bold font-sans"
                >
                  {upperText.text}
                </b>{" "}
              </span>
              <span className="animate-text ml-2 inline-block"></span>
            </div>
          </div>
          <div className="mb-12 mt-4 flex h-10 w-full justify-center sm:justify-start">
            <div
              ref={para}
              className={`animate-btn flex w-fit items-center rounded-13xl p-2 rounded-[20px]`}
              style={{
                backgroundColor: `${upperText.paraColor}`,
              }}
            >
              <img
                src={`/img/general/${upperText.icon}.png`}
                alt="icons"
                className="mx-2"
              />
              <span className="animate-btn-text w-fit font-lexend text-lg font-normal text-slategray-200">
                {upperText.para}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2 md:justify-end">
          <img
            src="/img/general/home-intro.gif"
            className="w-100 h-100 sm:h-64"
            loading="lazy"
            alt="Quick form processing"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
