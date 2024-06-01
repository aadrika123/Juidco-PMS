import { useState } from "react";
import { LuCloudy } from "react-icons/lu";
import pdfIcon from "@/assets/Images/pdfIcon.png";
import csvIcon from "@/assets/Images/csvIcon.png";
import xlsxIcon from "@/assets/Images/xlsx.png";
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
        imageDoc={imageDoc}
      />
    );
  }
  return (
    <div className={`w-${width} text-center rounded-md flex`}>
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
          className={`rounded cursor-pointer `}
          onClick={() => setImageModal(true)}
        />
      )}

      {/* {imageDoc?.type?.match(/\.(pdf|csv|xlsx)$/i) && (
        <img
          src={pdfIcon}
          alt='Image Previewss'
          className='cursor-pointer'
          onClick={() => setImageModal(true)}
        />
      )} */}

      {(imageDoc?.type === "application/pdf" ||
        imageDoc?.type === "text/csv" ||
        imageDoc?.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (
        <img
          src={
            imageDoc.type === "application/pdf"
              ? pdfIcon
              : imageDoc.type === "text/csv"
              ? csvIcon
              : xlsxIcon
          }
          alt='File Preview'
          className='cursor-pointer'
          onClick={() => setImageModal(true)}
        />
      )}

      {/* 
      <div className='mb-4 text-center w-full pl-2'>
        <p className='text-red-500 text-xs '>{imageDoc?.name}</p>
      </div> */}
    </div>
  );
}
