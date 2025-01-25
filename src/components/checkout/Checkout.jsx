"use client";
import React, { useEffect, useState } from "react";
import VisaNotFound from "../not-found/VisaNotFound";
import Hero3 from "../hero/Hero3";
import VisaCard from "../visaCard/VisaCard";
import ProgressBar from "../ProgressBar/ProgressBar";
import RequiredDocs from "../docs/RequiredDocs";
import Testimonials from "../testimonials/Testimonials";
import FrequentlyAskedQuestions from "../faq/FrequentlyAskedQuestions";
import { useSelector } from "react-redux";

const Checkout = ({ formattedName }) => {
  const [isVisa, setIsVisa] = useState(false);
  const visas = useSelector((state) => state.visas.visas);
  useEffect(() => {
    visas.forEach((visa) => {
      if (visa.countyName === formattedName) {
        setIsVisa(true);
      }
    });
  }, [formattedName]);
  return (
    <div>
      {!isVisa ? (
        <div>
          <VisaNotFound />
        </div>
      ) : (
        <div>
          <Hero3 name={formattedName} />
          <VisaCard name={formattedName} />
          <ProgressBar name={formattedName} />
          <RequiredDocs name={formattedName} />
          <Testimonials />
          <FrequentlyAskedQuestions />
        </div>
      )}
    </div>
  );
};

export default Checkout;
