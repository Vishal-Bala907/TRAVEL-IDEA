"use client";
import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { useSelector } from "react-redux";
import GridLoaderSpinner from "../spinner/GridLoaderSpinner";
import testimonials from "./text";
import style from "./Hero3.module.css";

const Hero3 = ({ name }) => {
  // console.log(name)
  const visas = useSelector((state) => state.visas.visas);
  const [visaImage, setVisaImage] = useState(
    "https://unsplash.com/photos/the-sun-is-setting-over-the-clouds-in-the-mountains-Vb9slLZjS84"
  );
  const [visaImage2, setVisaImage2] = useState(
    "https://unsplash.com/photos/the-sun-is-setting-over-the-clouds-in-the-mountains-Vb9slLZjS84"
  );
  const [text, setText] = useState({
    text: "Getting visa has never been this easy. This is the third visa got through Travelidea. The process is seamless.",
  });
  const [loading, setLoading] = useState(false);
  const [highestWaitingTime, sethighestWaitingTime] = useState(0);
  // console.log("visas by date", visas);

  // let highestWaitingTime = 0;
  useEffect(() => {
    setLoading(true);
    visas.forEach((visa) => {
      if (visa.countyName === name) {
        console.log(visa);
        sethighestWaitingTime(visa.waitingTime);
        setVisaImage(`${process.env.NEXT_PUBLIC_BASE_URL}/${visa.bannerImage}`);
        return;
      }
    });
    // console.log(highestWaitingTime);
    const randomNumber = Math.floor(Math.random() * 25) + 1;
    setVisaImage2(`/img/Assets/product_${randomNumber}.png`);
    setText(testimonials[randomNumber]);
    setLoading(false);
  }, [name, highestWaitingTime]);

  let finishDate = new Date();

  // Add 14 days to the date
  console.log(highestWaitingTime);
  finishDate.setDate(finishDate.getDate() + highestWaitingTime);

  // Create an array of month names
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

  // Format the date to a readable format (e.g., "dd-month-yyyy")
  let formattedDate = (date) =>
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear();
  if (loading) {
    return <GridLoaderSpinner />;
  }

  return (
    <div>
      <section
        className="flex flex-col items-center "
        style={{
          backgroundImage: "url('/img/pexels-mikka-384313-1025990.jpg')",
          backgroundSize: "cover",
        }}
      >
        <section className="mb-16 flex w-full max-w-[1100px] flex-col items-center justify-between p-6 pt-4 md:w-11/12 md:flex-row 2xl:w-[70%]">
          <section className="flex w-full flex-col gap-y-5 self-center">
            <h1
              className={`text-center text-[32px] font-bold leading-none text-gray-900 md:w-[400px] md:text-left md:text-4xl ${style.countryNameHeader}`}
            >
              Get your {name} visa
            </h1>
            <div className="flex w-full flex-col items-center md:flex-row">
              <div
                className={`${style.dateText} mb-[22px]  flex h-fit w-fit flex-row items-center justify-center rounded-[14px] bg-[#331749] p-4 pb-[14px] pt-[9px]  md:mr-6`}
              >
                <img
                  alt="timer"
                  loading="lazy"
                  width="36"
                  height="36"
                  decoding="async"
                  data-nimg="1"
                  className="mr-4"
                  src="/img/general/mdi_timer-check-outline.svg"
                  style={{ color: "transparent" }}
                />
                <p>
                  <strong className="text-base font-extrabold hover:text-[#FFC21D]">
                    Get your visa by {formattedDate(finishDate)}
                  </strong>
                  <br />
                  <span className="text-base font-normal  hover:text-[#FFC21D]">
                    if you apply today
                  </span>
                </p>
              </div>
              <div className="mb-5 flex w-full items-center justify-center md:w-fit md:flex-col xl:flex-row">
                <div className=" relative mb-0 mr-2 h-6 w-14">
                  {/* <img
                    alt="review image person 0"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-0 h-6 w-6 rounded-full border border-whitesmoke-700 object-cover"
                    src="/img/general/review-person-1.png"
                    style={{
                      color: "transparent",
                      left: "0px",
                    }}
                  />
                  <img
                    alt="review image person 1"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-0 h-6 w-6 rounded-full border border-whitesmoke-700 object-cover"
                    src="/img/general/review-person-2.png"
                    style={{ color: "transparent", left: "18px" }}
                  />
                  <img
                    alt="review image person 2"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-0 h-6 w-6 rounded-full border border-whitesmoke-700 object-cover"
                    src="/img/general/review-person-3.png"
                    style={{
                      color: "transparent",
                      left: "36px",
                    }}
                  /> */}
                </div>
                {/* <p className="text-xs text-slategray-200">
                  + {Math.floor(Math.random() * 100)}
                </p> */}
              </div>
            </div>
          </section>
          <section className="relative flex h-[216px] w-full flex-col self-center align-middle md:w-0 md:min-w-[386px]">
            <img
              alt="Banner Image"
              loading="lazy"
              width="386"
              height="216"
              decoding="async"
              data-nimg="1"
              className="h-full w-full rounded-lg border border-whitesmoke-700 object-cover"
              src={visaImage}
            />
            <div className="absolute left-4 top-12 flex w-fit items-center rounded-2xl border border-whitesmoke-700 bg-white pl-3 font-inter text-xs text-slategray-200 drop-shadow-2xl md:-left-16">
              <p className="mr-2 font-inter text-base font-extrabold">98%</p>
              <div className="flex rounded-2xl border border-y-0 border-r-0 border-whitesmoke-700 px-3 py-2">
                <SiTicktick className="font-inter text-[13px] font-medium mt-0.5 mr-1" />
                <p className="font-inter text-[13px] font-medium">
                  Approval Rate
                </p>
              </div>
            </div>
            {/* <div
              hidden=""
              className="absolute right-2 top-2 rounded-lg bg-[#F7E499] px-2 py-1 font-inter text-xs font-semibold text-[#5B4C0D]"
            ></div> */}
            <div className="absolute right-1 top-5 flex w-[146px] flex-col overflow-hidden rounded-lg border border-whitesmoke-700 bg-white drop-shadow-sm">
              <img
                alt="Recommendation Image"
                loading="lazy"
                width="146"
                height="86"
                decoding="async"
                data-nimg="1"
                className="h-[86px] w-[146px] object-contain"
                src={visaImage2}
              />
              <p className="p-2 pb-5 text-xs font-normal text-slategray-200">
                {text.text}
              </p>
            </div>
          </section>
        </section>
      </section>
      <div className="flex-start lg:no-scrollbar top-0 z-50 flex w-full gap-x-5 bg-white px-5 text-gray-900 sticky lg:justify-center cursor-pointer">
        <div
          className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200  hover:border-primary hover:text-primary sm:text-base
        "
        >
          Types of Visa
        </div>
        <div className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">
          Process
        </div>
        <div className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">
          Document Checklist
        </div>
        <div className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">
          FAQs
        </div>
      </div>
    </div>
  );
};

export default Hero3;
