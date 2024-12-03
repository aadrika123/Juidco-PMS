import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import SuccessModal from "@/Components/Common/Modal/SuccessModal";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import BiddingViewModal from "./BiddingViewModal";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { indianAmount, nullToNA } from "@/Components/Common/PowerupFunctions";
import { MdArrowRightAlt } from "react-icons/md";
import toast from "react-hot-toast";

const BiddingViewById = () => {
  const [isLoading, setisLoading] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [imageDoc, setImageDoc] = useState(false);
  const [preview, setPreview] = useState();
  const [applicationFullData, setapplicationFullData] = useState();
  const [applicationFullboqData, setapplicationFullBoqData] = useState();
  const [applicationFullboq, setapplicationFullBoq] = useState();
  const [applicationBoqCategoryData, setapplicationBoqCategoryData] =
    useState();
  const [applicationBoqSubCategoryData, setapplicationBoqSubCategoryData] =
    useState();
  const [biddingData, setBiddingData] = useState();
  const [previewData, setPreviewData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [proceedModal, setProceedModal] = useState(false);
  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { id, page } = useParams();

  // console.log(applicationFullData[0]?.boqData,"applicationFullData---------->")

  const {
    api_postForwardtoSR,
    api_fetchProcurementDetById,
    api_getBidType,
    api_getDAPreviewDetails,
    api_postPreTenderCoverDetails,
    api_postBidType,
  } = ProjectApiList();

  let buttonStyle =
    "mr-1 pb-2 pl-10 pr-10 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const confirmationHandler = () => {
    forwardToSR();
    setConfModal(false);
    setSuccessModal(true);
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
    AxiosInterceptors.get(`${api_fetchProcurementDetById}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          // console.log(response?.data?.data[0]?.boqData,"{{{{");
          setapplicationFullBoqData(response?.data?.data[0]?.boqData);
          
          setapplicationBoqCategoryData(
            response?.data?.data[0]?.categoryDescriptions[0]
          );
          setapplicationBoqSubCategoryData(
            response?.data?.data[0]?.subCategoryDescriptions
          );
          setapplicationFullBoq(response?.data?.data[0]?.boq);
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

  const getTenderDetails = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getDAPreviewDetails}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          // console.log(response?.data?.data);
          setPreviewData(response?.data?.data);
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const getBiddingDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getBidType}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setBiddingData(response?.data?.data);
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

  const forwardToSR = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      `${api_postForwardtoSR}`,
      { stock_handover_no: [`${handNo}`] },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setisLoading(false);
        } else {
          toast.error("Error while fetching data");
          console.log("==2 details by id error...", error);
        }
      })
      .catch(function (err) {
        toast.error("Erro");
      });
  };

  const btnLabel = (status) => {
    switch (status) {
      case 0 || null || undefined:
        return "Proceed";
      case 1:
        return "Proceed for Criteria Addition";
      case 2:
        return "Proceed to Add Bidders";
      case 3:
        return "Continue Bidding Comparison";
      case 41:
        return "Continue Financial Comparison";
      case 42:
        return "Finalize Comparison";
      case 4:
        return "View Finalize Winner";
      case 5:
        return "View Finalize Winner";
      default:
        return "Completed";
    }
  };

  const btnNavigate = (status) => {
    switch (status) {
      case 0 || null || undefined:
        setProceedModal(true);

        break;
      case 1:
        navigate(`/bidding-commparision-tabs?tabNo=1`, {
          state: biddingData?.reference_no,
        });
        break;
      case 2:
        navigate(`/bidding-details?tabNo=1`, {
          state: biddingData?.reference_no,
        });
        break;
      case 3:
        navigate(`/bidding-type`, {
          state: biddingData?.reference_no,
        });
        break;
      case 41:
        navigate(`/bidding-commparision-tabs?tabNo=1`, {
          state: biddingData?.reference_no,
        });
        break;
      case 42:
        navigate(`/bidding-type-byId/${biddingData?.reference_no}`);
        break;
      case 4:
        navigate(`/bidding-type-result/${biddingData?.reference_no}`);
        break;
      case 5:
        navigate(`/bidding-type-result/${biddingData?.reference_no}`);
        break;
      default:
        break;
    }
  };

  //triggers when modal is submitted for proceed
  const biddingNextStepsHandler = () => {
    setisLoading(true);
    AxiosInterceptors.post(
      `${api_postPreTenderCoverDetails}`,
      {
        reference_no: id,
        no_of_covers: previewData?.cover_details?.noOfCovers,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          submitHandler();
          navigate("/bidding-commparision-tabs?tabNo=1", {
            state: id,
          });
        } else {
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

  const tenderType =
    previewData?.cover_details?.noOfCovers == "1" &&
    applicationFullData?.tendering_type === "least_cost"
      ? "technical"
      : previewData?.cover_details?.noOfCovers == "2" &&
        applicationFullData?.tendering_type === "least_cost"
      ? "fintech"
      : previewData?.cover_details?.noOfCovers == "2" &&
        applicationFullData?.tendering_type === "qcbs"
      ? "abc"
      : "technical";
  ///
  const submitHandler = () => {
    // setIsLoading(true);
    AxiosInterceptors.post(
      `${api_postBidType}`,
      {
        reference_no: id,
        bid_type: tenderType,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Bid Type saved Succefull");
          navigate(`/bidding-commparision-tabs?tabNo=1`, { state: id });
        } else {
          toast.error("Error in approving. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };
  ///

  useEffect(() => {
    getApplicationDetail();
    getBiddingDetail();
    getTenderDetails();
  }, []);

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Forward ?"}
          loadingState={isLoading}
        />
      </>
    );
  }

  if (proceedModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={biddingNextStepsHandler}
          handleCancel={() => setProceedModal(false)}
          message={"Yow will be redirected to the next process of bidding ?"}
          loadingState={isLoading}
        />
      </>
    );
  }

  // ...................................
  // const handleConfirmClick = () => {
  //   if (window.confirm("Are you sure you want to proceed?")) {
  //     setShowModal(true);
  //   }
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  if (successModal) {
    return (
      <>
        <SuccessModal
          confirmationHandler={successHandler}
          message={"Your Request has been Submitted Successfully"}
          requestNoMsg={"Handover No:-"}
          refNo={handNo}
          loadingState={isLoading}
        />
      </>
    );
  }

  // console.log(applicationFullData?.tendering_type)

  if (showModal) {
    return (
      <>
        <BiddingViewModal
          closeModal={closeModal}
          refNo={id}
          tenderingType={applicationFullData?.tendering_type}
          loadingState={isLoading}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Basic Pre Tendering Details"}
      />

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        {/* ----------------------------------------- */}

        <div className="mt-6">
          <div
            className="py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500"
            // ref={componentRef}
          >
            <div className="">
              <h2 className="font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
                View Pre Procurement Details{" "}
              </h2>
            </div>

            <div className="flex justify-between">
              <div className="pl-8 text-[1rem] text-[#4338CA] flex justify-between w-full">
                <h1 className="">
                  Procurement No <span className="text-black">:</span>
                  <span className="font-bold">
                    {" "}
                    {nullToNA(applicationFullData?.procurement_no)}
                  </span>
                </h1>
                <h1 className="text-black">
                  Procurement Total <span className="text-black">:</span>
                  <span className="font-bold">
                    {" "}
                    
                    {indianAmount(nullToNA(applicationFullboq?.estimated_cost))}
                  </span>
                </h1>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="pl-8 text-[1rem] text-black flex justify-between w-full">
                <h1 className="">
                  Category <span className="text-black">:</span>
                  <span className="font-bold">
                    {" "}
                    {nullToNA(applicationBoqCategoryData)}
                  </span>
                </h1>
              </div>
              {applicationFullData?.is_rate_contract && (
                <div className="text-[1rem] text-black flex justify-end w-full">
                  <h1 className="text-green-600">
                    <span className="font-bold">
                      {" "}
                      {applicationFullData?.is_rate_contract &&
                        "Applied through Rate Contract"}
                    </span>
                  </h1>
                </div>
              )}
              {applicationFullData?.remark && (
                <div className="text-[1rem] text-black flex justify-end w-full">
                  <h1 className="text-red-400">
                    Remark <span className="text-black">:</span>
                    <span className="font-bold">
                      {" "}
                      {nullToNA(applicationFullData?.remark)}
                    </span>
                  </h1>
                </div>
              )}
            </div>

            {applicationFullboqData?.map((procData, index) => (
              <>
                <div>
                  <p className="text-xs pl-5">Procurement Item: {index + 1}</p>
                </div>
                <div className="grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-5 rounded shadow">
                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Subcategory
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(applicationBoqSubCategoryData?.[index])}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Unit</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.unit?.name)}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Brand</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.brand?.name)}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Quantity</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.quantity)}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Per Unit Rate
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {indianAmount(nullToNA(procData?.rate))}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Total Rate
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {indianAmount(
                        nullToNA(procData?.quantity * procData?.rate)
                      )}
                    </div>
                  </div>

                  <div className="md:flex-1 md:col-span-4 md:block flex md:flex-row-reverse justify-between mt-5">
                    <div className="md:w-auto w-[100%] font-bold ">
                      Description
                    </div>
                    <div className="md:w-auto w-[100%] text-gray-800 text-md">
                      {nullToNA(procData?.description)}
                    </div>
                  </div>
                </div>
              </>
            ))}

            <div className="flex justify-end mb-4">
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

        {/* ----------------------------------------- */}
        {/* Tendring Basic Details */}
        <div className=" mt-5">
          <div className="">
            <h2 className=" text-xl pl-7 pt-3 pb-3 flex justify-start bg-[#4338ca] text-white rounded-md">
              Basic Pre-Tendering Info
            </h2>
          </div>
          <div
            className="py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500"
            ref={componentRef}
          >
            <div className="flex justify-between"></div>
            <div className="grid md:grid-rows-4-4 gap-6 ml-8">
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold">
                  EMD Excemption
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 ">
                  {applicationFullData?.emd == true ? "Yes" : "No"}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-col-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Tender Estimated Amount
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 ">
                  {indianAmount(applicationFullData?.estimated_amount)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">EMD Amount </div>
                <div className="md:w-auto w-[50%] text-gray-800 ">
                  {applicationFullData?.emd_type === "percentage"
                    ? `${applicationFullData?.emd_value}%  (${indianAmount(
                        (applicationFullData?.emd_value *
                          Number(applicationFullData?.estimated_amount)) /
                          100
                      )})`
                    : ` ${indianAmount(applicationFullData?.emd_value)} 
                  (${
                    applicationFullData?.emd_type === "fixed" ? " (Fixed)" : ""
                  })`}
                </div>
              </div>
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  PBG Amount{" "}
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 ">
                  <span className="text-sm text-gray-500">
                    {applicationFullData?.pbg_type == "percentage"
                      ? applicationFullData?.pbg_value
                      : indianAmount(applicationFullData?.pbg_value)}
                  </span>
                  {applicationFullData?.pbg_type == "percentage"
                    ? "%"
                    : " (Fixed)"}{" "}
                </div>
              </div>
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  Tendering Type{" "}
                </div>
                <div className="md:w-auto w-[50%] text-gray-800">
                  {applicationFullData?.tendering_type === "qcbs"
                    ? "Quality And Cost Based Selection"
                    : applicationFullData?.tendering_type === "least_cost"
                    ? "Least Cost"
                    : applicationFullData?.boq?.pre_tendering_details
                        ?.is_rate_contract
                    ? "Rate Contract"
                    : ""}
                </div>
              </div>
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  Cover Details{" "}
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 ">
                  {previewData?.cover_details?.noOfCovers
                    ? `${previewData?.cover_details?.noOfCovers} Cover`
                    : "No Cover Selected yet"}
                </div>
              </div>
              {applicationFullData?.is_rate_contract && (
                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-semibold ">
                    Rate Contract{" "}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-800 ">
                    {applicationFullData?.is_rate_contract &&
                      "Is Rate Contract"}
                  </div>
                </div>
              )}

              {applicationFullData?.is_rate_contract && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Tenure </div>
                    <div className="md:w-auto w-[50%] text-gray-800 ">
                      {applicationFullData?.tenure || 0} Years
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold">
                      Minimum Supplier{" "}
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 ">
                      {applicationFullData?.min_supplier || 0}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold">
                      Maximum Supplier{" "}
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800">
                      {applicationFullData?.max_supplier || 0}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end w-full mb-5">
              <div className="w-[100px]">
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

          {/* Bidding Comparision Details */}
          {biddingData?.techCriteria?.length > 0 ||
            (biddingData?.finCriteria?.length > 0 && (
              <>
                <div className="">
                  <h2 className=" text-xl pl-7 pt-3 pb-3 flex justify-start bg-[#4338ca] text-white rounded-md mt-10">
                    Criteria type Info
                  </h2>
                </div>
                <div
                  className="py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 flex w-full justify-between"
                  ref={componentRef}
                >
                  {biddingData?.techCriteria?.length > 0 && (
                    <div className="mt-5 w-[45%] ">
                      <>
                        <div className="bg-slate-100 w-full">
                          <h1 className="font-bold p-3 text-center bg-slate-300 rounded">
                            Technical Criteria
                          </h1>

                          {biddingData?.techCriteria.map((data, index) => (
                            <>
                              <div
                                className="grid md:grid-rows-4-4 gap-6 ml-8 mb-5 mt-3"
                                key={index}
                              >
                                <div className="md:flex-1 md:block flex md:flex-col-reverse justify-between">
                                  <div className="md:w-auto w-[50%] text-gray-800 ">
                                    Creteria Type:{" "}
                                    <span className="font-bold">
                                      {data?.criteria_type}
                                    </span>
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-800 ">
                                    Heading:{" "}
                                    <span className="font-bold">
                                      {data?.heading}
                                    </span>
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-800 ">
                                    Description:{" "}
                                    <span className="font-bold">
                                      {data?.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    </div>
                  )}

                  {biddingData?.finCriteria?.length > 0 && (
                    <div className="w-[45%]">
                      <>
                        <div className="bg-slate-100 w-full">
                          <h1 className="font-bold p-3 text-center bg-slate-300 rounded ">
                            Financial Criteria
                          </h1>

                          {biddingData?.finCriteria.map((data) => (
                            <>
                              <div className="grid md:grid-rows-4-4 gap-6 ml-8 mb-5 mt-3">
                                <div className="md:flex-1 md:block flex md:flex-col-reverse justify-between">
                                  <div className="md:w-auto w-[50%] text-gray-800 ">
                                    Creteria Type:{" "}
                                    <span className="font-bold">
                                      {data?.criteria_type}
                                    </span>
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-800 ">
                                    Heading:{" "}
                                    <span className="font-bold">
                                      {data?.heading}
                                    </span>
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-800 ">
                                    Description:{" "}
                                    <span className="font-bold">
                                      {data?.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    </div>
                  )}
                </div>
              </>
            ))}

          {/* Bidding Master Details */}
          {biddingData?.bidder_master?.length > 0 && (
            <>
              <div className="">
                <h2 className=" text-xl pl-7 pt-3 pb-3 flex justify-start bg-[#4338ca] text-white rounded-md mt-10">
                  Bidding Master Info{" "}
                </h2>
              </div>
              <div
                className="py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 "
                ref={componentRef}
              >
                <div className="mt-5">
                  {biddingData?.bidder_master?.length > 0 && (
                    <>
                      {/* <h1 className="font-bold ">Technical Criteria</h1> */}

                      {biddingData?.bidder_master?.map((data, index) => (
                        <>
                          <div className="grid md:grid-rows-4-4 gap-6 mb-5 bg-slate-100 rounded-xl">
                            <h1 className="p-3 bg-slate-300 rounded ">
                              Bidder {index + 1}{" "}
                              {biddingData?.bidder_master?.length === 1 && (
                                <span className="text-gray-600 font-semibold">
                                  (Selected Winner)
                                </span>
                              )}
                            </h1>
                            {data?.bidding_amount && (
                              <div className="w-full flex justify-end items-end px-3 py-2">
                                <p>Bidding Amount - </p>
                                <p className="text-lg font-semibold">
                                  {""}
                                  {indianAmount(data?.bidding_amount)}
                                </p>
                              </div>
                            )}

                            <div className="flex justify-between mb-2 px-4 pb-0">
                              <div className="">
                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">
                                    Bidder Name :{" "}
                                  </span>
                                  <span className="font-bold ">
                                    {data?.name}
                                  </span>
                                </div>

                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">Pan No: </span>
                                  <span className="font-bold">
                                    {data?.pan_no}
                                  </span>
                                </div>

                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">Address: </span>
                                  <span className="font-bold">
                                    {data?.address}
                                  </span>
                                </div>

                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">Bank Name: </span>
                                  <span className="font-bold">
                                    {data?.bank}
                                  </span>
                                </div>

                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">Bank Acc No: </span>
                                  <span className="font-bold">
                                    {data?.account_no}
                                  </span>
                                </div>

                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">IFSC Code: </span>
                                  <span className="font-bold">
                                    {data?.ifsc}
                                  </span>
                                </div>
                              </div>

                              <div className="">
                                <span className="text-sm"></span>{" "}
                                <div className=" text-gray-800 pb-1 ">
                                  <span className="text-sm">Gst No: </span>
                                  <span className="font-bold">
                                    {data?.gst_no}
                                  </span>
                                </div>
                                <div className="md:w-auto w-[50%] text-gray-800 pb-1 ">
                                  <span className="text-sm">EMD : </span>
                                  <span className="font-bold">
                                    {data?.emd == true ? "Yes" : "No"}
                                  </span>
                                </div>
                                <div className="md:w-auto w-[50%] text-gray-800 pb-1 ">
                                  <span className="text-sm">
                                    Payment Mode :{" "}
                                  </span>
                                  <span className="font-bold">
                                    {(data?.payment_mode).toUpperCase()}
                                  </span>
                                </div>
                                <div className="md:w-auto w-[50%] text-gray-800 pb-1 ">
                                  <span className="text-sm">
                                    Offline Mode :{" "}
                                  </span>
                                  <span className="font-bold">
                                    {data?.offline_mode.toUpperCase()}
                                  </span>
                                </div>
                                {data?.offline_mode == "dd" && (
                                  <div className="md:w-auto w-[50%] text-gray-800 pb-1 ">
                                    <span className="text-sm">DD no : </span>
                                    <span className="font-bold">
                                      {data?.dd_no || ""}
                                    </span>
                                  </div>
                                )}
                                {data?.transaction_no && (
                                  <div className="md:w-auto w-[50%] text-gray-800 pb-1 ">
                                    <span className="text-sm">
                                      {" "}
                                      Transaction no :{" "}
                                    </span>
                                    <span className="font-bold">
                                      {data?.transaction_no}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="">
                                <h1 className="font-bold pb-5">
                                  Bidder Documents
                                </h1>
                                <div className="flex justify-between space-x-5">
                                  <div className="w-[100px]">
                                    <ImageDisplay
                                      url={data?.emd_doc}
                                      className="w-20 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                                      alt={"uploaded doc"}
                                      preview={""}
                                    />
                                    <h1 className="text-sm text-center">
                                      Emd Document
                                    </h1>
                                  </div>

                                  {data?.bidder_doc?.map((bidDoc) => (
                                    <div className="w-[100px]">
                                      <ImageDisplay
                                        url={bidDoc?.doc_path}
                                        className="w-20 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                                        alt={"uploaded doc"}
                                        preview={""}
                                      />
                                      <h1 className="text-sm text-center">
                                        {bidDoc?.criteria_type} Document
                                      </h1>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Buttons */}

          <div className="space-x-5 flex justify-between mt-[2rem]">
            <div className="flex flex-1 justify-between">
              <div className="space-x-3 flex items-end justify-center">
                <button
                  className={buttonStyle}
                  onClick={() =>
                    page == "view" ? navigate(-1) : navigate(`/tendering-admin`)
                  }
                >
                  Back
                </button>

                <button
                  onClick={handlePrint}
                  className="mr-1 pb-2 pl-9 pr-9 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl"
                >
                  Print
                </button>
              </div>
              <div className="space-x-3 flex">
                {page === "inbox" && (
                  <button
                    onClick={() => btnNavigate(biddingData?.creationStatus)}
                    className="mr-1 pb-2 pl-7 pr-7 pt-2 border border-indigo-500 text-base leading-tight  rounded hover:bg-indigo-500 bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl flex gap-2 justify-center items-center "
                  >
                    {btnLabel(biddingData?.creationStatus)}
                    <MdArrowRightAlt className="text-2xl " />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddingViewById;
