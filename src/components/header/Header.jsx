"use client";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFileInvoice } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import DropDown from "../admin/DropDown";
import { IoMdArchive } from "react-icons/io";
import { getArchives } from "../server/basic/basic";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const role = useSelector((state) => state.user.role);
  const auth = useSelector((state) => state.user.auth);
  const mobile = useSelector((state) => state.user.phone);
  const [archiveCount, setArchiveCount] = useState(0);
  console.log(auth);

  useEffect(() => {
    getArchives(mobile)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mobile]);

  return (
    <header className="bg-[#331749] text-white ">
      <div className="mx-auto px-4 py-6 pl-10 xl:px-20  lg:flex lg:justify-between sm:grid sm:grid-cols-1 sm:grid-rows-2 sm:justify-center sm:items-center cursor-pointer">
        <img
          onClick={() => {
            router.push("/");
          }}
          className="max-w-[140px]"
          src="/img/Capture.PNG"
          alt="logo"
        />

        <div className="flex justify-center flex-row flex-wrap items-center">
          {role === "ROLE_ADMIN" && <DropDown />}
          <div className="w-fit flex justify-center flex-row items-center gap-3 px-3">
            <img
              className="max-w-[15px] max-h-[15px]"
              src="/img/general/whatsapp.png"
              alt="earth"
            />
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Chat with us
            </a>
          </div>
          <div className="w-fit flex justify-center flex-row items-center gap-1 px-3">
            <FontAwesomeIcon
              style={{
                width: "15px",
                height: "15px",
              }}
              icon={faPhone}
            />
            <a href="#" className="text-dark px-4 py-2 rounded-md">
              075 148 529 14
            </a>
          </div>

          <div className="relative">
            <Tooltip title="Archives">
              <IoMdArchive
                style={{ fontSize: "x-large" }}
                onClick={() => {
                  router.push("/arc");
                }}
              />
            </Tooltip>

          </div>
          {role !== "ROLE_ADMIN" && (
            <div className="relative">
              <Tooltip title="Visa History">
                <FaFileInvoice
                  style={{ fontSize: "x-large", margin: "0px 0px 0px 10px" }}
                  onClick={() => {
                    router.push("/history");
                  }}
                />
              </Tooltip>
            </div>
          )}

          {auth && (
            <Tooltip title="Profile">
              <IoPersonCircle
                style={{
                  fontSize: "xxx-large",
                  margin: "0px 0px 0px 10px",
                }}
                onClick={() => {
                  setShowProfile(true);
                }}
              />
            </Tooltip>
          )}
        </div>
        {showProfile && (
          <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
        )}
      </div>
    </header>
  );
};

export default Header;
