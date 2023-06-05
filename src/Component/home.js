import React, { useEffect, useState } from "react";
import { getIdKey } from "../__services/idKey";
import { getPresignedUrl } from "../__services/commonAPIs";

const Home = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  useEffect(() => {
    handleImages();
  }, []);

  const handleImages = async () => {
    let images = [];
    const {
      data: { data: finalData },
    } = await getIdKey();

    for (let i = 0; i < finalData.length; i++) {
      images.push(
        await getPresignedUrl(finalData[i].id, finalData[i].objectKey)
      );
    }
    setUploadedImages(images);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "60%" }}>
        {!!uploadedImages.length && <p>Uploaded Images</p>}
        <div className="images-preview">
          {!!uploadedImages.length &&
            uploadedImages.map((image) => {
              return <img src={image.data} alt="" />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
