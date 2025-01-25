import React from "react";
// import india from "/img/reviews/india.png";

const Countries = () => {
  return (
    <div>
      <div className="mt-[60px] flex w-full flex-col items-center justify-center gap-y-1 bg-[#f8f9fb] py-10">
        <h3 className="w-full text-center text-[36px] font-bold text-[#082145] sm:text-[42px]">
          Live Countries
        </h3>
        <div className="flex w-full flex-col items-center justify-center"></div>
        <h3 className=" w-full pt-10 text-center text-[36px] font-bold text-[#082145] sm:text-[42px]">
          Upcoming Countries
        </h3>
        <div className="flex w-full flex-col items-center justify-center">
          <div
            className="flex-start md:no-scrollbar flex w-11/12 cursor-pointer gap-x-2 py-2 md:w-full md:justify-center md:px-3"
            // style={{ overflowX: "scroll" }}
          >
            <div className=" flex h-[43px] w-fit min-w-fit max-w-max items-center justify-center gap-x-1 rounded-full border bg-white px-3 py-2">
              <img
                alt="TAI"
                loading="lazy"
                width="15"
                height="20"
                decoding="async"
                data-nimg="1"
                src="/img/reviews/india.png"
                style={{ color: "transparent" }}
              />
              <p className="flex text-xs leading-snug text-[#292f38] lg:text-sm">
                Taiwan
              </p>
            </div>
            <div className=" flex h-[43px] w-fit min-w-fit max-w-max items-center justify-center gap-x-1 rounded-full border bg-white px-3 py-2">
              <img
                alt="BNG"
                loading="lazy"
                width="15"
                height="20"
                decoding="async"
                data-nimg="1"
                src="/img/reviews/bangladesh.png"
                style={{ color: "transparent" }}
              />
              <p className="flex text-xs leading-snug text-[#292f38] lg:text-sm">
                Bangladesh
              </p>
            </div>
            <div className=" flex h-[43px] w-fit min-w-fit max-w-max items-center justify-center gap-x-1 rounded-full border bg-white px-3 py-2">
              <img
                alt="KZ"
                loading="lazy"
                width="15"
                height="20"
                decoding="async"
                data-nimg="1"
                src="/img/reviews/kazakhstan.png"
                style={{ color: "transparent" }}
              />
              <p className="flex text-xs leading-snug text-[#292f38] lg:text-sm">
                Kazakhstan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
