import axios from "axios";
const configAPI = `https://localhost:5000`;

export const getIdKey = async () => {
  return await axios.get(`${configAPI}/url-data`);
};

export const createIdKey = async (objectKey) => {
  return await axios.post(`${configAPI}/url-data`, { objectKey });
};

export const getIdKeyById = async (id) => {
  return await axios.get(`${configAPI}/url-data/${id}`);
};

export const updateIdKey = async (id, data) => {
  return await axios.put(`${configAPI}/url-data/${id}`, { ...data });
};

export const deleteIdKey = async (id) => {
  return await axios.delete(`${configAPI}/url-data/${id}`);
};
