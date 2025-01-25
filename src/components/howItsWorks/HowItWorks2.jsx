import React from "react";

const Howitworks2 = () => {
  return (
    <div>
      <section className="mb-14 mt-20 space-y-10">
        <div className="flex flex-col gap-y-3 text-center md:gap-y-6">
          <h2 className="text-4xl font-bold leading-snug text-sky-950 md:text-5xl">
            How it works
          </h2>
          <h3 className="max-w-xs self-center px-2 text-base leading-snug text-gray-700 md:mb-8 md:max-w-full md:px-0 md:text-2xl">
            Everything visa at one place, starting from ₹499.
          </h3>
        </div>
        <div className="flex flex-col justify-center gap-y-10 px-5 sm:px-8 md:flex-row md:flex-wrap md:gap-x-20">
          <div className="flex flex-col items-center gap-y-7">
            <figure>
              <img
                alt="You submit the details"
                loading="lazy"
                width="336"
                height="242"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/hit-3.svg"
              />
            </figure>
            <div className="w-72 pl-2.5 pr-2.5">
              <h4 className="text-2xl font-medium text-gray-800">
                You submit the details
              </h4>
              <div className="my-3 h-0.5 w-8 border border-purple-500"></div>
              <p className=" text-lg leading-snug text-slate-600">
                This is a simple process that can be done entirely online.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-7">
            <figure>
              <img
                alt="We work our magic"
                loading="lazy"
                width="336"
                height="242"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/hiw-2.svg"
              />
            </figure>
            <div className="w-72 pl-2.5 pr-2.5">
              <h4 className="text-2xl font-medium text-gray-800">
                We work our magic
              </h4>
              <div className="my-3 h-0.5 w-8 border border-green-500"></div>
              <p className=" text-lg leading-snug text-slate-600">
                We process your visa. Easily track progress via your account.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-7">
            <figure>
              <img
                alt="You get your visa"
                loading="lazy"
                width="336"
                height="242"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/img/general/hiw-3.svg"
              />
            </figure>
            <div className="w-72 pl-2.5 pr-2.5">
              <h4 className="text-2xl font-medium text-gray-800">
                You get your visa
              </h4>
              <div className="my-3 h-0.5 w-8 border border-yellow-500"></div>
              <p className=" text-lg leading-snug text-slate-600">
                Get your visa, once it’s approved. It&#39;s that easy!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Howitworks2;
