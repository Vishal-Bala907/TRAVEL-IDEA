import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { eventEmitter } from "./eventEmitter";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/navigation";

const SessionExpiredHandler = () => {
  const router = useRouter();

  // Function to check token expiration and show the alert
  const checkSessionExpiration = (token) => {
    const payload = token.split(".")[1]; // Extract the payload (second part of the token)
    const decodedPayload = JSON.parse(atob(payload)); // Decode the base64 payload
    const expiryTimestamp = decodedPayload.exp * 1000; // Convert expiry to milliseconds
    const currentTimestamp = Date.now(); // Get current timestamp in milliseconds

    // If token is expired, trigger session expired alert
    if (currentTimestamp >= expiryTimestamp) {
      confirmAlert({
        title: "Session Expired",
        message: "Your session has expired. Would you like to log in again?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              localStorage.removeItem("token"); // Remove expired token
              router.push("/login"); // Redirect to login page
            },
          },
          {
            label: "No",
            onClick: () => console.log("User chose not to log in."),
          },
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        overlayClassName: "overlay-custom-class-name",
      });
    }
  };

  // Get the token from localStorage on render
  const token = localStorage.getItem("token");

  // If token exists, check its expiration
  if (token) {
    checkSessionExpiration(token);
    return;
  }

  // Optionally listen to the sessionExpired event for manual trigger
  const handleSessionExpired = () => {
    confirmAlert({
      title: "Session Expired",
      message: "Your session has expired. Would you like to log in again?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("token");
            router.push("/login");
          },
        },
        {
          label: "No",
          onClick: () => console.log("User chose not to log in."),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "overlay-custom-class-name",
    });
  };

  // Listen for sessionExpired event
  eventEmitter.on("sessionExpired", handleSessionExpired);

  // Cleanup event listener manually (for example, when component is unmounted)
  // You can do this by using a class component or some other logic to manage cleanup

  return null; // This component doesn’t render anything
};

export default SessionExpiredHandler;
