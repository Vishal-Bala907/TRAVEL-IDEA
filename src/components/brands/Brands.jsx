import React from "react";

const Brands = () => {
  return (
    <div className="scrollbar-hide my-6 flex flex-col items-start px-6 md:flex-row md:items-center md:justify-center md:px-0">
      <div className="mr-12 text-lg font-semibold tracking-tighter text-slate-700">
        FEATURED ON
      </div>
      <section className="scrollbar-hide flex flex-row items-center gap-x-6 overflow-x-scroll font-lexend md:gap-x-12">
        <a href="#" target="_blank" className="shrink-0">
          <img
            className="h-12 shrink-0 object-cover md:h-14"
            loading="lazy"
            alt="Economic Times"
            src="/img/brands/ect.png"
          />
        </a>
        <a href="#" target="_blank" className="shrink-0">
          <img
            className="h-12 shrink-0 object-cover md:h-14"
            loading="lazy"
            alt="Entrepreneur India"
            src="/img/brands/etp.png"
          />
        </a>
        <a href="#" target="_blank" className="shrink-0">
          <img
            className="h-12 object-contain md:h-14"
            loading="lazy"
            alt="Startup story"
            src="/img/brands/ss.png"
          />
        </a>
        <a href="#" target="_blank" className="shrink-0">
          <img
            className="w-40 object-contain"
            loading="lazy"
            alt="Entrackr"
            src="/img/brands/ent.png"
          />
        </a>
      </section>
    </div>
  );
};

export default Brands;
