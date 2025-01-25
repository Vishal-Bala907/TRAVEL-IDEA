import Bottom from "../../components/bottom/Bottom";
import Brands from "../../components/brands/Brands";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import Howitworks from "../../components/howItsWorks/Howitworks";
import ProdList from "../../components/Products/ProdList";
import Testimonials from "../../components/testimonials/Testimonials";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ProdList />
      <Brands />
      <Testimonials />
      <Howitworks />
      <Bottom />
      <Footer />
    </div>
  );
};

export default page;
