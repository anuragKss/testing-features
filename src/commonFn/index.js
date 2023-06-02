import axios from "axios";

export const generatePresignedUrl = async (id, objectKey) => {
  const {
    data: { data: preSignedUrl },
  } = await getPresignedUrl(id, objectKey);
  //   console.log({ data });
  return preSignedUrl;
};

export const getPresignedUrl = (id, objectKey) => {
  const url = `https://localhost:5000/s3-signed-url/${id}`;
  return axios.put(url, { objectKey }).then((res) => res);
};

export const uploadFile = async (preSignedUrl, singleFile) => {
  console.log({ singleFile });
  let formData = new FormData();
  formData.append("file", singleFile);
  try {
    console.log({ formData });
    const response = await axios({
      method: "PUT",
      url: preSignedUrl,
      data: formData,
    });
    console.log({ response });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
