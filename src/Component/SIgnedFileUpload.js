import { stringify } from "qs";
import React, { useEffect, useState } from "react";

import { generatePresignedUrl, uploadFile } from "../commonFn";

const SignedFileUpload = () => {
  const [images, setImages] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);



  const validateImg = (e) => {
    const files = e.target.files;
    let curratedFiles = [];
    let curratedFilesPreview = [];
    console.log("files", Object.values(files));
    Object.values(files)?.forEach((file) => {
      if (file?.size >= 1048576) {
        return alert("Max File size is 1mb");
      } else {
        curratedFiles.push(file);
        curratedFilesPreview.push(URL.createObjectURL(file));
      }
    });
    setImages(curratedFiles);
    setImagePreview(curratedFilesPreview);
  };

    const handleUpload = async (e) => {
        e.preventDefault();
        let lastData = []
        for(let i = 0; i<images.length;i++){
            const receivedImage = await finalUpload(images[i]);
            lastData.push(receivedImage.data);
        }
        setUploadedImages(lastData)
    };

  const finalUpload = async (image) => {
    const preSignedUrl = await generatePresignedUrl(
      image.lastModified,
      image.name
    );
    console.log({ image });
    await uploadFile(preSignedUrl, image);
    return await fetch(`https://localhost:5000/s3-signed-url/${image.lastModified}&objectKey=${image.name}`).then(res=>res.json())
    .then(res=>res)    
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <div className="signup-image">
        <label className="image-upload" htmlFor="image-upload">
          Upload Images
        </label>
        <input
          type="file"
          id="image-upload"
          multiple
          hidden
          accept="image/png, image/jpeg, image/jpg"
          onChange={validateImg}
        />
        <button className="upload-submit" onClick={handleUpload}>
          Submit
        </button>
        <div style={{ width: "60%" }}>
          {!!imagePreview.length && <p>Image Preview</p>}
          <div className="images-preview">
            {!!imagePreview.length &&
              imagePreview.map((image) => {
                return <img src={image} />;
              })}
          </div>
        </div>
        <div style={{ width: "60%" }}>
          {!!uploadedImages.length && <p>Uploaded Images</p>}
          <div className="images-preview">
            {!!uploadedImages.length &&
              uploadedImages.map((image) => {
                return <img src={image} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedFileUpload;