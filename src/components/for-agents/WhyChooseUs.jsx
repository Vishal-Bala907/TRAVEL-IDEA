import React from "react";

const WhyChooseUs = () => {
  return (
    <div>
      <article className="flex h-fit flex-col items-center space-y-3 bg-[#0058d8] py-20">
        <h2 className="items-center px-2 text-center text-[30px] font-semibold text-white md:text-5xl">
          Why travel agents choose us
        </h2>
        <div className="items-center px-2 pb-8 text-center text-[22px] text-white md:text-2xl">
          Your one-stop solution to all visa needs
        </div>
        <div className="flex flex-col items-center justify-center gap-y-8 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-5">
          <article className="flex h-24 w-72 items-center justify-center space-x-4 rounded-full bg-slate-100 text-gray-900">
            <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#0e3163]">
              <img
                alt="Lowest prices"
                loading="lazy"
                width="23"
                height="33"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/why-rupee.svg"
              />
            </div>
            <h4 className="w-40 text-[22px] font-bold text-sky-950">
              Lowest prices
            </h4>
          </article>
          <article className="flex h-24 w-72 items-center justify-center space-x-4 rounded-full bg-slate-100 text-gray-900">
            <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#0e3163]">
              <img
                alt="40+ countries"
                loading="lazy"
                width="23"
                height="33"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/why-globe.svg"
              />
            </div>
            <h4 className="w-40 text-[22px] font-bold text-sky-950">
              40+ countries
            </h4>
          </article>
          <article className="flex h-24 w-72 items-center justify-center space-x-4 rounded-full bg-slate-100 text-gray-900">
            <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#0e3163]">
              <img
                alt="Best approval rates"
                loading="lazy"
                width="23"
                height="33"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/why-rate.svg"
              />
            </div>
            <h4 className="w-40 text-[22px] font-bold text-sky-950">
              Best approval rates
            </h4>
          </article>
          <article className="flex h-24 w-72 items-center justify-center space-x-4 rounded-full bg-slate-100 text-gray-900">
            <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#0e3163]">
              <img
                alt="Zero upfront Investment"
                loading="lazy"
                width="23"
                height="33"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/why-cash.svg"
              />
            </div>
            <h4 className="w-40 text-[22px] font-bold text-sky-950">
              Zero upfront Investment
            </h4>
          </article>
        </div>
      </article>
    </div>
  );
};

export default WhyChooseUs;
