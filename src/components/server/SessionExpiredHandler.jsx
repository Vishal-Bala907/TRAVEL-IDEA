import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { eventEmitter } from "./eventEmitter";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Ensure styles are imported

const SessionListener = () => {
  const router = useRouter();

  const handleSessionExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = token.split(".")[1]; // Extract the payload
      const decodedPayload = JSON.parse(atob(payload)); // Decode payload
      const expiryTimestamp = decodedPayload.exp * 1000; // Convert to ms
      const currentTimestamp = Date.now();

      if (currentTimestamp >= expiryTimestamp) {
        console.log("Session expired at:", expiryTimestamp);

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
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    eventEmitter.on("sessionExpired", handleSessionExpired);

    return () => {
      eventEmitter.off("sessionExpired", handleSessionExpired); // Cleanup
    };
  }, [eventEmitter]);

  return null;
};

export default SessionListener;
