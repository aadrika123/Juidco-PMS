import React, { useContext, useEffect, useState } from "react";
import d from "@/Components/assets/ptax.jpg";
import TitleBar from "../../Others/TitleBar";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import SuccessModal from "@/Components/Common/Modal/SuccessModal";
import { useNavigate } from "react-router-dom";
import ImageModal from "../../Others/ImageModal/ImageModal";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";

const TenderFormViewDetails = () => {
  const navigate = useNavigate();
  const { api_postBasicDetails, api_getPreviewDetails } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [referenceNo, setReferenceNo] = useState();
  const [previewData, setPreviewData] = useState();

  const descTitle = "font-bold text-[#4D4B4B]";
  const descText = "text-[#7d7d7d]";

  const handlePrint = () => {
    window.print();
  };

  const confirmationHandler = () => {
    setIsSuccessModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };


    const getApplicationDetail = (refNo) => {
    AxiosInterceptors.get(`${api_getPreviewDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data)
          setPreviewData(response?.data?.data);
          setImageDoc(response?.data?.data?.doc[0]?.docUrl);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        // toast.error(error?.response?.data?.message);
      });
  };

  useEffect(()=>{
    let refNo = window.localStorage.getItem("reference_no");
    setReferenceNo(refNo);
    getApplicationDetail(refNo);
  },[]);


  //displaying confirmation message

  if (isSuccessModal) {
    return (
      <>
        <SuccessModal
          confirmationHandler={confirmationHandler}
          message={"Your Form has been submitted Successfully"}
          requestNoMsg={"Tendring Request No -"}
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
          imageUrl={d}
        />
      </>
    );
  }

  console.log(previewData)
  return (
    <>
      {/* <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Tender Input Form Details"}
        />
      </div> */}
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
                  <span className={descText}>{previewData?.basic_details?.tender_type}</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Category : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.tender_category}</span>
                </h1>
                <h1>
                  <span className={descTitle}>Form of Contract : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.contract_form}</span>
                </h1>
              </div>

              <div className="p-4 pt-9 text-sm space-y-4 w-1/2">
                <h1>
                  <span className={descTitle}>Payment Mode : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.payment_mode}</span>
                </h1>
                <h1>
                  <span className={descTitle}>Online Payment Mode : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.onlinePyment_mode}</span>
                </h1>
                <h1>
                  <span className={descTitle}>Allow Resubmission : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.allow_resubmission == true ? "Yes" : "No"}</span>
                </h1>
                <h1>
                  <span className={descTitle}>Allow Withdrawal : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.allow_withdrawl == true ? "Yes" : "No"}</span>
                </h1>
                <h1>
                  <span className={descTitle}>Allow Offline Submission : </span>{" "}
                  <span className={descText}>{previewData?.basic_details?.allow_offline_submission == true ? "Yes" : "No"}</span>
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
                    onClick={() => setImageModal(true)}
                  />{" "}
                </div>
            </div>
          </div>

          {/* Cover Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">
              Cover Details, No of Covers - 4{" "}
            </p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/2 space-y-3">
                <h1>
                  <span className={descTitle}>No of Covers :</span>{" "}
                  <span className={descText}>Two Covers</span>
                </h1>
                <h1>
                  <span className={descTitle}>Remarks :</span>
                  <span className={descText}>
                    {" "}
                    Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
                    reiciendis ex distinctio voluptatum ut deleniti possimus sit
                    dicta maxime et quae{" "}
                  </span>
                </h1>
              </div>

              <div className="relative overflow-hidden flex space-x-5 w-1/2 justify-center items-center text-center">
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
              </div>
            </div>
          </div>

          {/* Work Item Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Work Item Details</p>
          </div>
          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-9 text-sm w-full space-y-3">
              <h1>
                <span className={descTitle}>Work Item Title : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Work Discription : </span>
                <span className={descText}>
                  Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
                  reiciendis ex distinctio voluptatum ut deleniti possimus sit
                  dicta maxime et quaerat doloribus. Est
                </span>
              </h1>
            </div>
            <div className="flex w-full">
              <div className="p-4 text-sm space-y-4 w-1/2 pl-10">
                <h1>
                  <span className={descTitle}>
                    Pre Qualification Details :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Product Category : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Product Sub Category : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Contract Type : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Value : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Validity Date (In Days) :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
              <div className="p-4 text-sm space-y-4 w-1/2">
                <h1>
                  <span className={descTitle}>
                    Location(Work/Item/Service) :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Pin Code : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Validity Date (In Days) :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Completion Period in Months :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex  bg-white border shadow-xl mt-2 rounded">
            <div className="p-10 text-sm space-y-4 w-1/2 ">
              <h1>
                <span className={descTitle}>Pre Bid Meeting : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Pre Bid Meeting Place : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Pre Bid Meeting Address : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Bid Opening Place : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Tender Class : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
            </div>
            <div className="p-4 pt-9 text-sm space-y-4 w-1/2">
              <h1>
                <span className={descTitle}>Inviting Officer Name : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>nviting Officer Address : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>
                  Inviting Officer Phone/Email :{" "}
                </span>{" "}
                <span className={descText}>XYZ Values</span>
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
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Processing Fee :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee Payable At :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Fee Payable To :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Surg Charges :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Other Charges :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>

          {/* EMD  Fee Details */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">EMD Fee Details</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>EMD Fee :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>EMD (Fixed/Percentage) :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee Payable At :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Fee Payable To :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>EMD Exemption Allowed :</span>{" "}
                  <span className={descText}>XYZ Values</span>
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
                  <span className={descTitle}>Publishing Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Bid Opening Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Pre Bid Meeting Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Document Sale Start Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Document Sale End Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>
                    Seek Clarification Start Date :
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Seek Clarification End Date :
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
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
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>BO2 Name/Designation :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>BO3 Name/Designation :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Tender Documents */}

          <div className="bg-[#4338ca] border-b  p-2 pl-5 rounded mt-5">
            <p className="text-xl text-white">Tender Documents</p>
          </div>

          <div className="w-full bg-white border shadow-xl mt-2 rounded p-9">
            <div className="flex">
              <div className="w-[70%] space-y-4 pt-9">
                <div className="flex space-x-10">
                  <h1>
                    <span className={descTitle}>File Name :</span>{" "}
                    <span className={descText}>XYZ Values</span>
                  </h1>
                  <h1>
                    <span className={descTitle}>Document Size :</span>{" "}
                    <span className={descText}>XYZ Values</span>
                  </h1>
                </div>
                <h1>
                  <span className={descTitle}>Discription :</span>{" "}
                  <span className={descText}>
                    {" "}
                    Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
                    reiciendis ex distinctio voluptatum ut deleniti possimus sit
                    dicta maxime et quaerat doloribus. Est{" "}
                  </span>
                </h1>
              </div>
              <div className="w-[30%] flex justify-center items-center text-center">
                
                <div>
                  <img
                    src={d}
                    className="w-52 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                    onClick={() => setImageModal(true)}
                  />{" "}
                  <p className={descTitle}>Uploaded Reference Doc</p>{" "}
                </div>

              </div>
            </div>
            <hr className="w-[71rem] mt-10" />
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
              <button
                className="p-2 pl-4 pr-4 border border-indigo-500 text-white text-base leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA] animate-pulse"
                onClick={() => setIsSuccessModal(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderFormViewDetails;
