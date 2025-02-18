import axios from "axios";
import apiClient from "../axiosConfig";

export const getAllVisas = async () => {
  try {
    const response = await apiClient.get(`/data/visas`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAllBlogCountryNames = async () => {
  try {
    const response = await apiClient.get(`/data/blogs/country-names`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getCountryWiseVisa = async (countryname) => {
  try {
    const response = await apiClient.get(`/data/country/name/${countryname}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllDocuments = async () => {
  try {
    const response = await apiClient.get(`/admin/visa/docs`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const uploadImage = async (image) => {
  try {
    const response = await apiClient.post(`/data/upload/img`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getDocumentList = async (countryname) => {
  try {
    const response = await apiClient.get(`/data/doc/checklist/${countryname}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getProfile = async () => {
  try {
    const response = await apiClient.get(`/data/profile`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateProfile = async (profile) => {
  try {
    const response = await apiClient.put(`/data/update/profile`, profile);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchBlogDetailsFirst = async (countryName) => {
  console.log(countryName);

  try {
    const response = await apiClient.get(`/data/blog-meta/${countryName}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// export const getProfile = await apiClient
export const getBlogData = async (id) => {
  try {
    const response = await apiClient.get(`/data/blog-data/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const addArchives = async (mobileNumber, visaId) => {
  try {
    const response = await apiClient.get(
      `/data/add-arch/${mobileNumber}/${visaId}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
//

export const getArchives = async (mobileNumber, currentPage) => {
  console.log(currentPage);

  try {
    const response = await apiClient.get(
      `/data/get-arch/${mobileNumber}?page=${currentPage}&size=20`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getPayments = async (mobileNumber) => {
  try {
    const response = await apiClient.get(`/data/get-payments/${mobileNumber}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const submitVisaRequest = async (phone, visaRequest2, id) => {
  console.log(id);

  try {
    const response = await apiClient.post(
      `/data/sumbit/visa/${phone}/${id}`,
      visaRequest2
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const makePayment = async (amount) => {
  // console.log(visaRequest2);

  try {
    const response = await apiClient.get(`/payment/create-order/${amount}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createPayment = async (details) => {
  // console.log(visaRequest2);

  try {
    const response = await apiClient.post(`/payment/make-order`, details);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const sendMail = async (details) => {
  // console.log(visaRequest2);

  try {
    const response = await apiClient.post(`/mail/sendMail`, details);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getUserVisaHistory = async (number, currentPage) => {
  // console.log(visaRequest2);

  try {
    const response = await apiClient.get(
      `/data/get/visa-history/${number}?page=${currentPage}&size=15`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAdminVisaHistory = async (currentPage) => {
  // console.log(visaRequest2);

  try {
    const response = await apiClient.get(
      `/admin/visa/get/visa-history?page=${currentPage}&size=15`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};



// export const getProfile = await apiClient
