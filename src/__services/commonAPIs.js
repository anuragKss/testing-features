import axios from "axios";
import { createIdKey } from "./idKey";

const configAPI = `https://localhost:5000`;

export const getPutPresignedUrl = (id, objectKey) => {
  const url = `${configAPI}/s3-signed-url/${id}`;
  return axios.put(url, { objectKey }).then((res) => res);
};

export const generatePresignedUrl = async (id, objectKey) => {
  const {
    data: { data: preSignedUrl },
  } = await getPutPresignedUrl(id, objectKey);
  return preSignedUrl;
};

export const uploadFile = async (preSignedUrl, singleFile) => {
  try {
    const response = await fetch(preSignedUrl, {
      method: "PUT",
      body: singleFile,
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPresignedUrl = async (id, objectKey) => {
  return await fetch(
    `${configAPI}/s3-signed-url/${id}?objectKey=${objectKey}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res);
};

export const finalUpload = async (image) => {
  const {
    data: {
      data: { id, objectKey },
    },
  } = await createIdKey(image.name);
  const preSignedUrl = await generatePresignedUrl(id, objectKey);
  await uploadFile(preSignedUrl, image);
  const URL = await getPresignedUrl(id, objectKey);
  return URL;
};
