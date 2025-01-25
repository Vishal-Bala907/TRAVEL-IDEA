"use client";
import { useRouter } from "next/navigation";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { RiDeleteBin5Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import UpdateModal from "./update/UpdateModal";
import { FaPencil } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { deleteVisa } from "../server/admin/admin";
import { useDispatch } from "react-redux";
import { addAllVisas } from "../redux/slices/Visas";
const tagOptions = [
  "Popular",
  "Visa in a week",
  "Easy Visa",
  "Season",
  "Schengen Visa",
  "Visa Free",
];
const ManageItem = ({ documentOptions, visaTypes, item }) => {
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (visaId) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setDeleting(true);
            deleteVisa(visaId)
              .then((data) => {
                dispatch(addAllVisas(data));
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setDeleting(false);
              });
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <section>
      <div className="relative">
        <div
          className="bg-white rounded-lg p-4 shadow-md hover:cursor-pointer m-4"
          onClick={() => router.push(`/checkout/${item.countyName}`)}
        >
          <div className="relative">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.bannerImage}`} // Replace with the actual image path
              alt="UAE"
              width={400}
              height={200}
              style={{
                objectFit: "cover",
              }}
              className="rounded-lg max-w-[400] max-h-[200px]"
            />
            {/* <div className="absolute top-2 right-2 bg-yellow-200 text-black px-2 py-1 rounded-xl text-xs">
           1954 issued recently
         </div> */}
          </div>

          <div className="mt-4">
            <h2 className="text-black text-lg font-bold">{item.countyName}</h2>
            <span className="text-white">{item.visaType}</span>
          </div>

          <div className="flex justify-between align-center">
            <div className="mt-2 text-black">
              <p className="text-3xl font-bold text-blue-800">
                ₹{item.visaFee}
              </p>
              <p className="text-sm">+₹{item.serviceFee} (Fees+Tax)</p>
            </div>

            <div className="mt-4">
              <p className="text-black">Get Visa in</p>
              <p className="text-black font-bold">
                ⚡️ {item.waitingTime} days
              </p>
            </div>
          </div>
        </div>
        <section className="absolute top-[30px] right-[3px]">
          <FaPencil
            onClick={() => {
              setUpdate(true);
            }}
            className="mb-4 text-[#00bb00] hover:shadow-2xl cursor-pointer"
            style={{
              fontSize: "1.5rem",
            }}
          />
          <RiDeleteBin5Fill
            className="mb-4 text-red-600 hover:shadow-2xl cursor-pointer"
            style={{
              fontSize: "1.5rem",
            }}
            onClick={() => {
              handleDelete(item.id);
            }}
          />
        </section>
      </div>
      {update && (
        <UpdateModal
          visa={item}
          visaTypeOptions={visaTypes}
          documentOptions={documentOptions}
          tagOptions={tagOptions}
          onClose={() => setModalOpen(false)}
          setUpdate={setUpdate}
        />
      )}
      {deleting && (
        <div className="absolute top-[0%] left-[0%] w-[100%] h-[100%] bg-[#569bff38] z-50 flex justify-center align-center backdrop-blur-[10px]">
          <div className="flex justify-center items-center flex-col gap-4 top-[50%]">
            <ClipLoader color="#4d006d" size={100} speedMultiplier={1} />
            <p>Deleting ...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageItem;
