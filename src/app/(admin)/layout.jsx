"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.role);
  const router = useRouter();

  useEffect(() => {
    if (user !== "ROLE_ADMIN") {
      router.push("/"); // Redirect after the component renders
    }
  }, [user, router]); // Dependency array ensures this only runs when `user` or `router` changes

  // Prevent rendering children until the navigation logic is resolved
  if (user !== "ROLE_ADMIN") {
    return null; // Or a loading spinner, if desired
  }

  return <div>{children}</div>;
};

export default Layout;
