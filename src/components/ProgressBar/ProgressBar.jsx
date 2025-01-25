"use client";
import React, { useState, useEffect } from "react";
import {
  CircleCheckBig,
  FileText,
  CalendarCheck,
  MailCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

function ProgressBar({ name }) {
  const [progress, setProgress] = useState(0);
  const visas = useSelector((state) => state.visas.visas);
  // console.log("visas by date", visas);

  let highestWaitingTime = 0;
  visas.forEach((visa) => {
    if (visa.countyName === name) {
      highestWaitingTime = visa.waitingTime;
    }
  });

  let today = new Date();
  let finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + highestWaitingTime);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let formattedDate = (date) =>
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear();

  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setBackgroundImage("url('/img/general/bg-progress-bar.png')");
    } else {
      setBackgroundImage("none");
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Update every 100ms (10% per second for 10 seconds)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div>
      <div
        className="steps-container group my-8 flex flex-col items-center justify-center p-4 md:my-16"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "80% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="group mb-8 md:mb-16">
          <h2 className="pb-5 text-center text-2xl font-bold text-[#252D3D] md:text-[2rem]">
            Expert Visa Assistance in Just a Few Steps
          </h2>
        </div>
        <div className="group relative flex h-full w-full flex-row items-start justify-center gap-7 md:max-w-[521px] md:gap-8">
          <div className="absolute left-0 z-0 h-full w-16 overflow-hidden rounded-[60px] bg-[hsl(216,100%,98%)]">
            <div
              className="absolute left-[32px] z-10 h-full w-16 -translate-y-[100%] translate-x-[-50%] rounded-[60px] bg-primary  group-hover:translate-y-[0%] group-hover:bg-[#d2b4f8]"
              style={{
                height: `${progress}%`,
                width: "100%",
                backgroundColor: "#093258",
                borderRadius: "50px",
                transition: "height 0.1s linear",
              }}
            ></div>
            <div className="absolute w-16"></div>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-between py-4">
            <div className="flex w-full pb-[18px]">
              <div className="mr-[27px] flex min-w-[64px] items-center justify-center md:mr-[39px]">
                <div className="z-30 h-[34px] w-[34px] rounded-full bg-[#FADB5F]"></div>
              </div>
              <div className="w-full">
                <p className="text-base font-normal text-slategray-200">
                  Today
                </p>
                <p className="text-xl font-semibold text-[#252D3D]">
                  {formattedDate(today)}
                </p>
              </div>
            </div>
            <div>
              <div className="flex w-full py-[18px]">
                <div className="mr-[27px] flex min-w-[64px]  items-start justify-center md:mr-[39px]">
                  <FileText className="z-20  h-[34px] w-[34px]  bg-transparent transition group-hover:z-30 group-hover:invert duration-[500ms] invert-0 ease-linear" />
                  <FileText className="z-30 h-[34px] w-[34px]  bg-transparent transition group-hover:z-20 group-hover:invert duration-[2000ms] absolute invert-0 ease-linear" />
                </div>
                <p className="flex w-full flex-col font-inter text-base">
                  <span className="inline-flex pb-2 font-inter font-bold leading-[20.99px] text-[#252D3D]">
                    Start & submit your application
                  </span>
                  <span className="font-inter font-normal text-slategray-200">
                    Complete your application accurately on our user-friendly
                    platform.
                  </span>
                </p>
              </div>
              <div className="flex w-full py-[18px]">
                <div className="mr-[27px] flex min-w-[64px] items-start justify-center md:mr-[39px]">
                  <CalendarCheck className="z-20 h-[34px] w-[34px]  bg-transparent transition group-hover:z-30 group-hover:invert duration-[1000ms] invert-0 ease-linear" />
                  <CalendarCheck className="z-30 h-[34px] w-[34px]  bg-transparent transition group-hover:z-20 group-hover:invert duration-[1500ms] absolute invert-0 ease-linear" />
                </div>
                <p className="flex w-full flex-col font-inter text-base">
                  <span className="inline-flex pb-2 font-inter font-bold leading-[20.99px] text-[#252D3D]">
                    Expert review
                  </span>
                  <span className="font-inter font-normal text-slategray-200">
                    Your designated visa expert reviews your application
                  </span>
                </p>
              </div>
              <div className="flex w-full py-[18px]">
                <div className="mr-[27px] flex min-w-[64px] items-start justify-center md:mr-[39px]">
                  <MailCheck className="z-20 h-[34px] w-[34px] -10  bg-transparent transition group-hover:z-30 group-hover:invert duration-[2000ms] invert-0 ease-linear" />
                  <MailCheck className="z-30 h-[34px] w-[34px]  bg-transparent transition group-hover:z-20 group-hover:invert duration-[500ms] absolute invert-0 ease-linear" />
                </div>
                <p className="flex w-full flex-col font-inter text-base">
                  <span className="inline-flex pb-2 font-inter font-bold leading-[20.99px] text-[#252D3D]">
                    Visa delivered on time
                  </span>
                  <span className="font-inter font-normal text-slategray-200">
                    Relax as we ensure your visa is processed promptly and
                    delivered on time.
                  </span>
                </p>
              </div>
            </div>
            <div className="flex w-full pt-[18px]">
              <div className="mr-[27px] flex min-w-[64px] items-center justify-center md:mr-[39px]">
                <figure className="absolute z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#D9E8FC] group-hover:z-30 group-hover:bg-[#70CDA0] delay-[2000ms]">
                  <CircleCheckBig className="z-30 h-[34px] w-[34px] rounded-full bg-transparent transition group-hover:z-20 group-hover:invert duration-[500ms] absolute invert-0 ease-linear" />
                </figure>
                <figure className="absolute z-30 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#D9E8FC] delay-[0ms] group-hover:z-20"></figure>
              </div>
              <div className="w-full">
                <p className="text-base font-normal text-slategray-200">
                  Get visa by
                </p>
                <p className="text-xl font-semibold text-[#22A06B]">
                  {formattedDate(finishDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
