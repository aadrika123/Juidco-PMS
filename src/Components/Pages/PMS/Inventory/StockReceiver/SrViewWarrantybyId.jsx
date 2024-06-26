import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import SuccessModal from "@/Components/Common/Modal/SuccessModal";
import { nullToNA } from "@/Components/Common/PowerupFunctions";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const SrViewWarrantybyId = () => {
  const [isLoading, setisLoading] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [confModal2, setConfModal2] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [imageDoc, setImageDoc] = useState(false);
  const [preview, setPreview] = useState();

  const { titleBarVisibility } = useContext(contextVar);

  const notesheetRef = useRef();
  const navigate = useNavigate();

  let buttonStyle =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyl2 =
    "pl-5 pr-5 p-2 border border-indigo-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]";

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const deadStockModal = () => {
    setConfModal(true);
  };

  const confirmationHandler = () => {
    setConfModal(false);
  };

  const handleCancel = () => {
    setConfModal(false);
  };

  const claimWarrantyModal = () => {
    setConfModal2(true);
  };

  const confirmationHandler2 = () => {
    setConfModal2(false);
  };

  const handleApprove = () => {
    setConfModal2(false);
  };

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={'Are you sure you want to "Add in Dead Stock" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }
  if (confModal2) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler2}
          handleCancel={handleApprove}
          message={'Are you sure you want to "Approve Warranty" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Warranty Details"}
      />

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine />
      </div>

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <div className="flex justify-end"></div>
        {/* Basic Details */}
        <div className="mt-6">
          <div
            className="py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500"
            ref={componentRef}
          >
            <div className="">
              <h2 className="font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
                View Inventory Request{" "}
              </h2>
            </div>
            <div className="flex justify-between">
              {/* {!applicationFullData?.remark?.length == 0 && ( */}
              {/* <div className='pb-5 pl-8'>
                  <h1 className='font-bold text-base text-green-600'>
                    Remark <span className='text-black'>:</span>
                    <span className='text-sm pt-2 font-light text-green-600'>
                      {" "}
                      {nullToNA(applicationFullData?.remark)}
                    </span>
                  </h1>
                </div> */}
              {/* )} */}

              <div className="pl-8 pb-5 text-[1.2rem] text-[#4338CA]">
                <h1 className="font-bold">
                  Inventory Request No <span className="text-black">:</span>
                  <span className="font-light">
                    {" "}
                    {/* {nullToNA(applicationFullData?.procurement_no)} */}
                  </span>
                </h1>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 ml-8">
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold">Employee Id</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  123
                  {/* {nullToNA(applicationFullData?.category.name)} */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Employee Name
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  ABC
                  {/* {nullToNA(applicationFullData?.subcategory?.name)} */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Brand</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  bac
                  {/* {nullToNA(applicationFullData?.brand?.name)} */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  Sub Categories
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  ABC
                  {/* {nullToNA(applicationFullData?.rate)} */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Quantity Allotted{" "}
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  1236
                  {/* {nullToNA(applicationFullData?.total_rate)} */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Date</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  1236
                  {/* {nullToNA(applicationFullData?.total_rate)} */}
                </div>
              </div>
            </div>
            <div className="p-5 pl-8">
              <h1 className="font-bold ">Description</h1>
              <p className=" pt-2">
                dexc
                {/* {nullToNA(applicationFullData?.description)} */}
              </p>
            </div>
            <div className='flex justify-end w-full mb-5'>
              <div className='w-[100px]'>
                <ImageDisplay
                  preview={preview}
                  imageDoc={imageDoc}
                  alt={"notesheet document"}
                  showPreview={"hidden"}
                  width={"[100px]"}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="space-x-5 flex justify-between mt-[2rem]">
            <div className="space-x-3 flex items-end justify-center">
              <button className={buttonStyle} onClick={() => navigate(-1)}>
                Back
              </button>

              <button
                onClick={handlePrint}
                className="mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl"
              >
                Print
              </button>
            </div>

            <div className="space-x-3 flex items-end justify-center">
              
            <div className='bg-[#359F6E] h-full rounded-md text-md flex items-center justify-center hover:bg-green-700'>
                    <FileButton
                      bg={"[#359F6E]"}
                      hoverBg={"bg-green-700"}
                      btnLabel={"Upload References"}
                      imgRef={notesheetRef}
                      setImageDoc={setImageDoc}
                      setPreview={setPreview}
                      textColor={"white"}
                    />
                  </div>
              <button className={buttonStyl2} onClick={deadStockModal}>
                Add In Dead Stock
              </button>

              <button className={buttonStyl2} onClick={claimWarrantyModal}>
                Approve Claim Warranty
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SrViewWarrantybyId;
