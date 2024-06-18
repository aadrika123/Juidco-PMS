import { useState } from "react";
import { LuCloudy } from "react-icons/lu";
import { useRef } from "react";
import pdfIcon from "@/assets/Images/pdfIcon.png";
import csvIcon from "@/assets/Images/csvIcon.png";
import xlsxIcon from "@/assets/Images/xlsx.png";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

export default function UploadDoc({
  tab,
  setImageDoc,
  setPreview,
  tabData,
  setTabData,
  errors,
  touched,
  formikTabs,
  formikContentVal,
  setFieldValue,
  contentDefVal,
  docs,
}) {
  const inputFileRef = useRef();

  const handleUploadDoc = () => {
    inputFileRef?.current.click();
  };

  //image validation with file type and size limit
  const imageHandler = (e) => {
    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes

    const file = e.target.files[0];
    if (!file) {
      return toast.error("No File Selected");
    }
    console.log(file.type, "file======");
    // Check the file type
    if (!validExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a JPG, JPEG, PNG, PDF, XLSX or CSV file."
      );
      setImageDoc("");
      e.target.value = ""; // Clear the input
      return;
    }

    // Check the file size
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 2MB. Please select a smaller file.");
      setImageDoc("");
      e.target.value = ""; // Clear the input
      return;
    }

    if (file) {
      setImageDoc(file);
      const spTab = tabData.map((det) => ({
        ...det,
        documents:
          det.value == tab ? [...det.documents, file] : [...det.documents],
      }));
      setTabData(spTab);
      setFieldValue("tabs", spTab);

      formikTabs = spTab;
      // tabData
      setPreview(URL.createObjectURL(file));
    }
  };

  const addContentHandler = (e) => {
    setFieldValue("content", e.target.value);
  };

  const deleteFileHandler = (fileName) => {
    const spTab = tabData.map((det) => ({
      ...det,
      documents:
        det.value == tab
          ? det.documents.filter((file) => file.name != fileName)
          : [...det.documents],
    }));
    setFieldValue("tabs", spTab);
    setTabData(spTab);
  };

  return (
    <>
      <div className='flex w-full px-10'>
        <div className=' px-5 flex flex-col rounded w-full'>
          <div className='mt-5 flex items-center'>
            <div>
              <LuCloudy className='text-[2.5rem] p-2 mr-3 mt-1 border-[2px] rounded-full' />
            </div>
            <div>
              <h1>Upload {tab} Files</h1>
            </div>
          </div>

          <hr className='w-full mt-3' />
          <>
            <div className='mb-8 mt-5 border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col'>
              <>
                <div className='rounded-md mt-8'>
                  <LuCloudy className='text-[1.5rem]' />
                </div>
                <h3 className='text-xl text-black font-openSans mb-3'>
                  Choose a file or drag & drop it here
                </h3>
                <h1 className='text-gray-400 text-sm'>
                  PDF, XLSX formats up to 2MB
                </h1>
              </>

              <div className='mb-4'>
                <input
                  type='file'
                  accept='.jpg, .jpeg, .pdf .png'
                  className='hidden'
                  ref={inputFileRef}
                  onChange={(e) => imageHandler(e)}
                />

                <div className='flex justify-center'>
                  <button
                    className={`bg-white border-gray-300 border text-gray-150 text-sm px-14 py-1 mt-2 hover:bg-gray-200 hover:text-gray-500  rounded leading-5 shadow-lg`}
                    onClick={handleUploadDoc}
                    type='button'
                  >
                    Browse File
                  </button>
                </div>
              </div>
            </div>
            <div className='mb-4'>
              {docs
                ?.find((files) => files.type === tab)
                ?.docPath?.map((file, index) => (
                  <div
                    className='mb-2 bg-[#EEF1F7] h-14 w-full rounded-md'
                    key={index}
                  >
                    <div className='flex justify-between items-center px-6 py-2 '>
                      <div className='flex items-center gap-4'>
                        {(file.includes("pdf") ||
                          file.includes("csv") ||
                          file.includes("xlsx")) && (
                          <img
                            src={
                              file.includes("pdf")
                                ? pdfIcon
                                : file.includes("csv")
                                ? csvIcon
                                : xlsxIcon
                            }
                            alt='file'
                            className='w-[40px] h-auto cursor-pointer hover:bg-blue-200 rounded-full p-1'
                          />
                        )}

                        {file?.match(/(jpg|jpeg|png)$/) && (
                          <img
                            src={file}
                            alt='Image Preview'
                            // style={{ width: "200px", height: "auto", marginTop: "20px", border: "2px", borderColor: "blue" }}
                            className='w-[40px] h-auto cursor-pointer hover:bg-blue-200 rounded-md p-1'
                          />
                        )}
                        <div className='text-gray-500 text-xs'>
                          {/* <p className='text-black'>{file?.name}</p> */}
                          <p>
                            {/* {Math.round((file?.size / 1024) * 100) / 100} kb */}
                          </p>
                        </div>
                      </div>
                      <button
                        className='rounded-full p-3 hover:bg-blue-200'
                        onClick={() => deleteFileHandler(file?.name)}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                ))}

              {tabData
                ?.find((files) => files.value === tab)
                ?.documents?.map((file) => (
                  <div
                    className='mb-2 bg-[#EEF1F7] h-14 w-full rounded-md'
                    key={file.name}
                  >
                    <div className='flex justify-between items-center px-6 py-2 '>
                      <div className='flex items-center gap-4'>
                        {(file?.type === "application/pdf" ||
                          file?.type === "text/csv" ||
                          file?.type ===
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (
                          <img
                            src={
                              file.type === "application/pdf"
                                ? pdfIcon
                                : file.type === "text/csv"
                                ? csvIcon
                                : xlsxIcon
                            }
                            alt='file'
                            className='w-[40px] h-auto cursor-pointer hover:bg-blue-200 rounded-full p-1'
                          />
                        )}

                        {file?.type?.match(/(jpg|jpeg|png)$/) && (
                          <img
                            src={URL.createObjectURL(file)}
                            alt='Image Preview'
                            // style={{ width: "200px", height: "auto", marginTop: "20px", border: "2px", borderColor: "blue" }}
                            className='w-[40px] h-auto cursor-pointer hover:bg-blue-200 rounded-md p-1'
                          />
                        )}
                        <div className='text-gray-500 text-xs'>
                          <p className='text-black'>{file?.name}</p>
                          <p>
                            {Math.round((file?.size / 1024) * 100) / 100} kb
                          </p>
                        </div>
                      </div>
                      <button
                        className='rounded-full p-3 hover:bg-blue-200'
                        onClick={() => deleteFileHandler(file?.name)}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>

          <div className='w-full'>
            <div className=''>
              <h3 className='text-md text-gray-600 font-openSans mb-2'>
                Content
              </h3>
            </div>
            <div className=' w-full mb-6'>
              <textarea
                className='border border-[#5448dd] rounded  p-2 w-full'
                placeholder='Type Here...'
                defaultValue={contentDefVal}
                onChange={addContentHandler}
              />
              {errors.content && touched.content ? (
                <p className='text-red-500 text-xs'>{errors.content}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
