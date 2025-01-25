import React from "react";

const Bottom2 = () => {
  return (
    <section
      className="flex h-fit flex-col justify-center gap-y-3 rounded-3xl px-5 py-5 lg:my-12 lg:px-12 lg:py-12"
      style={{
        background:
          "-webkit-linear-gradient(top, rgb(235, 233, 217) 0%, rgb(246, 245, 238) 100%)",
        width: "85%",
        margin: "80px auto",
        // Ensure compatibility for WebKit browsers
      }}
    >
      <div className="flex flex-col items-center gap-y-3 md:flex-row">
        <div className="w-full space-y-2 md:w-1/2 lg:w-2/3">
          <h2 className="text-center text-2xl font-bold leading-snug text-sky-950 lg:text-4xl">
            Start your visa journey today
          </h2>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2 lg:w-1/3">
          <a href="/visa-services-for-travel-agents">
            <div className="primary-button relative flex cursor-pointer items-center justify-center rounded-md px-7 py-3 w-50 h-full bg-[#0052cc]">
              {" "}
              <p className="h-fit font-semibold text-white opacity-90 undefined">
                Join Travelidea
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Bottom2;
