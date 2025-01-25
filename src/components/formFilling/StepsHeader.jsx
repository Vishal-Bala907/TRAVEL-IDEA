import React from "react";

const StepsHeader = ({ stage =1 , }) => {
  return (
      <div className="sticky top-0 z-[1] w-full border-b border-slategray-400 bg-white">
        <div className="flex items-center justify-around overflow-x-auto px-5 py-4 ">
          <ol className="flex w-fit items-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="flex items-center after:mx-3 after:h-0.5 after:w-[12px] after:bg-lightgray-500 after:content-[''] ">
            <span className="flex cursor-pointer items-center gap-2 max-md:flex-col ">
              <div className="text-xs max-md:text-[9px]">
                <span
                    className={`flex h-6 w-6 items-center justify-center rounded border font-lexend font-medium max-md:h-[18px] max-md:w-[18px] ${
                        stage >= 1
                            ? "border-border-neutral-light-n800 bg-border-neutral-light-n800 text-white"
                            : "border-lightgray-500 bg-whitesmoke-900 text-lightgray-500"
                    }`}
                >
                  1
                </span>
              </div>
              <div className="whitespace-nowrap font-inter text-sm font-normal max-xl:text-[11px] sm:inline-flex text-neutral-light-n900">
                <span className="hidden sm:inline-flex">Basic </span>
                <span className="hidden max-sm:inline-flex">Basic </span>
              </div>
            </span>
            </li>

            <li className="flex items-center after:mx-3 after:h-0.5 after:w-[12px] after:bg-lightgray-500 after:content-[''] ">
            <span className="flex cursor-pointer items-center gap-2 max-md:flex-col ">
              <div className="text-xs max-md:text-[9px]">
                <span
                    className={`flex h-6 w-6 items-center justify-center rounded border font-lexend font-medium max-md:h-[18px] max-md:w-[18px] ${
                        stage >= 2
                            ? "border-border-neutral-light-n800 bg-border-neutral-light-n800 text-white"
                            : "border-lightgray-500 bg-whitesmoke-900 text-lightgray-500"
                    }`}
                >
                  2
                </span>
              </div>
              <div className="whitespace-nowrap font-inter text-sm font-normal max-xl:text-[11px] sm:inline-flex text-neutral-light-n600">
                <span className="hidden sm:inline-flex">Visit </span>
                <span className="hidden max-sm:inline-flex">Visit </span>
              </div>
            </span>
            </li>

            <li className="flex items-center after:mx-3 after:h-0.5 after:w-[12px] after:bg-lightgray-500 after:content-[''] ">
            <span className="flex cursor-pointer items-center gap-2 max-md:flex-col ">
              <div className="text-xs max-md:text-[9px]">
                <span
                    className={`flex h-6 w-6 items-center justify-center rounded border font-lexend font-medium max-md:h-[18px] max-md:w-[18px] ${
                        stage >= 3
                            ? "border-border-neutral-light-n800 bg-border-neutral-light-n800 text-white"
                            : "border-lightgray-500 bg-whitesmoke-900 text-lightgray-500"
                    }`}
                >
                  3
                </span>
              </div>
              <div className="whitespace-nowrap font-inter text-sm font-normal max-xl:text-[11px] sm:inline-flex text-neutral-light-n600">
                <span className="hidden sm:inline-flex">Documents </span>
                <span className="hidden max-sm:inline-flex">Documents </span>
              </div>
            </span>
            </li>

            <li className="flex items-center">
            <span className="flex cursor-pointer items-center gap-2 max-md:flex-col ">
              <div className="text-xs max-md:text-[9px]">
                <span
                    className={`flex h-6 w-6 items-center justify-center rounded border font-lexend font-medium max-md:h-[18px] max-md:w-[18px] ${
                        stage >= 4
                            ? "border-border-neutral-light-n800 bg-border-neutral-light-n800 text-white"
                            : "border-lightgray-500 bg-whitesmoke-900 text-lightgray-500"
                    }`}
                >
                  4
                </span>
              </div>
              <div className="whitespace-nowrap font-inter text-sm font-normal max-xl:text-[11px] sm:inline-flex text-neutral-light-n600">
                <span className="hidden sm:inline-flex">Full Payment </span>
                <span className="hidden max-sm:inline-flex">Full Payment </span>
              </div>
            </span>
            </li>
          </ol>
        </div>
        <div
            className="to-green h-1 rounded bg-gradient-to-l from-lime-green"
            style={{
              width: `${(stage / 4) * 100}%`,
              background: "linear-gradient(90deg, transparent, #44ff44)",
            }}
        ></div>
      </div>
  );
};

export default StepsHeader;