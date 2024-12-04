import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import RejectionModalRemark from "@/Components/Common/Modal/RejectionModalRemark";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import React, { useContext, useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import DeadStockUploadImg from "../../ReceivedInventory/StockReciever/DeadStockUploadImg";
import ApiHeader2 from "@/Components/api/ApiHeader2";
// import ServiceRequestModal from "./ServiceRequestModal";

const IAServiceRequestById = () => {
  const [isLoading, setisLoading] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [forwardModal, setForwardDA] = useState(false);
  const [retModal, setRetModal] = useState(false);
  const [deadStockModal, setDeadStockModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [warrantyClaimModal, setwarrantyClaimModal] = useState(false);
  const [imageDoc, setImageDoc] = useState();
  const [preview, setPreview] = useState();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isDeadStockModalOpen, setIsDeadStockModalOpen] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState([]);
  const [data, setData] = useState({ reference_no: "", remark: "" });
  const {
    api_postHandoverReq,
    api_getServiceRequestId,
    api_approveServiceRequestIA,
    api_rejectServiceRequestIA,
  } = ProjectApiList();

  const { refNo, page } = useParams();
  const nevigate = useNavigate();

  // console.log(refNo)

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  let buttonStyle =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const forwardDAModal = () => {
    setForwardDA(true);
  };

  //get application details
  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getServiceRequestId}/${refNo}`, ApiHeader())
      .then(async function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        console.log("==2 details by id error...", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handleCancel = () => {
    setDeadStockModal(false);
    setRetModal(false);
    setConfModal(false);
    setwarrantyClaimModal(false);
    setForwardDA(false);
  };

  // Forward to DA

  const confirmationHandler = () => {
    approveServiceRequest();
    // setForwardDA(false);
  };

  const approveServiceRequest = () => {
    if (applicationFullData?.service === "dead" && !imageDoc) {
      return toast.error("Document is required");
    }
    setisLoading(true);
    AxiosInterceptors.post(
      `${api_approveServiceRequestIA}`,
      { service_no: refNo, doc: imageDoc },
      ApiHeader2()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Service request Approved");
          nevigate(`/ia-service-request`);
          setisLoading(false);
        } else {
          console.log("error in forwarding to da...", error);
        }
      })
      .catch(function (err) {
        toast.error(err?.response?.data?.message || "Error in Approving");
      })
      .finally(() => {
        setisLoading(false);
        setForwardDA(false);
        setIsDeadStockModalOpen(false);
      });
  };
  const rejectServiceRequest = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      `${api_rejectServiceRequestIA}`,
      { service_no: refNo, remark: data.remark },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Service request Approved");
          nevigate(`/ia-service-request`);
        } else {
          console.log("error in forwarding to da...", error);
        }
      })
      .catch(function (err) {
        toast.error(err?.response?.data?.message || "Error in Approving");
      })
      .finally(() => {
        setisLoading(false);
        setForwardDA(false);
        setIsDeadStockModalOpen(false);
        setIsRejectModalOpen(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  if (isRejectModalOpen) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={rejectServiceRequest}
          handleCancel={() => setIsRejectModalOpen(false)}
          message={"Are you sure you want to reject this Service Request ? "}
          setData={setData}
          loadingState={isLoading}
        />
      </>
    );
  }

  if (forwardModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Approve this Service Request?"}
          loadingState={isLoading}
        />
      </>
    );
  }

  if (isDeadStockModalOpen) {
    return (
      <DeadStockUploadImg
        postAddtoInventory={confirmationHandler}
        imageDoc={imageDoc}
        setImageDoc={setImageDoc}
        setDeadStockImg={setIsDeadStockModalOpen}
        loader={isLoading}
        setPreview={setPreview}
      />
    );
  }
  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Inventory Proposal Details"}
      />

      {/* //timeline  */}
      {/* <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine />
      </div> */}

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
                View Inventory Request{" "}
              </h2>
            </div>
            <div className='flex justify-between'>
              <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
                <h1 className='font-bold'>
                  Service No <span className='text-black'>:</span>
                  <span className='font-light'>
                    {" "}
                    {nullToNA(applicationFullData?.service_no)}
                  </span>
                </h1>
                <h1 className='font-bold text-base text-blue-950'>
                  Service Type <span className='text-black'>:</span>
                  <span className='font-light text-green-600'>
                    {" "}
                    {nullToNA(
                      applicationFullData?.service === "dead"
                        ? "Dead Stock"
                        : applicationFullData?.service
                    )}
                  </span>
                </h1>
              </div>
              <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
                <h1 className='font-bold'>
                  Inventory Request No <span className='text-black'>:</span>
                  <span className='font-light'>
                    {" "}
                    {nullToNA(applicationFullData?.stock_handover_no)}
                  </span>
                </h1>
                {applicationFullData?.status == "23" && (
                  <h1 className='font-bold text-base text-blue-950'>
                    Status <span className='text-black'>:</span>
                    <span className='font-light text-green-600'>
                      {" "}
                      {nullToNA(
                        applicationFullData?.status == "23" && "Approved"
                      )}
                    </span>
                  </h1>
                )}
              </div>
            </div>

            <div className='grid md:grid-cols-4 gap-4 ml-8'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Category</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.inventory?.category?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Brand</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.brand?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  Sub Categories
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.inventory?.subcategory?.name)}
                </div>
              </div>

              {applicationFullData?.service_req_product?.map((data) => (
                <>
                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>
                      Service Request Product
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(data?.serial_no)}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(data?.quantity)}
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className='p-5 pl-8'>
              <h1 className='font-bold '>Description</h1>
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

            <div className='space-x-3 flex items-end justify-center'>
              {page == "inbox" && (
                <>
                  {applicationFullData?.status === 20 && (
                    <button
                      className=' mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                      onClick={
                        applicationFullData?.service === "dead"
                          ? () => setIsDeadStockModalOpen(true)
                          : forwardDAModal
                      }
                    >
                      Approve
                    </button>
                  )}
                  {/* {applicationFullData?.status === 20 && (
                    <button
                      className='mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                      onClick={() => setIsRejectModalOpen(true)}
                    >
                      Reject
                    </button>
                  )} */}

                  {/* {applicationFullData?.status >= 3 && (
                <>
                  <div className="bg-[#359F6E] h-full rounded-md text-md flex items-center justify-center hover:bg-green-700">
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

                  <button className={buttonStyle2} onClick={()=>{
                    
                    setServiceRequestModal(true)
                    setService("dead")
                    }}>
                    Dead Stock
                  </button>

                  <button className={buttonStyle2}onClick={()=>{
                    
                    setServiceRequestModal(true)
                    setService("return")
                    }}>
                    Return
                  </button>

                  <button className={buttonStyle2} onClick={handoverModal}>
                    Handover
                  </button>
                  <button className={buttonStyle2} onClick={()=>{
                    
                    setServiceRequestModal(true)
                    setService("warranty")
                    }}>
                    Warranty claims
                  </button>
                </>
              )} */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IAServiceRequestById;
