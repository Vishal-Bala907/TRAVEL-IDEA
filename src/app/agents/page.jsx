import Bottom2 from "../../components/bottom/Bottom2";
import Countries from "../../components/country/Countries";
import WhyChooseUs from "../../components/for-agents/WhyChooseUs";
import Hero2 from "../../components/hero/Hero2";
import Howitworks2 from "../../components/howItsWorks/HowItWorks2";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero2 />
      <WhyChooseUs />
      <Howitworks2 />
      <Countries />
      <Bottom2 />
    </div>
  );
};

export default page;
