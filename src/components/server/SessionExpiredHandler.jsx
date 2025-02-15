import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { eventEmitter } from "./eventEmitter";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/navigation";
// import { info } from "console";

const SessionListener = () => {
  const router = useRouter();
  const [alertShown, setAlertShown] = useState(false);

  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Invalid token format", error);
      return null;
    }
  };

  const handleSessionExpired = () => {
    if (alertShown) return; // Prevent multiple alerts

    // alert("hellow")

    const token = localStorage.getItem("token");
    if (!token) return;

    const decodedPayload = decodeJWT(token);
    if (!decodedPayload) return;
    console.info(Date.now());
    console.info(decodedPayload.exp * 1000);

    if (Date.now() >= decodedPayload.exp * 1000) {
      // alert("hellow");
      console.log("Session expired at:", decodedPayload.exp * 1000);
      setAlertShown(true); // Mark alert as shown

      confirmAlert({
        title: "Session Expired",
        message: "Your session has expired. Would you like to log in again?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              localStorage.removeItem("token");
              setAlertShown(false); // Reset flag
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

      setTimeout(() => setAlertShown(false), 5000); // Reset flag after 5s
    }
  };

  useEffect(() => {
    eventEmitter.on("sessionExpired", handleSessionExpired);

    return () => {
      eventEmitter.off("sessionExpired", handleSessionExpired);
    };
  }, []);

  return null;
};

export default SessionListener;
