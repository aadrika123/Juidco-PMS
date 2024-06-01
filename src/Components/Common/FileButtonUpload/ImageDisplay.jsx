import { useState } from "react";
import { LuCloudy } from "react-icons/lu";
import pdfIcon from "@/assets/Images/pdfIcon.png";
import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";

export default function ImageDisplay({
  preview,
  imageDoc,
  alt,
  showPreview,
  width,
}) {
  const [imageModal, setImageModal] = useState(false);

  if (imageModal) {
    return (
      <ImageModal
        imageModal={imageModal}
        setImageModal={setImageModal}
        imageUrl={preview}
      />
    );
  }
  return (
    <div className={`w-full text-center rounded-md ml-44`}>
      {preview == null && (
        <div
          className={`${showPreview} p-10 mb-10 mt-5 border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col`}
        >
          {" "}
          <div className={`rounded-md mt-8`}>
            <LuCloudy className='text-[1.5rem]' />
          </div>
          <h3 class='text-xl text-black font-openSans'>Choose a file </h3>
          <h1 className='text-gray-400 text-sm'>
            JPEG, PNG, JPG, and PDF formats, up to 2MB
          </h1>
        </div>
      )}

      {imageDoc?.type?.match(/(jpg|jpeg|png)$/) && (
        <img
          src={preview}
          alt='Image Preview'
          // style={{ width: "200px", height: "auto", marginTop: "20px" }}
          className={`rounded cursor-pointer `}
          onClick={() => setImageModal(true)}
        />
      )}

      {imageDoc?.type.includes("pdf") && (
        <img
          src={pdfIcon}
          alt='Image Previewss'
          className='cursor-pointer'
          onClick={() => setImageModal(true)}
          //   style={{ marginTop: "20px", width: "400px", height: "250px" }}
        />
      )}

      <div className='mb-4 text-center w-full'>
        <p className='text-red-500 text-xs'>{imageDoc?.name}</p>
      </div>
    </div>
  );
}
