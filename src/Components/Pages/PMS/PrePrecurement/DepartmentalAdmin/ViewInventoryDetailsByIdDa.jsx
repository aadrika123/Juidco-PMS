//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewInventoryDetailsById
//    DESCRIPTION - ViewInventoryDetailsById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import StockReceiverModal from "./StockReceiverModal";
import ReleaseTenderModal from "./ReleaseTenderModal";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { useReactToPrint } from "react-to-print";
import StockRequestTimeline from "@/Components/Common/Timeline/StockRequestTimeline";
import RejectionModalRemark from "@/Components/Common/Modal/RejectionModalRemark";

const ViewInventoryDetailsById = (props) => {
  const navigate = useNavigate();
  const notesheetRef = useRef();

  const { id, page } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const [remark, setRemark] = useState({ remark: "" });
  const [imageDoc, setImageDoc] = useState();
  const [preview, setPreview] = useState();

  const {
    api_getStockRequetById,
    api_postBackToDd,
    api_postForwardtoAcc,
    api_postRejectStockReq,
    api_forwardStockReqToI,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let buttonStyle =
    " mr-1 pb-3 pl-6 pr-6 pt-3 border border-indigo-500 text-indigo-800 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  useEffect(() => {
    getApplicationDetail();
  }, []);

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    setisLoading(true);

    let url;

    if (page == "inbox") {
      url = api_getStockRequetById;
    }
    if (page == "outbox") {
      url = api_getStockRequetById;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
        } else {
          // toast.error("Error while getting details...");
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const postRejectTenderModal = () => {
    setIsModalOpen3(true);
  };

  const rejectStockReqHandler = () => {
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_postRejectStockReq}`,
      { stock_handover_no: [id], remark: remark.remark },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(response?.data?.message);
          navigate("/da-inventory-proposal");
        } else {
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setisLoading(false);
        setIsModalOpen3(false);
      });
  };

  const backToDdHandler = () => {
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_postBackToDd}`,
      { stock_handover_no: [id], remark: remark.remark },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(response?.data?.message);
          navigate("/da-inventory-proposal");
        } else {
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const postReleaseTender = () => {
    setisLoading(true);
    // let preProcurement = [id];
    let formData = new FormData();
    formData.append("img", imageDoc);
    formData.append("preProcurement", JSON.stringify([id]));

    AxiosInterceptors.post(`${api_postForwardtoAcc}`, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 1000);
        } else {
          toast.error(response?.data?.mmessage || "something went wrong");
          navigate("/da-inventory-proposal");
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const forwardToIa = () => {
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_forwardStockReqToI}`,
      { stock_handover_no: [id] },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully forwarded to Inventory Admin");
          navigate("/da-inventory-proposal");
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
        setIsModalOpen(false);
      });
  };

  if (isModalOpen3) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={rejectStockReqHandler}
          handleCancel={() => setIsModalOpen3(true)}
          loadingState={isLoading}
          message={"Are you sure you want to Reject this Stock Request ?"}
          setData={setRemark}
        />
      </>
    );
  }
  if (isModalOpen) {
    return (
      <>
        <StockReceiverModal
          // postBackToSR={postBackToSR}
          forwardToIa={forwardToIa}
          setIsModalOpen={setIsModalOpen}
          loader={isLoading}
        />
      </>
    );
  }

  if (isModalOpen2) {
    return (
      <>
        <ReleaseTenderModal
          postReleaseTender={postReleaseTender}
          setIsModalOpen2={setIsModalOpen2}
        />
      </>
    );
  }

  if (returnModal) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={backToDdHandler}
          handleCancel={() => setReturnModal(true)}
          loadingState={isLoading}
          message={
            "Are you sure you want to return this Stock Request to Departmental Distributor ?"
          }
          setData={setRemark}
        />
      </>
    );
  }

  // console.log(applicationFullData)

  return (
    <div>
      {isLoading && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <LoaderApi />
        </div>
      )}

      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Stock Request Proposal Details"}
        />
      </div>

      <>
        <div className='flex gap-10 m-4 bg-white p-4'></div>
      </>

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""} mt-10`}>
        <StockRequestTimeline status={applicationFullData?.status} />
      </div>

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        {/* Basic Details */}
        <div className='mt-6'>
          <div
            className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'
            ref={componentRef}
          >
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                View Stock Handover Request{" "}
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
              <div
                key={index}
                className='grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-4 rounded'
              >
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

                {/* <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Quantity</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(data?.quantity)}
                </div>
              </div> */}
              </div>
            ))}

            <div className='p-5 pl-8'>
              <h1 className='font-bold '>Description</h1>
              <p className=' pt-2'>
                {nullToNA(applicationFullData?.inventory?.description)}
              </p>
            </div>

            <div className='flex justify-end mb-4'>
              <ImageDisplay
                preview={preview}
                imageDoc={imageDoc}
                alt={"Notesheet doc"}
                showPreview={"hidden"}
                width={"[100px]"}
              />
            </div>

            {/* <div className='h-[30px]'></div> */}
          </div>
        </div>

        <div className='space-x-5 flex justify-end mt-[2rem]'>
          <button onClick={handlePrint} className={buttonStyle}>
            Print
          </button>

          {page == "outbox" && (
            <button className={buttonStyle} onClick={() => navigate(-1)}>
              Back
            </button>
          )}

          {page == "inbox" &&
            (applicationFullData?.status === 2 ||
              applicationFullData?.status === 1 ||
              applicationFullData?.status === 81) && (
              <button
                className=' px-6 py-2 border border-indigo-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]'
                onClick={() =>
                  navigate(`/dd-stock-proposal/edit`, {
                    state: applicationFullData?.stock_handover_no,
                  })
                }
              >
                Edit
              </button>
            )}

          {page == "inbox" &&
            (applicationFullData?.status === 2 ||
              applicationFullData?.status === 1 ||
              applicationFullData?.status === 81) && (
              <button
                className={`bg-[#E61818] text-white text-md w-fit rounded-md p-2 px-5 hover:bg-red-500`}
                onClick={postRejectTenderModal}
              >
                Reject
              </button>
            )}

          {page == "inbox" &&
            (applicationFullData?.status === 2 ||
              applicationFullData?.status === 1 ||
              applicationFullData?.status === 81) && (
              <button
                className={`bg-[#4338ca] hover:bg-blue-900 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                onClick={() => setReturnModal(true)}
              >
                Back to Departmental Distributor
              </button>
            )}

          {page == "inbox" && (
            <>
              {page == "inbox" && applicationFullData?.status?.status < 70 && (
                <>
                  <div className='bg-[#0F921C] h-full py-2 rounded-md text-md flex items-center justify-center hover:bg-green-800'>
                    <FileButton
                      bg={"[#0F921C]"}
                      hoverBg={"bg-green-800"}
                      btnLabel={"Upload Notesheet"}
                      imgRef={notesheetRef}
                      setImageDoc={setImageDoc}
                      setPreview={setPreview}
                      textColor={"white"}
                      // paddingY={"8"}
                    />
                  </div>
                </>
              )}

              {page === "inbox" &&
                (applicationFullData?.status === 2 ||
                  applicationFullData?.status === 1 ||
                  applicationFullData?.status === 81) && (
                  <button
                    className={`bg-[#4338ca] hover:bg-blue-900 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Forward to Inventory Admin
                  </button>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInventoryDetailsById;
