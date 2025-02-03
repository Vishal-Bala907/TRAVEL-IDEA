"use client";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import default styles

const ConfirmChoiceModal = ({ title, message, onConfirm }) => {
  const showConfirmDialog = () => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "Confirm",
          onClick: onConfirm,
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <button
      onClick={showConfirmDialog}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Show Confirm
    </button>
  );
};

export default ConfirmChoiceModal;
