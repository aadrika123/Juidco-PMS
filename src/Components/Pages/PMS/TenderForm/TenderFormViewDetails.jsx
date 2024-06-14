import React, { useContext, useEffect, useState } from "react";
import TitleBar from "../../Others/TitleBar";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import SuccessModal from "@/Components/Common/Modal/SuccessModal";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "../../Others/ImageModal/ImageModal";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";

const TenderFormViewDetails = () => {
  const navigate = useNavigate();

  const { page } = useParams();

  const { api_postForwardtoDA, api_getPreviewDetails, api_postFinalSubit } =
    ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [referenceNo, setReferenceNo] = useState();
  const [previewData, setPreviewData] = useState();
  const [imageUrlModal, setImageUrlModal] = useState();

  const descTitle = "font-bold text-[#4D4B4B]";
  const descText = "text-[#7d7d7d] uppercase";

  const handlePrint = () => {
    window.print();
  };

  const confirmationHandler = () => {
    navigate("/acc-pre-tendring");
    setIsSuccessModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getApplicationDetail = (refNo) => {
    AxiosInterceptors.get(`${api_getPreviewDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          // console.log(response?.data?.data);
          setPreviewData(response?.data?.data);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  //submitting the form
  const postFinalSubmission = () => {
    AxiosInterceptors.post(
      `${api_postFinalSubit}`,
      { reference_no: referenceNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data);
          setIsSuccessModal(true);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error);
      });
  };

  //forward to DA
  const forwardBoqToDa = () => {
    AxiosInterceptors.post(
      `${api_postForwardtoDA}`,
      { reference_no: referenceNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Forwarded to DA Successfully");
          navigate("/acc-pre-tendring");
          console.log(response?.data?.data);
          // setIsSuccessModal(true);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error);
      });
  };

  const formateDateTime = (originalDateTime) => {
    if (originalDateTime) {
      const date = new Date(originalDateTime);

      // Options for formatting the date
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/New_York", // Adjust the time zone as needed
      };
      // Format the date using the Intl.DateTimeFormat
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      // Since Intl.DateTimeFormat does not support the exact format directly, we need to adjust the time part
      const formattedDateArray = formattedDate.split(", ");
      const datePart = formattedDateArray[0];
      let timePart = formattedDateArray[1];

      // Adjust the date if time part indicates the next day
      const [time, period] = timePart.split(" ");
      if (time === "12:00" && period === "AM") {
        const adjustedDate = new Date(date.getTime() + 24 * 60 * 60 * 1000); // Add one day
        const adjustedDatePart = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "America/New_York",
        }).format(adjustedDate);
        timePart = "12:00 AM";
        return `${adjustedDatePart} ${timePart}`;
      } else {
        return `${datePart} ${timePart}`;
      }
    }
  };

  useEffect(() => {
    let refNo = window.localStorage.getItem("reference_no");
    setReferenceNo(refNo);
    getApplicationDetail(refNo);
  }, []);

  const ImageDetailFunc = (imgUrl) => {
    setImageUrlModal(imgUrl);
    setImageModal(true);
  };

  //displaying confirmation message

  if (isSuccessModal) {
    return (
      <>
        <SuccessModal
          confirmationHandler={confirmationHandler}
          message={"Your Form has been submitted Successfully"}
          requestNoMsg={"With Reference No -"}
          refNo={referenceNo}
        />
      </>
    );
  }

  if (imageModal) {
    return (
      <>
        <ImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          imageUrl={imageUrlModal}
        />
      </>
    );
  }

  // console.log(previewData);
  return (
    <>
      {page == "preview" && (
        <div className="">
          <TitleBar
            titleBarVisibility={titleBarVisibility}
            titleText={"Tender Preview"}
          />
        </div>
      )}
      <div className="" id="printableArea">
        <div className="">
          {/* Basic Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Basic Details</p>
          </div>

          <div className="bg-white border shadow-xl mt-2 rounded">
            <div className="flex">
              <div className="p-10 text-sm space-y-4 w-1/2 ">
                <h1>
                  <span className={descTitle}>Tender Reference Number : </span>{" "}
                  <span className={descText}>{previewData?.reference_no}</span>
                </h1>
                {/* <h1>
                  <span className={descTitle}>Tender ID : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1> */}
                <h1>
                  <span className={descTitle}>Tender Type : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.tender_type?.join(", ")}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Category : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.tender_category?.join(", ")}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Form of Contract : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.contract_form?.join(", ")}
                  </span>
                </h1>
              </div>

              <div className="p-4 pt-9 text-sm space-y-4 w-1/2">
                <h1>
                  <span className={descTitle}>Payment Mode : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.payment_mode}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Online Payment Mode : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.onlinePyment_mode}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Allow Resubmission : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.allow_resubmission == true
                      ? "Yes"
                      : "No"}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Allow Withdrawal : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.allow_withdrawl == true
                      ? "Yes"
                      : "No"}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Allow Offline Submission : </span>{" "}
                  <span className={descText}>
                    {previewData?.basic_details?.allow_offline_submission ==
                    true
                      ? "Yes"
                      : "No"}
                  </span>
                </h1>
              </div>
            </div>

            <div className="flex pl-10 mb-5">
              <div className="w-1/2">
                <h1>
                  <span className={descTitle}>NIT Document: </span>{" "}
                  {/* <span className={descText}>XYZ Values</span> */}
                </h1>
              </div>
              <div className="w-1/2">
                <img
                  src={previewData?.basic_details?.doc[0]?.docUrl}
                  class="w-28 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                  onClick={() =>
                    ImageDetailFunc(previewData?.basic_details?.doc[0]?.docUrl)
                  }
                />{" "}
              </div>
            </div>
          </div>

          {/* Cover Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">
              Cover Details, No of Covers - 4
            </p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/2 space-y-3">
                <h1>
                  <span className={descTitle}>No of Covers :</span>{" "}
                  <span className={descText}>
                    {previewData?.cover_details?.noOfCovers}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Remarks :</span>
                  <span className={descText}>
                    {previewData?.cover_details?.content}
                  </span>
                </h1>
              </div>

              <div className="relative overflow-hidden flex space-x-5 w-1/2 justify-center items-center text-center">
                {previewData?.cover_details?.cover_details_docs?.map(
                  (data, index) => (
                    <div>
                      <img
                        src={data?.docPath[0]}
                        class="w-28 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                        onClick={() => ImageDetailFunc(data?.docPath[0])}
                      />{" "}
                      <p>{data?.type}</p>
                    </div>
                  )
                )}

                {/* <div>
                  <img
                    src={d}
                    class="w-28 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                    onClick={() => setImageModal(true)}
                  />{" "}
                  <p>cover 1</p>
                </div>
                <div>
                  <img
                    src={d}
                    class="w-28 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                    onClick={() => setImageModal(true)}
                  />{" "}
                  <p>cover 1</p>
                </div>
                <div>
                  <img
                    src={d}
                    class="w-28 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                    onClick={() => setImageModal(true)}
                  />{" "}
                  <p>cover 1</p>
                </div>
                <div>
                  <img
                    src={d}
                    class="w-28 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                    onClick={() => setImageModal(true)}
                  />{" "}
                  <p>cover 1</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Work Item Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Work Item Details</p>
          </div>
          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-9 text-sm w-full space-y-3">
              {/* <h1>
                <span className={descTitle}>Work Item Title : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1> */}
              <h1>
                <span className={descTitle}>Work Discription : </span>
                <span className={descText}>
                  {previewData?.work_details?.workDiscription}
                </span>
              </h1>
            </div>
            <div className="flex w-full">
              <div className="p-4 text-sm space-y-4 w-1/2 pl-10">
                <h1>
                  <span className={descTitle}>
                    Pre Qualification Details :{" "}
                  </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.pre_qualification_details}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Product Category : </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.product_category?.join(", ")}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Product Sub Category : </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.productSubCategory}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Contract Type : </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.contract_type}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Value : </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.tender_values}
                  </span>
                </h1>
              </div>

              <div className="p-4 text-sm space-y-4 w-1/2">
                <h1>
                  <span className={descTitle}>
                    Location(Work/Item/Service) :{" "}
                  </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.location}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Pin Code : </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.pinCode}
                  </span>
                </h1>

                <h1>
                  <span className={descTitle}>
                    Completion Period in Months :{" "}
                  </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.completionPeriod}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Validity Date (In Days) :{" "}
                  </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.bid_validity}
                  </span>
                </h1>

                <h1>
                  <span className={descTitle}>Tender Class Name : </span>{" "}
                  <span className={descText}>
                    {previewData?.work_details?.tenderer_class?.join(", ")}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex  bg-white border shadow-xl mt-2 rounded">
            <div className="p-10 text-sm space-y-4 w-1/2 ">
              <h1>
                <span className={descTitle}>Pre Bid Metting:</span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.pre_bid == true ? "Yes" : "No"}
                </span>
              </h1>
              <h1>
                <span className={descTitle}>Pre Bid Meeting : </span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.preBidMeeting}
                </span>
              </h1>
              <h1>
                <span className={descTitle}>Pre Bid Meeting Address : </span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.preBidMeetingAdd}
                </span>
              </h1>
              <h1>
                <span className={descTitle}>Bid Opening Place : </span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.bidOpeningPlace}
                </span>
              </h1>
            </div>
            <div className="p-4 pt-9 text-sm space-y-4 w-1/2">
              <h1>
                <span className={descTitle}>Tender Class : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Inviting Officer Name : </span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.invstOffName}
                </span>
              </h1>
              <h1>
                <span className={descTitle}>Inviting Officer Address : </span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.invstOffAdd}
                </span>
              </h1>
              <h1>
                <span className={descTitle}>
                  Inviting Officer Email/Phone :{" "}
                </span>{" "}
                <span className={descText}>
                  {previewData?.work_details?.invstOffEmail_Ph}
                </span>
              </h1>
            </div>
          </div>

          {/* Tender Fee Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Tender Fee Details</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.tenderFee}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Processing Fee :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.processingFee}
                  </span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee Payable At :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.tenderFeePayableAt}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Fee Payable To :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.tenderFeePayableTo}
                  </span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Surg Charges :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.surcharges}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Other Charges :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.otherCharges}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* EMD  Fee Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">EMD Fee Details</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-9 flex text-sm w-full">
              <div className="w-1/3  space-y-3">
                <h1>
                  <span className={descTitle}>Surg Charges :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.emd_exemption == true
                      ? "Yes"
                      : "No"}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>EMD Fee :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.emd_fee}
                  </span>
                </h1>
              </div>
              <div className="w-1/3  space-y-3">
                <h1>
                  <span className={descTitle}>EMD Amount :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.emdAmount}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>EMD Percentage :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.emdPercentage}
                  </span>
                </h1>
              </div>
              <div className="w-1/3  space-y-3">
                <h1>
                  <span className={descTitle}>EMD Fee Payable To :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.emdFeePayableTo}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>EMD Fee Payable At :</span>{" "}
                  <span className={descText}>
                    {previewData?.fee_details?.emdFeePayableAt}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Critical Dates*/}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Critical Dates</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>
                    Publishing Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.publishingDate
                    )}
                    {/* {previewData?.critical_dates?.publishingDate} */}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Opening Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.bidOpeningDate
                    )}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Pre Bid Meeting Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.preBidMettingDate
                    )}
                  </span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>
                    Document Sale Start Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.docSaleStartDate
                    )}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Document Sale End Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.docSaleEndDate
                    )}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Seek Clarification Start Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.seekClariStrtDate
                    )}
                  </span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>
                    Seek Clarification End Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.seekClariEndDate
                    )}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Submission Start Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.bidSubStrtDate
                    )}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Submission End Date & Time : <br />
                  </span>{" "}
                  <span className={descText}>
                    {formateDateTime(
                      previewData?.critical_dates?.bidSubEndDate
                    )}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Bid Openers Selection */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Bid Openers Selection</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>BO1 Name/Designation :</span>{" "}
                  <span className={descText}>
                    {previewData?.bid_openers?.b01NameDesig}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>BO2 Name/Designation :</span>{" "}
                  <span className={descText}>
                    {previewData?.bid_openers?.b02NameDesig}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>BO3 Name/Designation :</span>{" "}
                  <span className={descText}>
                    {previewData?.bid_openers?.b03NameDesig}
                  </span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>
                    {previewData?.bid_openers?.b01Email}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>
                    {previewData?.bid_openers?.b02Email}
                  </span>
                </h1>
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>
                    {previewData?.bid_openers?.b03Email}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Tender Documents */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Tender Documents</p>
          </div>

          <div className="w-full bg-white border shadow-xl mt-2 rounded p-9">
            {previewData?.bid_openers?.bid_openers_docs?.map((data, index) => (
              <>
                {" "}
                <div className="flex">
                  <div className="w-[70%] space-y-4 pt-9">
                    <div className="flex space-x-10">
                      <h1>
                        <span className={descTitle}>Name/Designation :</span>{" "}
                        <span className={descText}>{data?.nameDesig}</span>
                      </h1>
                      <h1>
                        <span className={descTitle}>Document Size :</span>{" "}
                        <span className={descText}>{data?.docSize}</span>
                      </h1>
                    </div>
                    <h1>
                      <span className={descTitle}>Discription :</span>{" "}
                      <span className={descText}>{data?.description}</span>
                    </h1>
                  </div>
                  <div className="w-[30%] flex justify-center items-center text-center">
                    <div className="flex flex-col items-center justify-end">
                      <div className="w-[50px]">
                        <ImageDisplay
                          url={data?.docUrl}
                          alt={"uploaded doc"}
                          preview={""}
                        />
                      </div>
                      {/* <img
                        src={data?.docUrl}
                        className="w-52 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer mt-5"
                        onClick={() => ImageDetailFunc(data?.docUrl)}
                      />{" "} */}
                      <p className={`${descTitle} pt-2 text-green-600`}>
                        Uploaded Reference Doc
                      </p>{" "}
                    </div>
                  </div>
                </div>
                <hr className="w-[71rem] mt-10" />
              </>
            ))}
            {/* //////// */}
          </div>

          <div className=" mt-10 flex justify-between space-x-4">
            <div className="">
              <button
                onClick={handleBack}
                className="pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl"
              >
                Back
              </button>
            </div>
            <div className="flex justify-end space-x-5">
              <button
                onClick={handlePrint}
                className="pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl"
              >
                Print
              </button>

              {page == "inbox" && (
                <>
                  <button
                    className="bg-[#4338CA]  hover:bg-[#5a50c6]  text-white pb-2 pl-6 pr-6 pt-2 rounded flex"
                    onClick={() =>
                      navigate(`/tendering?tabNo=1`, { state: referenceNo })
                    }
                  >
                    Edit
                  </button>
                  {(previewData?.status == 0 || previewData?.status == -1) && (
                    <button
                      className="p-2 pl-4 pr-4 border border-indigo-500 text-white text-base leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA] animate-pulse"
                      onClick={() => forwardBoqToDa()}
                    >
                      Forward to DA
                    </button>
                  )}
                  {/* <button
                    className="p-2 pl-4 pr-4 border border-indigo-500 text-white text-base leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA] animate-pulse"
                    onClick={() => postFinalSubmission()}
                  >
                    Submit
                  </button> */}
                </>
              )}
              {page != "inbox" && page != "outbox" && (
                <button
                  className="p-2 pl-4 pr-4 border border-indigo-500 text-white text-base leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA] animate-pulse"
                  onClick={() => postFinalSubmission()}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderFormViewDetails;
