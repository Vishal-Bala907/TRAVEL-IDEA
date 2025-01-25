"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import Bottom from "../components/bottom/Bottom2";
import Brands from "../components/brands/Brands";
import Hero from "../components/hero/Hero";
import Howitworks from "../components/howItsWorks/Howitworks";
import ProdList from "../components/Products/ProdList";
import Testimonials from "../components/testimonials/Testimonials";
import { useRouter } from "next/navigation";
import { Provider, useDispatch } from "react-redux";
import store from "../components/redux/configStore";
import { addAllVisas } from "../components/redux/slices/Visas";
import { getAllVisas, getProfile } from "../components/server/basic/basic";
import { loginUser } from "../components/redux/slices/UserSlice";

export default function Home() {
  const router = useRouter();
  // const store = configureStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    // console.log(TOKEN);
    if (!TOKEN) {
      router.push("/login");
    } else {
      // fetch user profile
      getProfile()
        .then((data) => {
          console.log(data);
          dispatch(loginUser(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllVisas()
      .then((data) => {
        console.log(data);

        dispatch(addAllVisas(data));
      })
      .catch((err) => {
        console.log(err);
      });

    // fethc all the visas
  }, []);

  return (
    <Provider store={store}>
      <Hero />
      <ProdList />
      <Brands />
      <Testimonials />
      <Howitworks />
      <Bottom />
    </Provider>
  );
}
