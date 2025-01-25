"use client";
import React, { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCountry } from "../redux/slices/BlogSlice";
import { getAllBlogCountryNames } from "../server/basic/basic";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.blogSlice.countries);
  useEffect(() => {
    getAllBlogCountryNames()
      .then((data) => {
        dispatch(addCountry(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <footer className="bg-[#093258] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap flex-col md:flex-row sm:mr-4 justify-between">
          <div className="w-1/2 md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">travel-idea</h2>
            <h2 className="text-xl font-bold mb-2">Address</h2>
            <div className="mb-4">
              <h3 className="font-semibold">Bengaluru</h3>
              <p>Travelidea, XYZ Street, New Delhi, India</p>
            </div>
            <hr className="w-48 h-1 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

            <div>
              <h3 className="font-semibold">Mumbai</h3>
              <p>
                Godrej Greenvile Park, Lal Bahadur Shastri Marg, Mumbai,
                Maharastra, 400086
              </p>
            </div>
            <button className="mt-4 bg-green-500 text-white px-5 py-2 rounded-full flex items-center">
              <FaWhatsapp className={"mr-2"} />
              <span className="mr-2">Chat with us</span>
              <i className="fab fa-whatsapp"></i>
            </button>
          </div>
          <div className="w-1/2 flex flex-nowrap justify-between">
            <div className="w-full mt-12 md:w-1/3 mb-6 md:mb-0">
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full mt-12 md:w-1/3 mb-6 md:mb-0">
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Refund & cancellation policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full mt-20">
          <h3 className="font-semibold mb-2">Read more about visas</h3>
          <ul className="flex flex-wrap">
            {countries?.length > 0 ? (
              countries.map((country) => (
                <li key={country} className="mr-2 mb-2">
                  <button
                    className="hover:underline   rounded-md text-blue-600 transition hover:text-white"
                    onClick={() => {
                      const path = `/blog/${country}`;
                      router.push(path);
                    }}
                    aria-label={`View blogs for ${country}`}
                  >
                    {country}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No countries available</p>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
