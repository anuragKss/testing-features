import axios from "axios";

export const getPutPresignedUrl = (id, objectKey) => {
  const url = `https://localhost:5000/s3-signed-url/${id}`;
  return axios.put(url, { objectKey }).then((res) => res);
};

export const generatePresignedUrl = async (id, objectKey) => {
  const {
    data: { data: preSignedUrl },
  } = await getPutPresignedUrl(id, objectKey);
  //   console.log({ data });
  return preSignedUrl;
};

export const uploadFile = async (preSignedUrl, singleFile) => {
  // console.log({ preSignedUrl });
  // console.log({ singleFile });

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
    `https://localhost:5000/s3-signed-url/${id}?objectKey=${objectKey}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res);
};

export const finalUpload = async (image) => {
  const preSignedUrl = await generatePresignedUrl(
    image.lastModified,
    image.name
  );
  await uploadFile(preSignedUrl, image);
  // console.log({ image });
  // console.log({ lastModified: image });
  const URL = await getPresignedUrl(image.lastModified, image.name);
  // console.log({ URL });
  return URL;
};
