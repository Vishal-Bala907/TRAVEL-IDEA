import React from "react";

const Hero2 = () => {
  return (
    <section className="flex flex-col md:flex-row">
      {/* Left Section */}
      <section
        className="flex w-full flex-col gap-y-4 pb-6 pt-8 md:w-1/2 md:pl-12 md:pt-10  xl:pl-20 xl:pt-16"
        data-protonpass-form=""
      >
        <h1 className="bg-gradient-to-tr from-blue-600 to-teal-500 bg-clip-text text-center text-4xl font-bold leading-none text-transparent md:text-start md:text-[4vw] md:font-semibold">
          Get your travel visa,<span className="block">quick and easy.</span>
        </h1>
        <h2 className="flex flex-col items-center text-base leading-snug text-blue-950 md:items-start md:text-[2.5vw]">
          ₹499-₹1299 per visa
        </h2>
        <div className="flex w-full flex-row justify-start gap-x-2 px-4 md:justify-start md:gap-x-4 md:px-0 md:pr-[24px] lg:gap-x-6 xl:w-3/4 xl:gap-x-8">
          <div className="flex h-full w-1/2 cursor-pointer items-center justify-center gap-x-2 rounded-md bg-[#0052CC] p-1 py-3 md:p-3">
            <h3
              className="h-fit text-lg text-white opacity-100 md:text-xl"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Register for Free
            </h3>
          </div>
          <div className="flex h-full w-1/2 cursor-pointer items-center  justify-center gap-x-2 rounded-md bg-[#B3D4FF99] p-1 py-3 md:p-3">
            <h3
              className="h-fit text-lg text-[#0052cc] opacity-100 md:text-xl"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Book a Demo
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 md:items-start md:gap-y-5">
          <div className="flex w-full max-w-md justify-center md:max-w-full md:pr-6 xl:pr-20">
            <div className="b-5 items-center md:mb-0 w-11/12 md:w-full">
              <div
                className="relative z-20 flex h-12 items-center justify-between rounded-full border bg-white drop-shadow lg:h-14"
                id="inputDiv"
              >
                <figure className="flex w-1/6 max-w-[80px] items-center justify-center">
                  <svg
                    viewBox="0 0 19 20"
                    height="18"
                    width="18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-primary-icon"
                  >
                    <path d="M16.0467 15.2068H2.8926C2.46703 15.2068 2.11883 15.555 2.11883 15.9806C2.11883 16.4061 2.46703 16.7543 2.8926 16.7543H16.0467C16.4723 16.7543 16.8205 16.4061 16.8205 15.9806C16.8205 15.555 16.4723 15.2068 16.0467 15.2068ZM17.2615 7.96431C17.0913 7.3453 16.4568 6.98163 15.8378 7.14412L11.7291 8.24287L6.7305 3.58477C6.62708 3.48675 6.49991 3.41736 6.36152 3.38344C6.22312 3.34952 6.07828 3.35224 5.94126 3.39133C5.41509 3.53835 5.16749 4.14189 5.43831 4.61389L8.10007 9.22556L4.25444 10.2547L3.03962 9.2952C2.84618 9.14818 2.59857 9.09402 2.3587 9.15592L2.10336 9.22556C1.85575 9.28746 1.73968 9.57376 1.87123 9.79041L3.32591 12.3052C3.50388 12.6069 3.85981 12.754 4.19254 12.6688L16.4336 9.38805C17.0526 9.21782 17.424 8.58333 17.2615 7.96431Z"></path>
                  </svg>
                </figure>
                <input
                  className="flex-grow bg-transparent font-mono text-xs font-light text-gray-300 placeholder-gray-400 outline-none md:text-sm xl:text-base"
                  type="text"
                  placeholder="Where to, captain?"
                />
                <div className="flex w-1/6 justify-end pr-1">
                  <figure className="relative h-9 w-9 cursor-pointer lg:h-11 lg:w-11">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="23.6618"
                        cy="24.3185"
                        r="22.7218"
                        className="fill-primary-button-bg stroke-primary-button-bg "
                        strokeWidth="1.46592"
                      ></circle>
                      <rect
                        width="29.3184"
                        height="29.3184"
                        transform="translate(9.00293 9.65967)"
                        className="fill-primary-button-text"
                        fillOpacity="0.01"
                      ></rect>
                      <path
                        d="M27.1114 29.0616C25.7548 30.0902 24.0582 30.5653 22.3646 30.3911C20.6711 30.2168 19.1068 29.4062 17.988 28.1229C16.8692 26.8397 16.2792 25.1795 16.3374 23.478C16.3956 21.7765 17.0975 20.1605 18.3014 18.9567C19.5052 17.7528 21.1212 17.0509 22.8227 16.9927C24.5242 16.9345 26.1844 17.5245 27.4676 18.6433C28.7509 19.7621 29.5616 21.3264 29.7358 23.0199C29.9101 24.7135 29.4349 26.41 28.4063 27.7667L31.6399 31.0003C31.9978 31.3582 32.2874 31.721 31.6399 32.2952C30.9925 32.8693 30.7029 32.6531 30.345 32.2952L27.1114 29.0616ZM23.0521 28.5937C24.348 28.5937 25.5909 28.0789 26.5073 27.1625C27.4236 26.2462 27.9385 25.0033 27.9385 23.7073C27.9385 22.4114 27.4236 21.1685 26.5073 20.2521C25.5909 19.3358 24.348 18.8209 23.0521 18.8209C21.7561 18.8209 20.5132 19.3358 19.5969 20.2521C18.6805 21.1685 18.1657 22.4114 18.1657 23.7073C18.1657 25.0033 18.6805 26.2462 19.5969 27.1625C20.5132 28.0789 21.7561 28.5937 23.0521 28.5937Z"
                        className="fill-primary-button-text"
                      ></path>
                    </svg>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-x-1 gap-y-2 md:flex-nowrap md:justify-start">
            <div className="flex cursor-pointer items-center justify-center rounded-full border border-[#EBE9E9]  bg-white px-3 py-2">
              <div className="flex text-xs leading-snug text-blue-950 lg:text-sm">
                <img
                  alt="country-flag"
                  loading="lazy"
                  width="14"
                  height="14"
                  decoding="async"
                  data-nimg="1"
                  className="mr-1.5"
                  style={{ color: "transparent" }}
                  src="/img/reviews/vietnam.png"
                />
                Spain
              </div>
            </div>
            <div className="flex cursor-pointer items-center justify-center rounded-full border border-[#EBE9E9]  bg-white px-3 py-2">
              <div className="flex text-xs leading-snug text-blue-950 lg:text-sm">
                <img
                  alt="country-flag"
                  loading="lazy"
                  width="14"
                  height="14"
                  decoding="async"
                  data-nimg="1"
                  className="mr-1.5"
                  style={{ color: "transparent" }}
                  src="/img/reviews/vietnam.png"
                />
                Vietnam
              </div>
            </div>
            <div className="hidden xl:inline-block">
              <div className="flex cursor-pointer items-center justify-center rounded-full border border-[#EBE9E9]  bg-white px-3 py-2">
                <div className="flex text-xs leading-snug text-blue-950 lg:text-sm">
                  <img
                    alt="country-flag"
                    loading="lazy"
                    width="14"
                    height="14"
                    decoding="async"
                    data-nimg="1"
                    className="mr-1.5"
                    style={{ color: "transparent" }}
                    src="/img/reviews/india.png"
                  />
                  India
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-x-1 gap-y-2 md:flex-nowrap md:justify-start">
            <div className="flex cursor-pointer items-center justify-center rounded-full border border-[#EBE9E9]  bg-white px-3 py-2">
              <div className="flex text-xs leading-snug text-blue-950 lg:text-sm">
                <img
                  alt="country-flag"
                  loading="lazy"
                  width="14"
                  height="14"
                  decoding="async"
                  data-nimg="1"
                  className="mr-1.5"
                  style={{ color: "transparent" }}
                  src="/img/reviews/malaysia.png"
                />
                Malaysia
              </div>
            </div>
            <div className="flex cursor-pointer items-center justify-center rounded-full border border-[#EBE9E9]  bg-white px-3 py-2">
              <div className="flex text-xs leading-snug text-blue-950 lg:text-sm">
                <img
                  alt="country-flag"
                  loading="lazy"
                  width="14"
                  height="14"
                  decoding="async"
                  data-nimg="1"
                  className="mr-1.5"
                  style={{ color: "transparent" }}
                  src="/img/reviews/australia.png"
                />
                Australia
              </div>
            </div>

            <div className="flex cursor-pointer items-center justify-center rounded-full border border-[#EBE9E9]  bg-white px-3 py-2">
              <div className="flex text-xs leading-snug text-blue-950 lg:text-sm">
                40+Countries
              </div>
            </div>
          </div>
        </div>
        <h3 className="px-4 pt-20 text-center text-xs lg:px-0 lg:text-left lg:text-sm">
          Featured on
        </h3>
        <div className="sm: flex flex-row gap-x-4 gap-y-4 px-8 lg:px-0">
          <figure className="relative z-10 h-16 w-4/6 cursor-pointer lg:w-1/2">
            <img
              alt="featured_1"
              loading="lazy"
              width="450"
              height="100"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="/img/brands/ect.png"
            />
          </figure>
          <figure className="relative z-10 h-8 w-2/5 cursor-pointer lg:h-16 lg:w-1/2">
            <img
              alt="featured_"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                height: "115px",
                // width: "100%",
                color: "transparent",
              }}
              src="/img/brands/etp.png"
            />
          </figure>
        </div>
      </section>

      {/* Right Section */}
      <section className="flex w-full flex-col gap-y-3 pb-2 md:w-1/2 md:pl-6 md:pt-5">
        <video src="/videos/gif.mp4" playsInline autoPlay loop muted></video>
      </section>
    </section>
  );
};

export default Hero2;
