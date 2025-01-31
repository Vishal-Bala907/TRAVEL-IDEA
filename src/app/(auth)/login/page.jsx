"use client";
import React, { useState } from "react";
import { loginHandler } from "../../../components/server/register";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../components/redux/slices/UserSlice";

const page = () => {
  const [mobileNumber, setNumber] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const makeUserLogin = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number", {
        position: "top-center",
      });
      return;
    }
    loginHandler({ mobileNumber })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("time", new Date().getTime());
        dispatch(
          loginUser({
            name: data.userName,
            email: data.email,
            phone: data.mobileNumber,
            role: data.role,
          })
        );
        toast.success("Login successful", { position: "top-center" });
        router.push("/");
      })
      .catch((err) => {
        toast.error("Unable to log in", { position: "top-center" });
      });
  };
  return (
    <section className="h-[100vh] flex items-center justify-center bg-[#F5F9FF] xxxs:flex-col-reverse xxxs:gap-8 xxxs:py-12 xxs:min-h-screen md:flex-row md:gap-x-6 md:px-12 lg:gap-x-12 lg:px-0 xl:gap-x-28">
      {/* <!-- Left Content --> */}
      <main className="xxxs:w-11/12 md:w-1/2 lg:w-[418px] xl:w-[40%]">
        <section className="flex h-full flex-col items-center justify-center gap-4">
          <div className="font-bold text-center xxxs:text-[17px] sm:text-xl lg:text-2xl">
            <p className="font-lexend">1,00,000+ people like you trust</p>
            <p>Travelidea for their visa application</p>
          </div>
          1{" "}
          <div className="flex gap-2 xxxs:hidden md:flex">
            <img
              src="/img/general/image71.svg"
              alt="user review"
              className="w-16 sm:w-20 lg:w-24"
            />
            <img
              src="/img/general/image72.svg"
              alt="user review"
              className="w-16 sm:w-20 lg:w-24"
            />
            <img
              src="/img/general/image73.svg"
              alt="user review"
              className="w-16 sm:w-20 lg:w-24"
            />
            <img
              src="/img/general/image74.svg"
              alt="user review"
              className="w-16 sm:w-20 lg:w-24"
            />
            <img
              src="/img/general/image75.svg"
              alt="user review"
              className="hidden sm:hidden lg:block lg:w-24"
            />
          </div>
          <div className="mt-2 flex gap-4">
            <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <span className="font-extrabold text-slategray-200">99.3%</span>
              <span className="flex rounded-2xl items-center gap-1 border px-2 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                >
                  <path
                    d="M1.33594 7.00041L5.33594 11.0004L15.0026 1.33374"
                    stroke="#34A853"
                    strokeWidth="2.67065"
                  />
                </svg>
                Approval
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <span className="flex items-center gap-1 font-extrabold text-slategray-200">
                4.4 <span>⭐</span>
              </span>
              <span className="flex items-center rounded-2xl gap-1 border px-2 py-1">
                <img
                  src="/img/general/google.svg"
                  alt="Google"
                  className="w-5"
                />
                Rating
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* <!-- Right Content --> */}
      <main className="rounded-xl border bg-white p-8 xxxs:w-11/12 md:w-1/2 lg:w-96">
        <p className="mb-2 text-center text-xl font-semibold">
          Welcome to Travel-Idea
        </p>
        <p className="mb-5 text-center text-sm text-slategray-200">
          Sign up/Login using your mobile number
        </p>
        <form className="w-full" onSubmit={makeUserLogin}>
          <div className="flex gap-3 rounded-lg border-2 bg-[#FAFBFC] p-2">
            <span className="flex items-center gap-2">
              <img src="/img/general/in.svg" alt="India" className="w-9" />
              +91
            </span>
            <input
              type="number"
              value={mobileNumber}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              name="mobileNumber"
              placeholder="Enter your mobile number"
              className="w-full bg-transparent text-base outline-none pl-4"
            />
          </div>
          {/* <span className="block text-xs text-red-500 mt-2">
            Invalid Number
          </span> */}
          <button
            type="submit"
            className="w-full mt-4 rounded-xl bg-blue-500 py-3 text-sm text-white"
          >
            Send OTP
          </button>
          <div>
            <p
              className="text-red-400 "
              style={{
                fontSize: "small",
              }}
            >
              Dont have an account : <a href="/signup">SignUp</a>
            </p>
          </div>
        </form>
        <div className="mt-2 text-center text-xs">
          By continuing, you agree to our
          <a href="" className="text-blue-500">
            terms & conditions
          </a>
        </div>
      </main>
    </section>
  );
};

export default page;
