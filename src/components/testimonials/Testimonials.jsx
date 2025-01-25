import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-neutral-50 to-slate-100 py-16 text-center">
        <div className="flex items-center justify-center gap-x-4 md:gap-x-7">
          <FaStar style={{ color: "#ffd319", fontSize: "xxx-large" }} />
          <FaStar style={{ color: "#ffd319", fontSize: "xxx-large" }} />
          <FaStar style={{ color: "#ffd319", fontSize: "xxx-large" }} />
          <FaStar style={{ color: "#ffd319", fontSize: "xxx-large" }} />
          <FaStar style={{ color: "#ffd319", fontSize: "xxx-large" }} />
        </div>
        <div className="mt-6 font-lexend text-xl font-bold leading-7 text-sky-950 md:mt-10 md:text-5xl md:leading-10">
          The 5 star visa company
        </div>
        <h3 className="my-2 font-sans text-sm font-semibold leading-tight text-gray-400 md:my-8 md:text-xl">
          Travel-Idea is a top-rated visa{" "}
          <div className="flex justify-center align-center gap-2">
            <p> company, on</p>
            <img
              src="/img/general/google.png"
              alt="google icon"
              height={16}
              width={16}
              style={{
                objectFit: "contain",
              }}
            />
            <p>reviews.</p>
          </div>
        </h3>
        <section className="flex flex-col justify-center bg-undefined-100">
          <article className="flex justify-center px-4 py-6">
            <div className="grid grid-cols-[340px_300px_200px_200px] grid-rows-[200px_60px_170px] gap-3 overflow-y-hidden overflow-x-scroll xl:overflow-x-hidden">
              <article className="rounded-lg border border-slate-200 bg-white row-span-2 col-span-1">
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <figure className="h-8 w-8">
                        <img
                          src="/img/people/product_6.png"
                          className="rounded-[50%]"
                          alt="profile-pic"
                          loading="lazy"
                        />
                      </figure>
                      <p className="font-lexend text-xl font-medium leading-9 text-blue-950">
                        Swaroopa
                      </p>
                    </div>
                    <div>
                      <img
                        src="/img/reviews/vietnam.png"
                        alt="country-flag"
                        style={{ maxWidth: "30px" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                    I was initially apprehensive to avail a service through an
                    online platform. But, travel-idea’s team exceeded my
                    expectations. They have been extremely supportive at each
                    and every step. I highly recommend their services.
                  </h4>
                </div>
              </article>
              <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-2">
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <figure className="h-8 w-8">
                        <img
                          src="/img/people/product_17.png"
                          className="rounded-[50%]"
                          alt="profile-pic"
                          loading="lazy"
                        />
                      </figure>
                      <p className="font-lexend text-xl font-medium leading-9 text-blue-950">
                        Gursimran
                      </p>
                    </div>
                    <div>
                      <img
                        src="/img/reviews/france.png"
                        alt="country-flag"
                        style={{ maxWidth: "30px" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                    Absolutely brilliant support. Everything was seamless. Great
                    experience overall. I availed the services for a short term
                    Schengen visa.
                  </h4>
                </div>
              </article>
              <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-1">
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <figure className="h-8 w-8">
                        <img
                          src="/img/people/product_20.png"
                          className="rounded-[50%]"
                          alt="profile-pic"
                          loading="lazy"
                        />
                      </figure>
                      <p className="font-lexend text-xl font-medium leading-9 text-blue-950">
                        Hersh
                      </p>
                    </div>
                    <div>
                      <img
                        src="/img/reviews/vietnam.png"
                        alt="country-flag"
                        style={{ maxWidth: "30px" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                    Simple, quick, affordable & efficient.
                  </h4>
                </div>
              </article>
              {/* Repeat for other testimonials */}
              <article className="rounded-lg border border-slate-200 bg-white row-span-2 col-span-1">
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <figure className="h-8 w-8">
                        <img
                          src="/img/people/product_21.png"
                          className="rounded-[50%]"
                          alt="profile-pic"
                          loading="lazy"
                        />
                      </figure>
                      <p className="font-lexend text-xl font-medium leading-9 text-blue-950">
                        Varun
                      </p>
                    </div>
                    <div>
                      <img
                        src="/img/reviews/india.png"
                        style={{ maxWidth: "30px" }}
                        alt="country-flag"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                    travel-idea made my visa process stress-free. Highly
                    professional and efficient team.
                  </h4>
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-2 h-fit">
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <figure className="h-8 w-8">
                        <img
                          src="/img/people/product_22.png"
                          className="rounded-[50%]"
                          alt="profile-pic"
                          loading="lazy"
                        />
                      </figure>
                      <p className="font-lexend text-xl font-medium leading-9 text-blue-950">
                        Rohit
                      </p>
                    </div>
                    <div>
                      <img
                        src="/img/reviews/malaysia.png"
                        style={{ maxWidth: "30px" }}
                        alt="country-flag"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                    Amazing service! The team guided me throughout the process
                    and ensured everything was flawless.
                  </h4>
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-1">
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <figure className="h-8 w-8">
                        <img
                          src="/img/people/product_23.png"
                          className="rounded-[50%]"
                          alt="profile-pic"
                          loading="lazy"
                        />
                      </figure>
                      <p className="font-lexend text-xl font-medium leading-9 text-blue-950">
                        Karan
                      </p>
                    </div>
                    <div>
                      <img
                        src="/img/reviews/india.png"
                        style={{ maxWidth: "30px" }}
                        alt="country-flag"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                    Efficient and quick service. Highly recommend travel-idea
                    for visa assistance.
                  </h4>
                </div>
              </article>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
