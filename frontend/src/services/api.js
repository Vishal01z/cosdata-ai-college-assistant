import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const uploadPDF = async (file) => {
  const form = new FormData();
  form.append("file", file);

  const res = await axios.post(`${API_URL}/upload_pdf`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const askQuestion = async (query) => {
  const res = await axios.post(`${API_URL}/ask?query=${encodeURIComponent(query)}`);
  return res.data;
};
