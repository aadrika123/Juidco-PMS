import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import SuccessModal from "@/Components/Common/Modal/SuccessModal";
import { nullToNA } from "@/Components/Common/PowerupFunctions";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-hot-toast";

const DDViewDetailbyId = () => {
  const [isLoading, setisLoading] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [imageDoc, setImageDoc] = useState(false);
  const [preview, setPreview] = useState();
  const [applicationFullData, setapplicationFullData] = useState();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { handNo, page } = useParams();
  // console.log(page)

  const notesheetRef = useRef();
  const { api_getStockRequetById, api_postStockReqForwardtoDA } =
    ProjectApiList();

  let buttonStyle =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const forwardDAModal = () => {
    setConfModal(true);
  };

  const confirmationHandler = () => {
    forwardToDA();
  };
  const successHandler = () => {
    setSuccessModal(false);
    navigate(`/dd-inventory-proposal`);
  };

  const handleCancel = () => {
    setConfModal(false);
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////

  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getStockRequetById}/${handNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setisLoading(false);
        } else {
          setisLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        console.log("details by id error...", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const forwardToDA = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      `${api_postStockReqForwardtoDA}`,
      { stock_handover_no: [`${handNo}`] },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setSuccessModal(true);
          setisLoading(false);
        } else {
          toast.error("Error in forwarding.");
          console.log("error in forwarding to da...", error);
        }
      })
      .catch(function (err) {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setConfModal(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Forward to Departmental Admin?"}
          loadingState={isLoading}
        />
      </>
    );
  }

  if (successModal) {
    return (
      <>
        <SuccessModal
          confirmationHandler={successHandler}
          message={"Your Request has been Submitted Successfully"}
          requestNoMsg={"Handover No:-"}
          refNo={handNo}
        />
      </>
    );
  }
  return (
    <>
      {isLoading && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <LoaderApi />
        </div>
      )}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Stock Request Details"}
      />

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        {/* <TimeLine /> */}
        {/* <StockRequestTimeline status={applicationFullData?.status} /> */}
      </div>

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <div className='flex justify-end'></div>
        {/* Basic Details */}
        <div className='mt-6'>
          <div
            className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'
            ref={componentRef}
          >
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                View Stock Request{" "}
              </h2>
            </div>

            <div className='flex justify-between'>
              <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
                <h1 className='font-bold'>
                  Stock Handover No <span className='text-black'>:</span>
                  <span className='font-light'>
                    {" "}
                    {nullToNA(applicationFullData?.stock_handover_no)}
                  </span>
                </h1>
              </div>

              {applicationFullData?.remark && (
                <div className='pr-4 pb-5 text-[1.2rem] text-[#4338CA]'>
                  <h1 className='font-bold'>
                    Remark <span className='text-black'>:</span>
                    <span span className='text-md pt-2 font-light text-red-600'>
                      {" "}
                      {applicationFullData?.remark}
                    </span>
                  </h1>
                </div>
              )}
            </div>

            <div className='grid md:grid-cols-4 gap-4 ml-8 pb-5'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold'>Employee Id</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.emp_id)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Employee Name
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.emp_name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Quantity Allotted{" "}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.allotted_quantity)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Date</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.createdAt?.split("T")[0])}
                </div>
              </div>
            </div>

            {applicationFullData?.stock_req_product?.length > 0 ? (
              <h1 className='pl-8 font-semibold underline text-blue-950'>
                Products:
              </h1>
            ) : (
              <>
                <div className='grid md:grid-cols-4 gap-4 ml-8'>
                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>Category</div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(applicationFullData?.inventory?.category?.name)}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-semibold '>
                      Sub Categories
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(
                        applicationFullData?.inventory?.subcategory?.name
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {applicationFullData?.stock_req_product?.map((data, index) => (
              <div className='grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-4 rounded'>
                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Serial No</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(data?.serial_no)}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Category</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.inventory?.category?.name)}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    Sub Categories
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(
                      applicationFullData?.inventory?.subcategory?.name
                    )}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(data?.quantity)}
                  </div>
                </div>
              </div>
            ))}

            <div className='p-5 pl-8'>
              <h1 className='font-bold'>Description</h1>
              <p className=' pt-2'>
                {nullToNA(applicationFullData?.inventory?.description)}
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

          <div className='space-x-5 flex justify-between mt-[2rem]'>
            <div className='space-x-3 flex items-end justify-center'>
              <button className={buttonStyle} onClick={() => navigate(-1)}>
                Back
              </button>

              <button
                onClick={handlePrint}
                className='mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
              >
                Print
              </button>
            </div>

            {(applicationFullData?.status == 0 ||
              applicationFullData?.status == -1) &&
              page == "inbox" && (
                <div className='space-x-3 flex items-end justify-center'>
                  <button
                    className=' px-4 py-2 border border-indigo-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]'
                    onClick={() =>
                      navigate(`/dd-stock-proposal/edit`, {
                        state: applicationFullData?.stock_handover_no,
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className=' p-2 border border-indigo-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]'
                    onClick={forwardDAModal}
                  >
                    Forward to Departmental Admin
                  </button>

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
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DDViewDetailbyId;
