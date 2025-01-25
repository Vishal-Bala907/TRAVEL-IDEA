"use client";
import { useRouter } from "next/navigation";
import store, { persistor } from "../components/redux/configStore";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const MainProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && router.pathname !== "/login") {
      // Redirect to login page if token is not available
      // router.push("/login");
    }
  }, [router]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default MainProvider;
