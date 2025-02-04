"use client";
import React, { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCountry } from "../redux/slices/BlogSlice";
import { getAllBlogCountryNames } from "../server/basic/basic";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import Image from "next/image";

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
        <div className="flex flex-wrap flex-col justify-center md:flex-row items-center md:justify-between">
          <div className="w-1/2 md:w-1/3 mb-6 md:mb-0">
            {/* <h2 className="text-xl font-bold mb-2">travel-idea</h2> */}
            <Image
              src="/img/FINAL LOGO.png"
              width={300}
              height={100}
              alt="Final Logo"
              className="mb-8"
            />
            <h2 className="text-xl font-bold mb-2">Address</h2>
            <div className="mb-4">
              <h3 className="font-semibold">Delhi</h3>
              <p>Travelidea, XYZ Street, New Delhi, India</p>
              <div className="w-full mt-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115552.50686017331!2d75.88074163256837!3d25.168943014590713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1738670692193!5m2!1sen!2sin"
                  width="200"
                  height="100"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            {/* <hr className="w-48 h-1 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

            <div>
              <h3 className="font-semibold">Mumbai</h3>
              <p>
                Godrej Greenvile Park, Lal Bahadur Shastri Marg, Mumbai,
                Maharastra, 400086
              </p>
            </div> */}
          </div>
          <div className=" flex ">
            <div className="w-full  mt-12  mb-6 md:mb-0">
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
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
                    Terms & conditions
                  </a>
                </li>

                <div className=" flex flex-row w-full ml-2 mt-12 gap-6 md:w-1/3 mb-6 md:mb-0">
                  <a href="#" className="text-3xl">
                    <FaFacebook />
                  </a>

                  <a href="#" className="text-3xl">
                    <AiFillTwitterCircle />
                  </a>

                  <a href="#" className="text-3xl">
                    <RiInstagramFill />
                  </a>

                  {/* <li>
                  <a href="#" className="hover:underline">
                    Blogs
                  </a>
                </li> */}
                </div>
                <button className="mt-6 bg-green-500 text-white px-5 py-2 rounded-full flex items-center">
                  <FaWhatsapp className={"mr-2"} />
                  <span className="mr-2">Chat with us</span>
                  <i className="fab fa-whatsapp"></i>
                </button>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <h3 className="font-semibold mb-2">Our Blog&apos;s</h3>
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
