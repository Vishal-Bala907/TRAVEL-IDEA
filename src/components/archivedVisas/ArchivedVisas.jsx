"use client";
import React, { useEffect, useState } from "react";
import ArchiveNotFound from "../not-found/ArchiveNotFound";
import { useSelector } from "react-redux";
import { getArchives } from "../server/basic/basic";
import GridLoaderSpinner from "../spinner/GridLoaderSpinner";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

const ArchivedVisas = () => {
  const phone = useSelector((state) => state.user.phone);
  const role = useSelector((state) => state.user.role);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(10);

  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(false);
  const mobile = role === "ROLE_ADMIN" ? "112233" : phone;
  const router = useRouter();
  // console.log(mobile);
  useEffect(() => {
    setLoading(true);
    getArchives(mobile, currentPage)
      .then((data) => {
        setTotalPages(data.totalPages);
        setVisas(data.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) {
    return <GridLoaderSpinner />;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[100%]">
      <h1 className="text-2xl font-bold mb-6 text-center">Archived Visas</h1>
      {visas.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                {role === "ROLE_ADMIN" && (
                  <th className="border px-4 py-2">Visa ID</th>
                )}
                <th className="border px-4 py-2">Mobile Number</th>
                <th className="border px-4 py-2">Visa Name</th>
                <th className="border px-4 py-2">Visa Type</th>
                <th className="border px-4 py-2">Date</th>
                {role !== "ROLE_ADMIN" && (
                  <th className="border px-4 py-2">S/T</th>
                )}
              </tr>
            </thead>
            <tbody>
              {visas.map((visa, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {role === "ROLE_ADMIN" && (
                    <td className="border px-4 py-2 text-center">
                      {visa.visaId}
                    </td>
                  )}

                  <td className="border px-4 py-2 text-center">
                    {visa.mobileNumber}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {visa.visaName}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {visa.visaType}
                  </td>
                  <td className="border px-4 py-2 text-center">{visa.date}</td>
                  {role !== "ROLE_ADMIN" && (
                    <th
                      className="border px-4 py-2"
                      onClick={() => {
                        router.push(`/submit/${visa.visaId}`);
                      }}
                    >
                      <button className="px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-500">
                        Resume
                      </button>
                    </th>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      ) : (
        <div>
          <ArchiveNotFound />
        </div>
      )}
    </div>
  );
};

export default ArchivedVisas;
